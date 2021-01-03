import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Search from '../../../components/SearchInput';

// Icons
import BorderAllIcon from '@material-ui/icons/BorderAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import classes from './styles';

const TablesSection = ({
  tables,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedTable, setExpandedTable] = useState();

  const tableList = useMemo(() => {
    return Object.values(tables).filter((table) => {
      return table.name.match(search);
    }).map((table) => {
      return (
        <Accordion
          key={table.name}
          expanded={expandedTable === table.name}
          onChange={() => setExpandedTable(
            table.name === expandedTable ? null : table.name,
          )}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <BorderAllIcon css={classes.icon} />
            <span>{table.name}</span>
          </AccordionSummary>
          <AccordionDetails css={classes.columnList}>
            {Object.entries(table.columns).map(([columnName, column]) => {
              return (
                <div
                  key={column.name}
                  css={classes.column}
                >
                  <div>{columnName}</div>
                  <div css={classes.columnType}>{column.type}</div>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      );
    });
  }, [expandedTable, search, tables]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3>Tables</h3>
      </AccordionSummary>
      <AccordionDetails>
        <Search
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Tables'
          value={search}
        />
        <div css={classes.divider} />
        {tableList}
      </AccordionDetails>
    </Accordion>
  );
};

TablesSection.propTypes = {
  tables: PropTypes.shape({
    name: PropTypes.string,
    columns: PropTypes.shape({}),
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
