import React from 'react'
import styled, { css } from 'styled-components'

const colors = {
  'warn': 'var(--warn)',
  'cta': 'var(--cta)'
}

const hoverColors = {
  'warn': 'var(--warnHover)',
  'cta': 'var(--ctaHover)'
}

const Button = styled((props) => {
  return <button {...props} data-testid='button'>
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
  background-color: ${({ color }) => colors[color]};
  transition: background-color .2s ease-out,
    color .2s ease-out;
  padding: 8px;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ color }) => hoverColors[color]};
    transition: background-color .2s ease-in,
      color .2s ease-in;
  }

  ${props => props.variant === 'outlined' && css`
    background-color: transparent;
    border: 1px solid ${({ color }) => colors[color]};
    color: ${({ color }) => colors[color]};

    &:hover {
      background-color: ${({ color }) => colors[color]};
      color: white;
    }
  `}
`

export default Button