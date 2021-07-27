import React from 'react'
import styled, { keyframes } from 'styled-components'

import { FaSpinner } from 'react-icons/fa'

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled(({ className }) => {
  return <div className={className}>
    <FaSpinner size={32} />
  </div>
})`
  display: flex;
  animation: ${spinAnimation} .6s linear infinite;
`

export default Spinner