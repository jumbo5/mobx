import { axios } from '@axios'
import { observable } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'

import { Cell } from './cellModel'
import { GenerateBoardResponse } from '../types'
import {
  convertBoardToNumberArray,
  convertNumberArrayToBoard,
  isBoardValid,
} from '../utils'

@model('sudoku')
export class SudokuState extends Model({
  board: prop<Cell[][]>(),
}) {
  @observable isSolved: boolean = false
  @observable selectedNumber: number = 0

  @observable generatingBoard = false

  @modelAction
  selectNumber(number: number) {
    if (number !== 0) {
      this.board.forEach((row) =>
        row.forEach((cell) => {
          if (cell.number === number) {
            cell.highlighted = true
          }

          if (cell.number !== number && cell.highlighted) {
            cell.highlighted = false
          }
        }),
      )
    } else {
      this.board.forEach((row) =>
        row.forEach((cell) => {
          if (cell.highlighted) {
            cell.highlighted = false
          }
        }),
      )
    }

    this.selectedNumber = number
  }

  @modelAction
  initializeBoard(board: number[][]) {
    this.board = convertNumberArrayToBoard(board)
  }

  @modelAction
  validateBoard() {
    const isSolved = isBoardValid(convertBoardToNumberArray(this.board))
    this.isSolved = isSolved

    return isSolved
  }

  @modelAction
  clearBoard() {
    this.board.forEach((row) =>
      row.forEach((cell) => {
        if (!cell.disabled && cell.number !== 0) {
          cell.number = 0
        }
      }),
    )
  }

  @modelFlow
  public generateBoard = _async(function* (this: SudokuState) {
    this.generatingBoard = true

    const board = yield* _await(
      axios.get<GenerateBoardResponse>(
        `${process.env.NEXT_PUBLIC_SUDOKU_API}/board?difficulty=easy`,
      ),
    )

    this.board = convertNumberArrayToBoard(board.data.board)
    this.generatingBoard = false
  })
}

export const sudokuState = new SudokuState({ board: [] })
