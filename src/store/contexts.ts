import { createContext } from 'mobx-keystone'
import Router from 'next/router'

// import { api } from '@app/services/data/Api'

// export const apiCtx = createContext(api)
export const routerCtx = createContext<typeof Router['router']>()
