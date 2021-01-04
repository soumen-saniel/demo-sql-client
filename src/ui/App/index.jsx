import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Views
import Home from '../views/Home';
import LeftDrawer from '../views/LeftDrawer';
import QueryView from '../views/QueryView';
import TabBar from '../views/TabBar';

// Styles
import classes from './styles';

const App = ({
  tabSelected,
}) => {
  return (
    <main css={classes.root}>
      <LeftDrawer />
      <div css={classes.mainContainer}>
        <TabBar />
        {tabSelected && <QueryView />}
        {!tabSelected && <Home />}
      </div>
    </main>
  );
};

App.propTypes = {
  tabSelected: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    tabSelected: state.currentTab !== null,
  };
};

export default connect(mapStateToProps)(App);
