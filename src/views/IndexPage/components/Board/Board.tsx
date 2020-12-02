import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { OverlayGrid } from './OverlayGrid'
import { settingsState, sudokuState } from '../../control'
import { Cell } from '../'

export const Board = observer(() => {
  const { board } = sudokuState
  const { cellSide } = settingsState

  useEffect(() => {
    sudokuState.generateBoard(settingsState.difficulty)
  }, [])

  return (
    <BoardWrapper>
      {board.map((row) =>
        row.map((cell, index) => (
          <CellWrapper key={index} cellSide={cellSide}>
            <Cell cell={cell} />
          </CellWrapper>
        )),
      )}

      <OverlayGrid />
    </BoardWrapper>
  )
})

const BoardWrapper = styled.div`
  position: relative;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(9, min-content);
  box-shadow: inset 0px 0px 0px 2px black;
`

const CellWrapper = styled.div<{ cellSide: number }>`
  width: ${({ cellSide }) => `${cellSide}px`};
  height: ${({ cellSide }) => `${cellSide}px`};
`

export default Board
