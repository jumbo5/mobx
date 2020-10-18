export type IAlbumImage = {
  height: number
  width: number
  url: string
}

export interface IAlbum {
  id: string
  name: string
  images: IAlbumImage[]
}
