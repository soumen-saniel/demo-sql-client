import {css} from '@emotion/react';

const classes = {};

classes.divider = css`
  margin-bottom: 10px;
`;

classes.icon = (theme) => css`
  color: ${theme.palette.textPrimary};
  height: 18px;
  margin-right: 7px;
  width: 18px;
`;

classes.columnList = (theme) => css`
  background: ${theme.palette.borderSecondary};
  border-radius: 4px;
  overflow: hidden;
  padding: 0px 5px;
`;

classes.column = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow; hidden;
  padding: 5px 0px;
  white-space: nowrap;
  width: 100%;
`;

classes.columnType = (theme) => css`
  color: ${theme.palette.textSecondary};
  font-size: 12px;
  margin-left: 15px;
`;

export default classes;
