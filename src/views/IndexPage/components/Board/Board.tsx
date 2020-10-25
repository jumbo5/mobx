import React, { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { settingsState, sudokuState } from '../../control'
import { Cell } from '../'

const OverlayGrid = dynamic(import('./OverlayGrid'), { ssr: false })

export const Board = observer(() => {
  const { board, generatingBoard } = sudokuState
  const { cellSide } = settingsState

  useEffect(() => {
    sudokuState.generateBoard(settingsState.difficulty)
  }, [])

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

      {generatingBoard && (
        <SpinnerWrapper>
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: cellSide + 8 }} />}
          />
        </SpinnerWrapper>
      )}
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

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.8);
`
