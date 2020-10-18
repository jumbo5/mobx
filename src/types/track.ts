import { IAlbum } from './album'

export interface ITrack {
  id: string
  name: string
  preview_url: string | null
  album: IAlbum
}
