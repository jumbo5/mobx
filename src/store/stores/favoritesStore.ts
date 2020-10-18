import { ITrack } from '@types'
import { Model, model, modelAction, prop } from 'mobx-keystone'

import { Track } from '../models'

@model('favorites')
export class Favorites extends Model({
  list: prop<Track[]>(),
}) {
  @modelAction
  pushFavorite(track: ITrack) {
    this.list.push(
      new Track({
        $modelId: track.id,
        name: track.name,
        image: track.album.images[0].url,
      }),
    )
  }
}
