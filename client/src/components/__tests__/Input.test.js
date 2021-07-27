import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import React from 'react'
import Input from '../Input'

afterEach(cleanup)

test('should render input component', () => {
  render(<Input placeholder='Search' onChange={() => {}} />)

  const input = screen.getByTestId('input')
  expect(input).toBeInTheDocument()
  expect(input.getAttribute('placeholder')).toMatch('Search')

  fireEvent.change(input, { target: { value: 'Hello World!' }})
  expect(input.value).toBe('Hello World!')
})
