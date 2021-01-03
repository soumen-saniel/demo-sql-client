import React, {useEffect} from 'react';
import {Resizable} from 're-resizable';

import IntegrationSelect from './IntegrationSelect';
import TableSection from './TablesSection';

// Views
import ProfileSettins from '../ProfileSettings';

// Styles
import classes from './styles';

const LeftDrawer = () => {
  useEffect(() => {});

  return (
    <Resizable
      css={classes.root}
      enable={{right: true}}
      defaultSize={{
        width: 200,
        height: '100vh',
      }}
      minWidth={200}
      maxWidth={500}
    >
      <div css={classes.logoContainer}>
        <h1 css={classes.logo}>SQL Client</h1>
        <ProfileSettins />
      </div>
      <IntegrationSelect />
      <TableSection />
    </Resizable>
  );
};

export default LeftDrawer;
