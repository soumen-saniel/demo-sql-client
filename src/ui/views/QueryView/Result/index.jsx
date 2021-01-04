import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import DataGrid from '../../../components/DataGrid';

// Styles
import classes from './styles';

const Result = ({
  currentTab,
}) => {
  if (!currentTab.data) {
    return null;
  }

  return (
    <div css={classes.root}>
      <DataGrid
        data={currentTab.data}
      />
    </div>
  );
};

Result.propTypes = {
  currentTab: PropTypes.shape({
    data: PropTypes.shape({
      rows: PropTypes.arrayOf(PropTypes.object),
      columns: PropTypes.object,
    }),
    loading: PropTypes.bool,
  }),
  updateTab: PropTypes.func,
};

const mapStateToProps = (state) => {
  const currentTab = state.currentTab !== null ?
    state.tabs[state.currentTab] :
    {};

  return {
    currentTab,
  };
};

export default connect(mapStateToProps)(Result);
