import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';

// Actions
import {createQuery, updateQuery} from '../../../../state/queries';
import {updateTab} from '../../../../state/tabs';

import Share from './Share';

// Components
import Input from '../../../components/Input';
import SearchInput from '../../../components/SearchInput';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import FileCopyIcon from '@material-ui/icons/FileCopy';

// Styles
import classes from './styles';

const ToolBar = ({
  currentQuery,
  currentTab,
  createQuery,
  updateQuery,
  updateTab,
}) => {
  const [search, setSearch] = useState(currentTab.search || '');
  const [name, setName] = useState(currentTab.name || '');

  const handleOnSearchChange = useRef(debounce((currentTab, search) => {
    updateTab({
      id: currentTab.id,
      search,
    });
  }, 250, {
    leading: false,
    trailing: true,
  }));

  return (
    <div css={classes.root}>
      <SearchInput
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleOnSearchChange.current(currentTab, value);
        }}
        placeholder='Search Results'
        value={search}
      />
      <div
        css={(theme) => classes.button(theme, currentTab.saved)}
        onClick={() => {
          if (!currentTab.saved) {
            updateQuery({
              id: currentQuery.id,
              query: currentTab.unsavedQuery,
            });

            updateTab({
              id: currentTab.id,
              saved: true,
            });
          }
        }}
      >
        <span>Save</span>
        <SaveIcon css={(theme) => classes.icon(theme, currentTab.saved)} />
      </div>
      <Share />
      <div
        css={classes.button}
        onClick={() => {
          createQuery(currentQuery.query, `${currentQuery.name} copy`);
        }}
      >
        <span>Make Copy</span>
        <FileCopyIcon css={classes.icon} />
      </div>
      <div css={classes.divider} />
      <div css={classes.inputLabel}>Query Name</div>
      <Input
        onBlur={() => {
          const value = name.trim();
          if (value) {
            updateQuery({
              id: currentQuery.id,
              name: value,
              query: !currentTab.saved ?
                currentTab.unsavedQuery : currentQuery.query,
            });

            updateTab({
              id: currentTab.id,
              name: value,
              saved: true,
            });
          }
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder='Query Name'
        value={name}
      />
    </div>
  );
};

ToolBar.propTypes = {
  currentQuery: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    query: PropTypes.string,
  }),
  currentTab: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.name,
    saved: PropTypes.bool,
    search: PropTypes.string,
    unsavedQuery: PropTypes.string,
  }),
  createQuery: PropTypes.func,
  updateQuery: PropTypes.func,
  updateTab: PropTypes.func,
};

ToolBar.defaultProps = {
  currentQuery: {},
  currentTab: {},
};

const mapStateToProps = (state) => {
  const currentTab = state.currentTab !== null ?
    state.tabs[state.currentTab] || {} :
    {};
  const currentQuery = state.queries[currentTab.queryId] || {};

  return {
    currentTab,
    currentQuery,
  };
};

export default connect(mapStateToProps, {
  createQuery,
  updateQuery,
  updateTab,
})(ToolBar);
