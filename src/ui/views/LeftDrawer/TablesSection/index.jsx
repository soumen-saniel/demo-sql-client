import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const TablesSection = ({
  tables,
}) => {
  useEffect(() => {}, []);

  return (
    <div>Tables</div>
  );
};

TablesSection.propTypes = {
  tables: PropTypes.shape({
    name: PropTypes.string,
    columns: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
};

TablesSection.defaultProps = {
  tables: {},
};

const mapStateToProps = (state) => {
  const integration = state.integrations[state.currentIntegration];

  return {
    tables: integration.resources.tables,
  };
};

export default connect(mapStateToProps)(TablesSection);
