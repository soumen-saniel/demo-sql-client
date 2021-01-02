import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Styles
import classes from './styles';

const ProfileSettins = ({
  user,
}) => (
  <div css={classes.root}>
    {(user.firstName.split(''))[0]}
  </div>
);

ProfileSettins.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};

ProfileSettins.defaultProps = {
  user: {
    firstName: '',
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfileSettins);
