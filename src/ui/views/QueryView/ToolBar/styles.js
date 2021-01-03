import {css} from '@emotion/react';

const classes = {};

classes.root = (theme) => css`
  align-items: center;
  border-bottom: 1px solid ${theme.palette.borderPrimary};
  display: flex;
  flex-flow: row nowrap;
  height: 40px;
  justify-content: flex-start;
  padding: 0px 20px;
  position: relative;
  width: 100%;
`;

classes.button = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  font-weight: 500;
  justify-content: flex-start;
  margin-left: 20px;
`;

classes.icon = (theme) => css`
  color: ${theme.palette.secondary};
  height: 18px;
  margin-left: 10px;
  width: 18px;
`;

classes.divider = css`
  flex-grow: 1;
`;

classes.inputLabel = css`
  font-weight: 500;
  margin-right: 15px;
`;

export default classes;
