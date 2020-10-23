import { Cell } from './models/cellModel'
import { DEFAULT_CELL_SIDE } from './constants'

// export const encodeBoard = (board: string[]) =>
//   board.reduce(
//     (result, row, i) =>
//       result +
//       `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
//     '',
//   )

// export const encodeParams = (params: number[][]) =>
//   Object.keys(params)
//     .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
//     .join('&')

export const getInitialCellSide = () => {
  return DEFAULT_CELL_SIDE
}

const formatBoard = (board: number[][]) => {
  const rows: typeof board = board
  const cols: typeof board = []
  const grid: typeof board = []

  for (let i = 0; i < 9; i++) {
    cols.push([])
    grid.push([])
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cols[col][row] = board[row][col]

      const gridRow = Math.floor(row / 3)
      const gridCol = Math.floor(col / 3)
      const gridIndex = gridRow * 3 + gridCol

      grid[gridIndex].push(board[row][col])
    }
  }

  return { rows, cols, grid }
}

const validateBoard = (formattedBoard: number[][]) => {
  for (let row = 0; row < 9; row++) {
    formattedBoard[row].sort()

    for (let col = 0; col < 9; col++) {
      let value = formattedBoard[row][col],
        next_value = formattedBoard[row][col + 1]

      if (!(value && value > 0 && value < 10)) {
        return false
      }

      if (col !== 8 && value === next_value) {
        return false
      }
    }
  }
  return true
}

export const isBoardValid = (board: number[][]) => {
  const { rows, cols, grid } = formatBoard(board)

  return validateBoard(rows) && validateBoard(cols) && validateBoard(grid)
}

export const convertBoardToNumberArray = (board: Cell[][]) =>
  board.map((row) => row.map((cell) => cell.number))

export const convertNumberArrayToBoard = (array: number[][]) =>
  array.map((row) =>
    row.map((cell) => new Cell({ number: cell, disabled: cell !== 0 })),
  )
