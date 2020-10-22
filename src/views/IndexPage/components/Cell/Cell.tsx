import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { ICell, sudokuState } from '../../model'

export interface CellProps {
  cell: ICell
}

export const Cell: React.FC<CellProps> = observer(({ cell }) => (
  <Container
    disabled={cell.disabled}
    onClick={() => cell.onSelect()}
    onFocus={() => cell.onSelect()}
    onKeyDown={(e) => cell.onUpdateNumber(e.key)}
    cellSide={sudokuState.cellSide}
  >
    {cell.number === 0 ? ' ' : cell.number}
  </Container>
))

const Container = styled.button<{ cellSide: number }>`
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0px 0px 0px 0.1px rgba(0, 0, 0, 1);
  font-size: ${({ cellSide }) => `${cellSide / 2}px`};

  &:disabled {
    cursor: not-allowed;
    background-color: #bdbdbd;
    color: white;
  }

  &:hover:not([disabled]) {
    background-color: #cfd8dc;
  }

  &:focus:not([disabled]) {
    background-color: #b0bec5;
  }
`
