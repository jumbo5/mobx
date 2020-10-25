import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { sudokuState } from '../../control'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const Numbers = observer(() => {
  const { selectedNumber, board } = sudokuState

  const onSelect = (number: number) => {
    sudokuState.selectNumber(selectedNumber === number ? 0 : number)
  }

  const numbersLeft = useMemo(() => {
    const convertedBoard = sudokuState.convertBoardToNumberArray(board)

    const leftArray = [9, 9, 9, 9, 9, 9, 9, 9, 9]

    convertedBoard.forEach((row) =>
      row.forEach((cell) => {
        if (cell !== 0) {
          leftArray[cell - 1] -= 1
        }
      }),
    )

    return leftArray
  }, [JSON.stringify(board)])

  return (
    <Container>
      <NumbersWrapper>
        {numbers.map((number) => (
          <Number
            key={number}
            shape="circle"
            type={selectedNumber === number ? 'primary' : 'dashed'}
            onClick={() => onSelect(number)}
          >
            {number}
          </Number>
        ))}
      </NumbersWrapper>

      <NumbersWrapper>
        {numbersLeft.map((number, index) => (
          <LeftNumber key={index}>{number}</LeftNumber>
        ))}
      </NumbersWrapper>
    </Container>
  )
})

const Container = styled.div`
  display: grid;
  gap: 4px 0;
`

const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, min-content);
  gap: 0 12px;
`

const Number = styled(Button)`
  height: 48px;
  width: 48px;
`

const LeftNumber = styled.p`
  width: 48px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  font-size: 12px;
`
