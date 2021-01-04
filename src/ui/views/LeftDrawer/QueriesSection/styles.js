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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  overflow; hidden;
  padding: 5px 0px;
  width: 100%;
`;

classes.historyQuery = css`
  flex-grow: 1;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

classes.dateTime = (theme) => css`
  color: ${theme.palette.textSecondary};
  flex: 0 0 115px;
  font-size: 12px;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default classes;
