import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --borderRadius: 4px;

    --warn: #F44336;
    --warnHover: #D32F2F;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: white;
    box-sizing: border-box;
  }

  html, body {
    background-color: #222;
  }
`