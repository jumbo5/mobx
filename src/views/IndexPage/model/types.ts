import { Cell, SudokuState } from './sudokuModel'

export interface GenerateBoardResponse {
  board: number[][]
}

export interface ICell extends Cell {}
export interface ISudokuState extends SudokuState {}
