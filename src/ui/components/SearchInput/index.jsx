import React from 'react';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Styles
import classes from './styles';

const SearchInput = (props) => {
  return (
    <div css={classes.root}>
      <input
        css={classes.input}
        {...props}
      />
      <SearchIcon css={classes.icon} />
    </div>
  );
};

export default SearchInput;
