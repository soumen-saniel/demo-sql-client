import {css} from '@emotion/react';

const classes = {};

classes.divider = css`
  margin-bottom: 10px;
`;

classes.query = (theme, selected) => css`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 30px;

  ${selected && `
    color: ${theme.palette.secondary};
  `}
`;

classes.queryName = css`
  flex-grow: 1;
`;

classes.icon = (theme, selected) => css`
  color: ${theme.palette.textPrimary};
  cursor: pointer;
  height: 18px;
  margin-right: 7px;
  width: 18px;

  ${selected && `
    color: ${theme.palette.secondary};
  `}
`;

classes.historyList = (theme) => css`
  background: ${theme.palette.borderSecondary};
  border-radius: 4px;
  overflow: hidden;
  padding: 0px 5px;
`;

classes.history = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow; hidden;
  padding: 5px 0px;
  white-space: nowrap;
  width: 100%;
`;

classes.dateTime = (theme) => css`
  color: ${theme.palette.textSecondary};
  font-size: 12px;
  margin-left: 15px;
`;

export default classes;
