import { render, screen, cleanup } from '@testing-library/react'

import React from 'react'
import Button from '../Button'

afterEach(cleanup)

test('should render button component', () => {
  render(<Button color='warn'>Click me</Button>)

  const button = screen.getByTestId('button')
  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent('Click me')
  expect(button).toHaveStyle({backgroundColor: 'var(--warn)'})
})
