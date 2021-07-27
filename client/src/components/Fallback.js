import React from 'react'
import styled from 'styled-components'

import Spinner from './Spinner'

const Fallback = styled(({ className }) => {
  return <div className={className}>
    <Spinner />
  </div>
})`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Fallback