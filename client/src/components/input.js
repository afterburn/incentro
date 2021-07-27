import React from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import omit from 'omit.js'

const Input = styled((props) => {
  const handleChange = e => {
    props.onChange(e.target.value)
  }
  
  const dHandleChange = props.hasOwnProperty('debounce')
    ? debounce(handleChange, props.debounce)
    : handleChange

  return <input
    {...omit(props, ['forwardRef'])}
    ref={props.forwardRef}
    onChange={dHandleChange}
    data-testid='input'
  />
})`
  background-color: rgba(255, 255, 255, .1);
  padding: 8px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  width: 100%;
`

export default Input