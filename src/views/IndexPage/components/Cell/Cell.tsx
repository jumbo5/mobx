import React from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'

import { colorsType, ICell, settingsState } from '../../control'

export interface CellProps {
  cell: ICell
}

export const Cell: React.FC<CellProps> = observer(({ cell }) => {
  const {
    disabled: { text: disabledText, background: disabledBackground },
    highlighted: { text: highlightedText, background: highlightedBackground },
    focus: { text: focusText, background: focusBackground },
    hover: { text: hoverText, background: hoverBackground },
  } = settingsState.colors

  return (
    <Container
      disabled={cell.disabled}
      onClick={() => cell.onSelect()}
      onFocus={() => cell.onSelect()}
      onKeyDown={(e) => cell.onUpdateNumber(e.key)}
      highlighted={cell.highlighted}
      cellSide={settingsState.cellSide}
      colors={settingsState.colors}
    >
      {cell.number === 0 ? ' ' : cell.number}
    </Container>
  )
})

const Container = styled.button<{
  cellSide: number
  highlighted: boolean
  colors: colorsType
}>`
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0px 0px 0px 0.1px rgba(0, 0, 0, 1);
  font-size: ${({ cellSide }) => `${cellSide / 2}px`};

  ${({ highlighted, colors }) =>
    highlighted
      ? css`
          background-color: ${colors.highlighted.background};
          color: ${colors.highlighted.text};
          color: white;
        `
      : css`
          &:disabled {
            cursor: not-allowed;
            background-color: ${colors.disabled.background};
            color: ${colors.disabled.text};
          }

          &:hover:not([disabled]) {
            background-color: ${colors.hover.background};
            color: ${colors.hover.text};
          }

          &:focus:not([disabled]) {
            background-color: ${colors.focus.background};
            color: ${colors.focus.text};
          }
        `}
`
