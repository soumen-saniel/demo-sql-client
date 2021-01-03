import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Actions
import {deleteTab, setCurrentTab} from '../../../state/tabs';
import {createQuery} from '../../../state/queries';

// Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Icons
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloseIcon from '@material-ui/icons/Close';

// Styles
import classes from './styles';

const TabBar = ({
  currentTab,
  createQuery,
  deleteTab,
  leftDrawerWidth,
  setCurrentTab,
  tabs,
}) => {
  return (
    <section css={classes.root}>
      <div css={(theme) => classes.tabButton(theme, !currentTab.id)}>
        <DashboardIcon
          css={(theme) => classes.tabButtonIcon(theme, !currentTab.id)}
          onClick={() => setCurrentTab(null)}
        />
      </div>
      <Tabs
        css={classes.tabs(leftDrawerWidth)}
        onChange={(e, value) => {
          e.stopPropagation();
          setCurrentTab(value);
        }}
        variant='scrollable'
        value={currentTab.id}
        scrollButtons='auto'
      >
        {tabs.map((tab) => {
          const selected = tab.id === currentTab.id;
          return (
            <Tab
              disableFocusRipple
              disableRipple
              key={tab.id}
              label={
                <div css={(theme) => classes.tab(theme, selected)}>
                  <span>{tab.name}</span>
                  <CloseIcon
                    css={(theme) => classes.icon(theme, selected)}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTab(tab.id);
                    }}
                  />
                </div>
              }
              value={tab.id}
            ></Tab>
          );
        })}
      </Tabs>
      <div
        css={[classes.tabButton, classes.addTabButton]}
        onClick={() => createQuery()}
      >
        <AddIcon
          css={classes.addButtonIcon}
        />
      </div>
    </section>
  );
};

TabBar.propTypes = {
  currentTab: PropTypes.shape({
    id: PropTypes.node,
    name: PropTypes.string,
  }),
  createQuery: PropTypes.func,
  deleteTab: PropTypes.func,
  leftDrawerWidth: PropTypes.number,
  setCurrentTab: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.node,
    name: PropTypes.string,
  })),
};

TabBar.defaultProps = {
  currentTab: {},
  tabs: [],
};

const mapStateToProps = (state) => {
  const currentTab = state.currentTab !== null ?
    state.tabs[state.currentTab] || {} :
    {};

  return {
    currentTab,
    leftDrawerWidth: state.leftDrawerWidth,
    tabs: state.tabs,
  };
};

export default connect(mapStateToProps, {
  createQuery,
  deleteTab,
  setCurrentTab,
})(TabBar);
