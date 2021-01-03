import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

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
  currentTab,
  queries,
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
            css={classes.query}
            key={query.id}
          >
            <CodeIcon css={(theme) => classes.icon(theme, selected)} />
            <div css={classes.queryName}>{query.name}</div>
            <CloseIcon css={classes.icon} />
          </div>
          {selected && (
            <div css={classes.historyList}>
              {query.history.map((history, index) => (
                <div
                  key={index}
                  css={classes.history}
                >
                  <div>{history.query}</div>
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
  currentTab: PropTypes.shape({
    queryId: PropTypes.string,
  }),
  queries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.shape({
      query: PropTypes.string,
      createdAt: PropTypes.object,
    })),
  })),
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
    state.tabs[state.currentTab] : {};

  return {
    currentTab,
    queries,
  };
};

export default connect(mapStateToProps)(QueriesSection);