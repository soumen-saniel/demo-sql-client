import {css} from '@emotion/react';

const classes = {};

classes.root = (theme) => css`
  border-bottom: 1px solid ${theme.palette.borderPrimary};
  height: 40px;
  position: relative;
  width: 100%;
`;

export default classes;
