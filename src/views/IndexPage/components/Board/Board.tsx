import React from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { settingsState, sudokuState } from '../../control'
import { Cell } from '../'

const OverlayGrid = dynamic(import('./OverlayGrid'), { ssr: false })

export const Board = observer(() => {
  const { board } = sudokuState
  const { cellSide } = settingsState

  return (
    <BoardWrapper>
      {board.map((row) =>
        row.map((cell) => (
          <CellWrapper key={cell.$modelId} cellSide={cellSide}>
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
