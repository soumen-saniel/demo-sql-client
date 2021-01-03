import React from 'react';
import rows from '../../../../utils/dummyData/rows/employees.json';
import columns from '../../../../utils/dummyData/columns/employees.json';

// Components
import DataGrid from '../../../components/DataGrid';

// Styles
import classes from './styles';

const Result = () => {
  return (
    <div css={classes.root}>
      <DataGrid
        data={{
          rows,
          columns,
        }}
      />
    </div>
  );
};

export default Result;
