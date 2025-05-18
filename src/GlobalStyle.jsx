import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`



  *, *::before, *::after {
    box-sizing: border-box;
  }

  
  body, h1, h2, h3, h4, h5, h6, p, blockquote,
  pre, figure, hr, dl, dd, ul, ol, menu, li,
  fieldset, legend, button, input, textarea, select {
    margin: 0;
    padding: 0;
  }

  
  ul, ol, menu {
    list-style: none;
  }
 
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: "Titillium Web", sans-serif;
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: system-ui, sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  textarea {
    resize: vertical;
  }

  a, button {
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyle;
