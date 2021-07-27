import React from 'react'
import styled from 'styled-components'

const getColor = (color) => {
  switch (color) {
    case 'warn':
      return 'var(--warn)'
  }
}


const getHoverColor = (color) => {
  switch (color) {
    case 'warn':
      return 'var(--warnHover)'
  }
}

const Button = styled((props) => {
  return <button {...props}>
    {props.children}
  </button>
})`
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: var(--borderRadius);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => getColor(props.color)};
  transition: background-color .2s ease-out;

  &:hover {
    background-color: ${props => getHoverColor(props.color)};
    transition: background-color .2s ease-in;
  }
`

export default Button