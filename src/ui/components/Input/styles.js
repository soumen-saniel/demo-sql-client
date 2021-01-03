import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  height: 30px;
  position: relative;
  width: 200px;
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
  padding: 0px 15px;
  width: 100%;

  &:placeholder {
    color: ${theme.palette.textLabel};
  }
`;

export default classes;
