import {css} from '@emotion/react';

const classes = {};

classes.listItem = (theme, active) => css`
  cursor: pointer;
  padding: 10px 15px;
  ${active && `
    color: ${theme.palette.secondary};
  `}

  &:hover {
    background: ${theme.palette.borderSecondary};
  }
`;

export default classes;
