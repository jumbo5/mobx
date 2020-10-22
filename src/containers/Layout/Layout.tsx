import React from 'react'
import styled from 'styled-components'

export const Layout: React.FC = ({ children }) => (
  <Container>{children}</Container>
)

const Container = styled.div`
  padding: 60px;
  min-height: 100vh;
  height: 100%;
`
