import { useStore } from 'mobx-store-provider'

import { RootStore } from './stores/root'

export function useStoreSelect<T>(selector: (root: RootStore) => T) {
  const store = useStore(selector) as T

  return store
}
