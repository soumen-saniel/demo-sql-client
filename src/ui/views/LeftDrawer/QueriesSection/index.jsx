import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

// Actions
import {addTab, updateTab} from '../../../../state/tabs';
import {deleteQuery} from '../../../../state/queries';

// Components
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Search from '../../../components/SearchInput';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import classes from './styles';

const QueriesSection = ({
  addTab,
  currentTab,
  deleteQuery,
  queries,
  updateTab,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState('');

  const queryList = useMemo(() => {
    return queries.filter((query) => {
      return query.name.match(search);
    }).map((query) => {
      const selected = query.id === currentTab.queryId;

      return (
        <>
          <div
            css={(theme) => classes.query(theme, selected)}
            key={query.id}
            onClick={() => addTab(query.id)}
          >
            <CodeIcon css={(theme) => classes.icon(theme, selected)} />
            <div css={classes.queryName}>{query.name}</div>
            <CloseIcon
              css={classes.icon}
              onClick={(e) => {
                e.stopPropagation();
                deleteQuery(query.id);
              }}
            />
          </div>
          {selected && (
            <div css={classes.historyList}>
              {query.history.map((history, index) => (
                <div
                  key={index}
                  css={classes.history}
                  onClick={() => {
                    updateTab({
                      id: currentTab.id,
                      unsavedQuery: history.query,
                      saved: false,
                    });
                  }}
                >
                  <div css={classes.historyQuery}>{history.query}</div>
                  <div css={classes.dateTime}>
                    {moment(history.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    });
  }, [currentTab, queries, search]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3>Queries</h3>
      </AccordionSummary>
      <AccordionDetails>
        <Search
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Queries'
          value={search}
        />
        <div css={classes.divider} />
        {queryList}
      </AccordionDetails>
    </Accordion>
  );
};

QueriesSection.propTypes = {
  addTab: PropTypes.func,
  currentTab: PropTypes.shape({
    id: PropTypes.string,
    queryId: PropTypes.string,
  }),
  deleteQuery: PropTypes.func,
  queries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.shape({
      query: PropTypes.string,
      createdAt: PropTypes.object,
    })),
  })),
  updateTab: PropTypes.func,
};

QueriesSection.defaultProps = {
  currentTab: {},
  queries: [],
};

const mapStateToProps = (state) => {
  const integration = state.integrations[state.currentIntegration];
  const queries = Object.values(state.queries).filter((query) => {
    return query.integrationId === integration.id;
  });
  const currentTab = state.currentTab !== null ?
    state.tabs[state.currentTab] || {} : {};

  return {
    currentTab,
    queries,
  };
};

export default connect(mapStateToProps, {
  addTab,
  deleteQuery,
  updateTab,
})(QueriesSection);
