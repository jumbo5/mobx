import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { sudokuState } from '../../model'
import { Cell } from '../'

export const Board = observer(() => {
  const { board, cellSide } = sudokuState

  return (
    <BoardWrapper>
      {board.map((row) =>
        row.map((cell) => (
          <CellWrapper key={cell.$modelId} cellSide={cellSide}>
            <Cell cell={cell} />
          </CellWrapper>
        )),
      )}

      <OverlayGrid>
        <OverlayLines position="horizontal" cellSide={cellSide} />
        <OverlayLines position="vertical" cellSide={cellSide} />
      </OverlayGrid>
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

const OverlayGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #757575;
  pointer-events: none;
`

const OverlayLines = styled.div<{
  position: 'horizontal' | 'vertical'
  cellSide: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform: ${({ position }) =>
    position === 'horizontal' ? 'rotate(90deg)' : 'rotate(0deg)'};
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #757575;
  }

  &::before {
    left: ${({ cellSide }) => `${cellSide * 3 - 3}px`};
  }

  &::after {
    right: ${({ cellSide }) => `${cellSide * 3 - 3}px`};
  }
`
