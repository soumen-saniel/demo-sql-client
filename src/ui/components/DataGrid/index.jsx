import React, {useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

// Styles
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './styles/styles.css';
import classes from './styles/styles';

const DataGrid = ({
  data,
  search,
}) => {
  const agGrid = useRef();

  const rowData = useMemo(() => {
    return data.rows;
  }, [data.rows]);

  const columns = useMemo(() => {
    if (data.columns) {
      const columns = Object.entries(data.columns).map(([name, col]) => {
        return (
          <AgGridColumn
            key={name}
            field={name}
            filter
            fieldType={col.type}
            headerName={col.type ? `${name} (${col.type})` : name}
            resizable
            sortable
            suppressMenu
          ></AgGridColumn>
        );
      });

      if (columns.length) {
        columns.unshift(
            <AgGridColumn
              disableClick
              lockPosition
              lockVisible
              headerName='Row No.'
              key='#'
              field='#'
              fieldType=''
              filter
              getQuickFilterText={() => ''}
              pinned='left'
              resizable={false}
              suppressMenu
              sortable
              suppressMovable
              suppressNavigable
              suppressSizeToFit
              width={100}
              valueGetter={(params) => {
                if (params.data['#']) {
                  return params.data['#'];
                }
                return Number(params.node.id) + 1;
              }}
            ></AgGridColumn>,
        );
      }

      return columns;
    }

    return null;
  }, [data.columns]);

  useEffect(() => {
    if (agGrid.current) {
      agGrid.current.api.setQuickFilter(search);
    }
  }, [agGrid.current, search]);

  return (
    <div className='ag-theme-material' css={classes.root}>
      <AgGridReact
        ref={agGrid}
        headerHeight={30}
        paginationAutoPageSize
        pagination
        rowData={rowData}
        rowHeight={30}
      >
        {columns}
      </AgGridReact>
    </div>
  );
};

DataGrid.propTypes = {
  data: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    columns: PropTypes.shape({}),
  }),
  search: PropTypes.string,
};

DataGrid.defaultProps = {
  data: {
    rows: [],
    columns: {},
  },
  search: '',
};

export default DataGrid;
