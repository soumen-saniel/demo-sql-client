import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Resizable} from 're-resizable';

// Actions
import {setLeftDrawerWidth} from '../../../state/ui';

import IntegrationSelect from './IntegrationSelect';
import TableSection from './TablesSection';
import QueriesSection from './QueriesSection';

// Views
import ProfileSettins from '../ProfileSettings';

// Styles
import classes from './styles';

const LeftDrawer = ({
  setLeftDrawerWidth,
}) => {
  return (
    <Resizable
      css={classes.root}
      enable={{right: true}}
      defaultSize={{
        width: 250,
        height: '100vh',
      }}
      onResizeStop={(e, direction, ref) => {
        setLeftDrawerWidth(ref.clientWidth);
      }}
      minWidth={250}
      maxWidth={500}
    >
      <div css={classes.logoContainer}>
        <h1 css={classes.logo}>SQL Client</h1>
        <ProfileSettins />
      </div>
      <IntegrationSelect />
      <TableSection />
      <QueriesSection />
    </Resizable>
  );
};

LeftDrawer.propTypes = {
  setLeftDrawerWidth: PropTypes.func,
};

export default connect(null, {
  setLeftDrawerWidth,
})(LeftDrawer);
