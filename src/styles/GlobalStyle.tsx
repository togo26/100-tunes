import React from 'react';
import { Global, css } from '@emotion/react';

const styles = css`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  all: unset;
  cursor: pointer;
}

body::-webkit-scrollbar {
  display: none;
}

html, body, #root {
  height: 100%;
  background-color: #000;
}
`;

export const GlobalStyle: React.FC = () => {
  return (<Global styles={styles} />);
};
