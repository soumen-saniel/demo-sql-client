import React, { useEffect } from 'react';

// Views
import LeftDrawer from '../views/LeftDrawer';
import QueryView from '../views/QueryView';
import TabBar from '../views/TabBar';

// Styles
import classes from './styles';

const App = () => {
  useEffect(() => {});

  return (
    <main css={classes.root}>
      <LeftDrawer />
      <div css={classes.mainContainer}>
        <TabBar />
        <QueryView />
      </div>
    </main>
  );
};

export default App;
