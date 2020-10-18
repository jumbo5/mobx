export interface ISearch<T> {
  href: string
  next: string | null
  previous: string | null
  limit: number
  total: number
  offset: number
  items: T
}
