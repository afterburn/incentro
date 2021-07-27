import React from 'react'
import styled, { css } from 'styled-components'

interface IProps {
  children?: React.ReactNode,
  color?: string,
  variant?: string
}

type ColorOptions  = {
  [key: string]: string
}

const colors: ColorOptions = {
  'warn': 'var(--warn)',
  'cta': 'var(--cta)'
}

const hoverColors: ColorOptions = {
  'warn': 'var(--warnHover)',
  'cta': 'var(--ctaHover)'
}

const Button: React.FC = styled((props: IProps) => {
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
  background-color: ${(props) => colors[props.color]};
  transition: background-color .2s ease-out,
    color .2s ease-out;
  padding: 8px;
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => hoverColors[props.color]};
    transition: background-color .2s ease-in,
      color .2s ease-in;
  }

  &:disabled {
    background-color: #ccc;

    &:hover {
      background-color: #ccc;
    }
  }

  ${props => props.variant === 'outlined' && css<IProps>`
    background-color: transparent;
    border: 1px solid ${(props) => colors[props.color]};
    color: ${(props) => colors[props.color]};

    &:hover {
      background-color: ${(props) => colors[props.color]};
      color: white;
    }
  `}
`

export default Button