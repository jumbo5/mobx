import React, { useEffect } from 'react'
import { Button, Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Board } from './components'
import { sudokuState } from './model'

export interface IndexPageProps {
  initialBoard: number[][]
}

export const IndexPage: React.FC<IndexPageProps> = observer(
  ({ initialBoard }) => {
    const { validation, cellSide } = sudokuState

    useEffect(() => {
      sudokuState.updateBoard(initialBoard)
    }, [initialBoard])

    return (
      <Container>
        <Menu>
          <Button
            onClick={() => sudokuState.validateBoard()}
            type="primary"
            loading={validation.pending}
            danger={validation.solved === false}
          >
            {validation.solved === false ? 'Неверно' : 'Проверить'}
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
