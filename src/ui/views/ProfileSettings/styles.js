import { css } from '@emotion/react';

const classes = {};

classes.root = (theme) => css`
  align-items: center;
  background: ${theme.palette.containerDark};
  border-radius: 50%;
  color: ${theme.palette.secondary};
  cursor: pointer;
  display: flex;
  font-weight: 500;
  height: 25px;
  justify-content: center;
  width: 25px;
`;

export default classes;
