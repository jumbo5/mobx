import { Cell } from './models/cellModel'
import { SudokuState } from './models/sudokuModel'

export interface GenerateBoardResponse {
  board: number[][]
}

export interface ICell extends Cell {}
export interface ISudokuState extends SudokuState {}

export interface ISettings {
  cellSide: number
}
