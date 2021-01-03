import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
  tabs,
}) => {
  useEffect(() => {}, []);

  return (
    <section css={classes.root}>
      <div css={(theme) => classes.tabButton(theme, !currentTab.id)}>
        <DashboardIcon
          css={(theme) => classes.tabButtonIcon(theme, !currentTab.id)}
        />
      </div>
      <Tabs
        onChange={() => {}}
        variant='scrollable'
        value={1}
        scrollButtons='auto'
      >
        {tabs.map((tab) => {
          const selected = tab.id === 1;
          return (
            <Tab
              disableFocusRipple
              disableRipple
              key={tab.id}
              label={
                <div css={(theme) => classes.tab(theme, selected)}>
                  <span>{tab.name}</span>
                  <CloseIcon css={(theme) => classes.icon(theme, selected)} />
                </div>
              }
              value={tab.id}
            ></Tab>
          );
        })}
      </Tabs>
      <div css={[classes.tabButton, classes.addTabButton]}>
        <AddIcon css={classes.addButtonIcon} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTab: {
      id: 1,
      name: 'Query tab 1',
    },
    tabs: [{
      id: 1,
      name: 'Query tab 1',
    }, {
      id: 2,
      name: 'Query tab 2',
    }],
  };
};

TabBar.propTypes = {
  currentTab: PropTypes.shape({
    id: PropTypes.node,
    name: PropTypes.string,
  }),
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.node,
    name: PropTypes.string,
  })),
};

export default connect(mapStateToProps)(TabBar);
