import {css} from '@emotion/react';

const classes = {};

classes.root = css`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 40px;
  overflow: hidden;
  padding-right: 20px;
  position: relative;
  width: 100%;
`;

classes.tabs = (drawerWidth) => css`
  max-width: calc(100vw - ${drawerWidth + 80}px);
`;

classes.tabButton = (theme, selected) => css`
  align-items: center;
  background: ${theme.palette.borderSecondary};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  ${selected && `
    background: ${theme.palette.containerDark};
  `}
`;

classes.tabButtonIcon = (theme, selected) => css`
  color: ${theme.palette.textPrimary};
  height: 30px;
  width: 30px;

  ${selected && `
    color: ${theme.palette.secondary};
  `}
`;

classes.addTabButton = css`
  box-shadow: 15px 2px 11px -15px rgba(0,0,0,0.3) inset;
`;

classes.addButtonIcon = (theme) => css`
  color: ${theme.palette.textPrimary};
  height: 20px;
  width: 20px;
`;

classes.tab = (theme, selected) => css`
  align-items: center;
  background: ${theme.palette.borderSecondary};
  box-shadow: 15px 2px 11px -15px rgba(0,0,0,0.3) inset;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  height: 40px;
  padding: 0px 8px 0px 20px;
  width: 100%;

  span {
    flex-grow: 1;
    font-size: 14;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${selected && `
    color: ${theme.palette.secondary};
    background: ${theme.palette.containerDark};
  `}
`;

classes.icon = (theme, selected) => css`
  color: ${theme.palette.textPrimary};
  cursor: pointer;
  height: 18px;
  margin-left: 5px;
  width: 18px;

  ${selected && `
    color: ${theme.palette.borderPrimary};
  `}
`;

export default classes;
