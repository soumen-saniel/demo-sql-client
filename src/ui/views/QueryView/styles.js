import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  display: flex;
  flex-flow: column;
  height: calc(100vh - 30px);
  overflow: hidden;
  position: relative;
`;

classes.editorContainer = (theme) => css`
  border-bottom: 1px solid ${theme.palette.borderPrimary};
  position: relative;
`;

export default classes;
