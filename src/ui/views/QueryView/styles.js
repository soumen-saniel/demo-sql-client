import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  display: flex;
  flex-flow: column;
  height: calc(100vh - 40px);
  overflow: hidden;
  position: relative;
`;

classes.editorContainer = (theme) => css`
  border-bottom: 1px solid ${theme.palette.borderPrimary};
  position: relative;
`;

classes.runButton = css`
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 100;
`;

classes.icon = css`
  height: 18px;
  margin-left: 5px;
  width: 18px;
`;

export default classes;
