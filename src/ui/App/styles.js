import { css } from '@emotion/react';

const classes = {};

classes.root = css`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  justify-content: flex-start;
  overflow: hidden;
  width: 100vw;
`;

classes.mainContainer = css`
  flex-grow: 1;
`;

export default classes;
