import React from 'react';
import PropTypes from 'prop-types';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Classes
import classes from './styles';

const Select = ({
  options,
  ...otherProps
}) => {
  return (
    <div css={classes.root}>
      <select
        css={classes.input}
        {...otherProps}
      >
        {options.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      <ExpandMoreIcon css={classes.icon} />
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

Select.defaultProps = {
  options: [],
};

export default Select;
