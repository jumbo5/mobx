import { axios } from '@axios'
import { computed, observable } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'

import { GenerateBoardResponse } from './types'
import { encodeParams, getInitialCellSide } from './utils'

@model('cell')
export class Cell extends Model({
  number: prop<number>(),
  disabled: prop<boolean>(),
}) {
  @observable isSelected = false

  @modelAction
  onSelect() {
    this.isSelected = true
  }

  @modelAction
  onBlur() {
    this.isSelected = false
  }

  @modelAction
  onUpdateNumber(key: string) {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
      this.number = parseInt(key as string, 10)
    }

    if (key === 'Backspace') {
      this.number = 0
    }

    this.onBlur()
  }
}

@model('sudoku')
export class SudokuState extends Model({
  board: prop<Cell[][]>(),
  cellSide: prop<number>(56),
}) {
  @observable validation: { pending: boolean; solved: boolean | null } = {
    pending: false,
    solved: null,
  }

  @modelAction
  updateCellSide(cellSide: number) {
    this.cellSide = cellSide
  }

  @modelAction
  updateBoard(board: number[][]) {
    this.board = board.map((row) =>
      row.map((cell) => new Cell({ number: cell, disabled: cell !== 0 })),
    )
  }

  convertBoard() {
    return this.board.map((row) => row.map((cell) => cell.number))
  }

  @modelFlow
  public validateBoard = _async(function* (this: SudokuState) {
    this.validation.pending = true
    console.log(this.convertBoard())

    const validationResponse = yield* _await(
      axios.post<{ status: 'solved' | 'unsolved' }>(
        `${process.env.NEXT_PUBLIC_SUDOKU_API}/validate`,
        {
          body: encodeParams(this.convertBoard()),
        },
      ),
    )

    this.validation.pending = false
    this.validation.solved = validationResponse.data.status === 'solved'

    if (!this.validation.solved) {
      setTimeout(() => (this.validation.solved = null), 1500)
    }
  })

  @modelFlow
  public generateBoard = _async(function* (this: SudokuState) {
    const board = yield* _await(
      axios.get<GenerateBoardResponse>(
        `${process.env.NEXT_PUBLIC_SUDOKU_API}/board?difficulty=easy`,
      ),
    )

    this.board = board.data.board.map((row) =>
      row.map((cell) => new Cell({ number: cell, disabled: cell !== 0 })),
    )
  })
}

export const sudokuState = new SudokuState({
  board: [],
  cellSide: getInitialCellSide(),
})
