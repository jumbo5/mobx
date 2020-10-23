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
  getInitialCellSide,
  isBoardValid,
} from '../utils'

@model('sudoku')
export class SudokuState extends Model({
  board: prop<Cell[][]>(),
  cellSide: prop<number>(56),
}) {
  @observable isSolved: boolean = false

  @modelAction
  updateCellSide(cellSide: number) {
    this.cellSide = cellSide
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

  @modelFlow
  public generateBoard = _async(function* (this: SudokuState) {
    const board = yield* _await(
      axios.get<GenerateBoardResponse>(
        `${process.env.NEXT_PUBLIC_SUDOKU_API}/board?difficulty=easy`,
      ),
    )

    this.board = convertNumberArrayToBoard(board.data.board)
  })
}

export const sudokuState = new SudokuState({
  board: [],
  cellSide: getInitialCellSide(),
})
