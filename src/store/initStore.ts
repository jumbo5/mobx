import {
  fromSnapshot,
  isRootStore,
  ModelAutoTypeCheckingMode,
  registerRootStore,
  setGlobalConfig,
  SnapshotInOf,
} from 'mobx-keystone'
import { useStaticRendering } from 'mobx-react-lite'
import Router from 'next/router'

import { RootStore } from './stores/root'
import { routerCtx } from './contexts'

export interface InitStoreOptions {
  router?: typeof Router['router']
}
setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.DevModeOnly,
})

useStaticRendering(typeof window === 'undefined')

let store: RootStore | undefined

export function initRootStore(
  snapshot?: SnapshotInOf<RootStore>,
  { router }: InitStoreOptions = {},
) {
  store =
    typeof window === 'undefined'
      ? new RootStore({})
      : snapshot
      ? fromSnapshot<RootStore>(snapshot)
      : new RootStore({})

  if (router) routerCtx.set(store, router)

  if (!isRootStore(store)) registerRootStore(store)

  return store
}
