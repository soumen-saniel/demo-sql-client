import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  height: 30px;
  max-width: 200px;
  position: relative;
  width: 100%;
`;

classes.input = (theme) => css`
  align-items: center;
  background: ${theme.palette.borderSecondary};
  border: none !important;
  border-radius: 4px;
  display: flex;
  font-weight: 500;
  height: 100%;
  outline: none !important;
  padding: 0px 25px 0px 15px;
  width: 100%;

  &:placeholder {
    color: ${theme.palette.textLabel};
  }
`;

classes.icon = (theme) => css`
  color: ${theme.palette.secondary};
  height: 18px;
  position: absolute;
  right: 9px;
  top: 6px;
  width: 18px;
`;

export default classes;
