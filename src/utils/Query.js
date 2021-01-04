// Dummy data
import employeesRows from './dummyData/rows/employees.json';
import branchesRows from './dummyData/rows/branches.json';
import employeesColumns from './dummyData/columns/employees.json';
import branchesColumns from './dummyData/columns/branches.json';

const fetchData = (query) => {
  const result = new Promise((resolve) => {
    setTimeout(() => {
      if (query.match('employees')) {
        resolve({
          columns: employeesColumns,
          rows: employeesRows,
        });
      } else if (query.match('branches')) {
        resolve({
          columns: branchesColumns,
          rows: branchesRows,
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });

  return result;
};

export default {
  fetchData,
};
