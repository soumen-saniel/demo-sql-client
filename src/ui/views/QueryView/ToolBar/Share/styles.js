import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  height: 400px;
  width: 600px;
`;

classes.title = (theme) => css`
  align-items: center;
  border-bottom: 1px solid ${theme.palette.borderPrimary};
  display: flex;
  font-size: 26px;
  font-weight: 700;
  justify-content: space-between;
`;

classes.closeIcon = (theme) => css`
  color: ${theme.palette.textPrimary};
  cursor: pointer;
  height: 26px;
  width: 26px;
`;

classes.controlsContainer = css`
  align-items: flex-end;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
`;

classes.inputContainer = css`
  margin-right: 15px;
`;

classes.inputLabel = css`
  font-weight: 500;
  margin-bottom: 10px;
`;

classes.membersList = css``;

classes.membersContainer = (theme, userEmail) => css`
  align-items: center;
  display: flex;
  margin-bottom: 20px;

  ${userEmail && `
    color: ${theme.palette.primary};
  `}
`;

classes.email = css`
  margin-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
`;

classes.removeIcon = css`
  cursor: pointer;
  height: 18px;
  margin-left: 15px;
  width: 18px;
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

export default classes;
