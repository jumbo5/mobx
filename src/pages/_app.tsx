import React from 'react'
import { Layout } from '@containers'
import { initRootStore } from '@store/initStore'
import { observer } from 'mobx-react-lite'
import { useCreateStore, useProvider } from 'mobx-store-provider'
import { AppInitialProps, AppProps } from 'next/app'

const Application = observer(
  ({ Component, router, pageProps = {} }: AppProps & AppInitialProps) => {
    const store = useCreateStore(() =>
      initRootStore(pageProps?.initialState, { router }),
    )

    const Provider = useProvider()

    return (
      <Provider value={store}>
        <Layout>
          <Component {...pageProps} router={router} />
        </Layout>
      </Provider>
    )
  },
)

export default Application
