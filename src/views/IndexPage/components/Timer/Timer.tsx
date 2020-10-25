import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { settingsState } from '../../control'

export const Timer = observer(() => {
  const { showTimer } = settingsState
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (timer === 3600) {
      setTimer(0)
    }

    const timeout = setTimeout(() => setTimer((timer) => timer + 1), 1000)

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
