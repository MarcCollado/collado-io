import { createGlobalStyle } from 'styled-components';
import { fluid } from '../utils/fluid';

const GlobalStyles = createGlobalStyle`

  html {
    margin: ${fluid(36, 96)} auto;
    font-size: 16px;

    @media (min-width: 768px) {
      font-size: 17px;
    }

    @media (min-width: 1024px) {
      font-size: 18px;
    }
  }

  body {
    margin: auto ${fluid(25, 128)};
  }

  h1,
  h2,
  h3 {
    margin-block-start: ${fluid(24, 32)};
  }

  h1 {
    padding: 0 ${fluid(8, 12)};
    font-size: 2em;
  }

  h2 {
    font-size: 1.25em;
  }

  h3 {
    font-size: 1.1em;
  }

  p, li {
    margin-block-end: ${fluid(4, 8)};
    font-size: 1em;
  }

  ul,
  ol {
    padding-inline-start: ${fluid(20, 24)};
  }

  blockquote {
    margin: ${fluid(20, 24)} 0px;
    padding-inline-start: ${fluid(16, 18)};
  }

  code {
    padding: ${fluid(4, 6)} ${fluid(8, 12)};
  }

  pre {
    padding: ${fluid(16, 20)} ${fluid(24, 28)};
  }

  hr {
    margin: ${fluid(32, 36)} 0px;
  }
`;

export default GlobalStyles;
