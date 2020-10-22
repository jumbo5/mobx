import { _async, _await, Model, model } from 'mobx-keystone'

@model('app')
export class RootStore extends Model({
  // todos: prop(() => new Todos({ list: [] })),
  // favorites: prop(() => new Favorites({ list: [] })),
}) {
  // @modelFlow
  // public loadInitialData = _async(function* (this: RootStore) {
  //   yield* _await(
  //     Promise.all([
  //       this.resources.getGroups(),
  //       this.resources.getOptionGroups(),
  //       this.remoteConfig.loadRemoteConfig(),
  //     ]),
  //   )
  // })
}
