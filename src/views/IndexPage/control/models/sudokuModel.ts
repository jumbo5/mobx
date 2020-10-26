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
import { difficultiesType, GenerateBoardResponse } from '../types'
import { isBoardValid } from '../utils'

@model('sudoku')
export class SudokuState extends Model({
  board: prop<Cell[][]>(),
}) {
  @observable isSolved = false
  @observable selectedNumber = 0
  @observable generatingBoard = false
  @observable timer = 0

  convertBoardToNumberArray(board: Cell[][]) {
    return board.map((row) => row.map((cell) => cell.number))
  }

  convertNumberArrayToBoard(array: number[][]) {
    return array.map((row) =>
      row.map(
        (cell) =>
          new Cell({
            number: cell,
            disabled: cell !== 0,
          }),
      ),
    )
  }

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
    this.board = this.convertNumberArrayToBoard(board)
  }

  @modelAction
  validateBoard() {
    const isSolved = isBoardValid(this.convertBoardToNumberArray(this.board))
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
  public generateBoard = _async(function* (
    this: SudokuState,
    difficulty: difficultiesType,
  ) {
    this.generatingBoard = true

    const board = yield* _await(
      axios.get<GenerateBoardResponse>(
        `${process.env.NEXT_PUBLIC_SUDOKU_API}/board?difficulty=${difficulty}`,
      ),
    )

    this.board = this.convertNumberArrayToBoard(board.data.board)
    this.timer = 0
    this.generatingBoard = false
  })
}

export const sudokuState = new SudokuState({
  board: new Array(9).fill(new Array(9).fill(0)),
})
