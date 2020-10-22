import { DEFAULT_CELL_SIDE } from './constants'

export const encodeBoard = (board: string[]) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    '',
  )

export const encodeParams = (params: number[][]) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&')

export const getInitialCellSide = () => {
  return DEFAULT_CELL_SIDE
}
