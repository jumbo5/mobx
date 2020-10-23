import React, { useEffect, useState } from 'react'
import { Button, Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Board } from './components'
import { sudokuState } from './control'

export interface IndexPageProps {
  initialBoard: number[][]
}

export const IndexPage: React.FC<IndexPageProps> = observer(
  ({ initialBoard }) => {
    const [isInvalidated, setIsInvalidated] = useState(false)
    const { cellSide, isSolved } = sudokuState

    useEffect(() => {
      sudokuState.initializeBoard(initialBoard)
    }, [JSON.stringify(initialBoard)])

    const onCheckClick = () => {
      console.log(sudokuState.validateBoard())
      setIsInvalidated(!sudokuState.validateBoard())

      setTimeout(() => setIsInvalidated(false), 700)
    }

    return (
      <Container>
        <Menu>
          <Button onClick={onCheckClick} type="primary" danger={isInvalidated}>
            {isSolved ? 'Верно' : isInvalidated ? 'Неверно' : 'Проверить'}
          </Button>

          <SliderWrapper>
            <p>Размер ячеек</p>
            <Slider
              min={48}
              max={96}
              defaultValue={cellSide}
              step={2}
              onChange={(num: number) => sudokuState.updateCellSide(num)}
            />
          </SliderWrapper>
        </Menu>

        <Board />
      </Container>
    )
  },
)

const Container = styled.div`
  height: 100%;
  display: grid;
  justify-content: left;
  gap: 96px;
`

const Menu = styled.div`
  width: 400px;
`

const SliderWrapper = styled.div`
  margin-top: 24px;
`
