import {css} from '@emotion/react';

const classes = {};

classes.root = (theme) => css`
  border-right: 1px solid ${theme.palette.borderPrimary};
  overflow: hidden;
  overflow-y: auto;
  padding: 20px;
`;

classes.logoContainer = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

classes.logo = (theme) => css`
  color: ${theme.palette.primary};
  font-weight: 700;
  font-size: 20px;
  margin: 0px;
  padding: 0px;
`;

export default classes;
