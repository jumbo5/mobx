import React, { useEffect, useRef, useState } from 'react'
import { axios } from '@axios'
import { useStoreSelect } from '@store/useStoreSelect'
import { ISearch, ITrack } from '@types'
import { Button, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

export const IndexPage = observer(() => {
  const [inputValue, setInputValue] = useState('')
  const [searchedTracks, setSearchedTracks] = useState<ITrack[]>([])

  const { todos } = useStoreSelect(({ todos }) => ({ todos }))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios(
      `https://api.spotify.com/v1/search?q=${inputValue}&type=track,album`,
    ).then((res) => {
      setSearchedTracks((res.data.tracks as ISearch<ITrack[]>).items)
    })

    setInputValue('')
  }

  console.log(searchedTracks)

  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button>Search</Button>
      </StyledForm>

      {searchedTracks.map(({ name, id }) => (
        <h1 key={id}>{name}</h1>
      ))}

      {todos.list?.map(({ $modelId, text }) => (
        <h1 key={$modelId}>{text}</h1>
      ))}
    </Container>
  )
})

const Container = styled.div``

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 0 12px;
`
