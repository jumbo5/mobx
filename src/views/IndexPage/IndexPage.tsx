import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Board, Numbers, Settings } from './components'
import { sudokuState } from './control'

export interface IndexPageProps {
  initialBoard: number[][]
}

export const IndexPage: React.FC<IndexPageProps> = observer(
  ({ initialBoard }) => {
    const [isInvalidated, setIsInvalidated] = useState(false)
    const { isSolved, generatingBoard } = sudokuState

    useEffect(() => {
      sudokuState.initializeBoard(initialBoard)
    }, [JSON.stringify(initialBoard)])

    const onCheckClick = () => {
      setIsInvalidated(!sudokuState.validateBoard())

      setTimeout(() => setIsInvalidated(false), 1200)
    }

    return (
      <Container>
        <SettingsWrapper>
          <Settings />
        </SettingsWrapper>

        <Menu>
          <Button onClick={onCheckClick} type="primary" danger={isInvalidated}>
            {isSolved ? 'Верно' : isInvalidated ? 'Неверно' : 'Проверить'}
          </Button>

          <Button onClick={() => sudokuState.clearBoard()}>Очистить</Button>

          <Button
            onClick={() => sudokuState.generateBoard()}
            loading={generatingBoard}
          >
            Новая игра
          </Button>
        </Menu>

        <Board />

        <Numbers />
      </Container>
    )
  },
)

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  gap: 32px;
`

const SettingsWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, min-content);
  gap: 0 12px;
`
