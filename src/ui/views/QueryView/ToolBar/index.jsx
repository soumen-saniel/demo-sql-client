import React from 'react';

// Components
import Input from '../../../components/Input';
import SearchInput from '../../../components/SearchInput';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';

// Styles
import classes from './styles';

const ToolBar = () => {
  return (
    <div css={classes.root}>
      <SearchInput
        placeholder='Search Results'
      />
      <div css={classes.button}>
        <span>Save</span>
        <SaveIcon css={classes.icon} />
      </div>
      <div css={classes.button}>
        <span>Share</span>
        <ShareIcon css={classes.icon} />
      </div>
      <div css={classes.button}>
        <span>Make Copy</span>
        <FileCopyIcon css={classes.icon} />
      </div>
      <div css={classes.divider} />
      <div css={classes.inputLabel}>Query Name</div>
      <Input
        placeholder='Query Name'
      />
    </div>
  );
};

export default ToolBar;
