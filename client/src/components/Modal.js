import React from 'react'
import styled, { css }from 'styled-components'

import Button from './Button'
import { FaTimes } from 'react-icons/fa'

const ModalContext = React.createContext({})

const Modal = styled(({ className, children, onClose }) => {
  const modalContext = {
    close: onClose
  }

  return <ModalContext.Provider value={modalContext}>
    <div className={className}>
      <div className='modal'>
        {children}
      </div>
    </div>
  </ModalContext.Provider>
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity .1s ease-out,
    visibility 0s linear .1s;

  .modal {
    display: flex;
    flex-direction: column;
    background-color: #333;
    border-radius: var(--borderRadius);
    transform: scale(.8);
    transition: transform .1s ease-out;

    > div {
      padding: 12px;
    }
  }

  ${props => props.active && css`
    visibility: visible;
    opacity: 1;
    pointer-events: all;
    transition: opacity .1s ease-in,
      visiblity .1s linear;

    .modal {
      transform: scale(1);
      transition: transform .1s ease-in;
    }
  `}
`

Modal.Header = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`

Modal.Content = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  padding: 24px 12px !important;
`

Modal.Footer = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid rgba(0,0,0,0.2);
`

Modal.Title = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  font-weight: bold;
`

Modal.Close = styled(({ className, children }) => {
  const modalContext = React.useContext(ModalContext)

  return <Button className={className} onClick={modalContext.close} color='transparent'>
    <FaTimes />
  </Button>
})`
  margin-left: 12px;
`

export default Modal