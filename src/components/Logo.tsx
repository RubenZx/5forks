import image from '@Assets/img/5forks.png'
import React from 'react'
import styled from 'styled-components/native'

const Image = styled.Image`
  height: 150px;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.marginTop};
  margin-bottom: ${({ theme }) => theme.spacing.marginBottom};
`

const Logo = () => {
  return <Image source={image} resizeMode="contain" />
}

export default Logo
