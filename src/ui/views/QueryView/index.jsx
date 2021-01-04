import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Resizable} from 're-resizable';
import {connect} from 'react-redux';

// Actions
import {updateTab} from '../../../state/tabs';
import {saveHistory} from '../../../state/queries';

// Api
import Query from '../../../utils/Query';

// Components
import Button from '@material-ui/core/Button';
import Editor from '../../components/Editor';

import Result from './Result';
import ToolBar from './ToolBar';

// Icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// Styles
import classes from './styles';

const QueryView = ({
  currentQuery,
  currentTab,
  saveHistory,
  updateTab,
}) => {
  const [query, setQuery] = useState();

  useEffect(() => {
    if (!currentTab.saved) {
      setQuery(currentTab.unsavedQuery);
    } else {
      setQuery(currentQuery.query);
    }
  }, [currentQuery, currentTab]);

  const runQuery = useCallback(async () => {
    try {
      updateTab({
        id: currentTab.id,
        loading: true,
      });

      const data = await Query.fetchData(query);

      saveHistory(currentTab.queryId, query);

      updateTab({
        id: currentTab.id,
        loading: false,
        data,
      });
    } catch (err) {
      updateTab({
        id: currentTab.id,
        loading: false,
      });
      console.log(err);
    }
  }, [currentTab, query]);

  return (
    <section css={classes.root}>
      <Resizable
        css={classes.editorContainer}
        enable={{bottom: true}}
        defaultSize={{
          width: '100%',
          height: '300px',
        }}
        minHeight={100}
        maxHeight={600}
      >
        <Button
          color='primary'
          css={classes.runButton}
          disableRipple
          onClick={() => {
            runQuery();
          }}
          variant='contained'
        >
          <span>{currentTab.loading ? 'Running...' : 'Run'}</span>
          <PlayArrowIcon css={classes.icon} />
        </Button>
        <Editor
          id={currentTab.id}
          onChange={(value) => {
            setQuery(value);
            updateTab({
              id: currentTab.id,
              saved: false,
              unsavedQuery: value,
            });
          }}
          value={query}
        />
      </Resizable>
      <ToolBar />
      <Result />
    </section>
  );
};

QueryView.propTypes = {
  currentQuery: PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
  }),
  currentTab: PropTypes.shape({
    id: PropTypes.string,
    queryId: PropTypes.string,
    loading: PropTypes.bool,
    saved: PropTypes.bool,
    unsavedQuery: PropTypes.string,
  }),
  saveHistory: PropTypes.func,
  updateTab: PropTypes.func,
};

QueryView.defaultProps = {
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
  saveHistory,
  updateTab,
})(QueryView);
