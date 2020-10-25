import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { settingsState } from '../../control'

export const OverlayGrid = observer(() => {
  const { cellSide } = settingsState

  return (
    <Container>
      <OverlayLines position="horizontal" cellSide={cellSide} />
      <OverlayLines position="vertical" cellSide={cellSide} />
    </Container>
  )
})

const Container = styled.div`
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

export default OverlayGrid
