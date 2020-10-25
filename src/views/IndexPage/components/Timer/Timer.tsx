import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { settingsState, sudokuState } from '../../control'

export const Timer = observer(() => {
  const { showTimer } = settingsState
  const { timer, isSolved } = sudokuState

  useEffect(() => {
    let timeout: number

    if (timer === 3600) {
      sudokuState.timer = 0
    }

    if (!isSolved) {
      timeout = setTimeout(() => (sudokuState.timer += 1), 1000)
    }

    return () => clearTimeout(timeout)
  }, [timer])

  return (
    <Container showTimer={showTimer}>
      <div>{`${Math.trunc(timer / 60)}:${`0${timer % 60}`.slice(-2)}`}</div>
    </Container>
  )
})

const Container = styled.div<{ showTimer: boolean }>`
  display: ${({ showTimer }) => (showTimer ? 'block' : 'none')};
`
