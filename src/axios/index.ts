import axios from 'axios'

let accessToken =
  typeof localStorage !== 'undefined' ? localStorage.getItem('access') : ''

axios.interceptors.request.use(
  (config) => {
    const newConfig = {
      headers: {},
      ...config,
    }

    newConfig.headers.Authorization = `Bearer ${accessToken}`

    return newConfig
  },
  (e) => Promise.reject(e),
)

axios.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error.response.status !== 401) {
      throw error
    }

    const { access_token } = await fetch(
      'https://accounts.spotify.com/api/token?grant_type=client_credentials',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
          ).toString('base64')}`,
        },
      },
    ).then((res) => res.json())

    accessToken = access_token
    localStorage.setItem('access', access_token)

    return axios({ ...error.config })
  },
)

export { axios }
