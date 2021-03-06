import React from 'react';

// Styles
import classes from './styles';

const Input = (props) => {
  return (
    <div css={classes.root}>
      <input
        css={classes.input}
        {...props}
      />
    </div>
  );
};

export default Input;
