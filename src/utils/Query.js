// Dummy data
import employees from './dummyData/employees.json';
import branches from './dummyData/branches.json';

const runQuery = (query) => {
  const result = new Promise((resolve) => {
    setTimeout(() => {
      if (query.match('employees')) {
        resolve(employees);
      } else {
        resolve(branches);
      }
    }, 200);
  });

  return result;
};

export default {
  runQuery,
};
