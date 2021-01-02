import React, { useEffect } from 'react';
import { Resizable } from 're-resizable';

// Styles
import classes from './styles';

const LeftDrawer = () => {
  useEffect(() => {});

  return (
    <Resizable
      css={classes.root}
      enable={{ right: true }}
      defaultSize={{
        width: 200,
        height: '100vh',
      }}
      minWidth={200}
      maxWidth={500}
    >
      App
    </Resizable>
  );
};

export default LeftDrawer;
