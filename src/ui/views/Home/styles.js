import {css} from '@emotion/react';

const classes = {};

classes.root = (theme) => css`
  background: ${theme.palette.containerDark};
  color: #FFFFFF;
  display: flex;
  flex-flow: column;
  height: calc(100vh - 40px);
  overflow: auto;
  padding: 20px;
  position: relative;
`;

export default classes;
