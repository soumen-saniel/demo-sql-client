import moment from 'moment';

// Dummy data
const dummyIntegrations = {
  'e145d368-0eab-4e53-b448-44ada1472182': {
    id: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'PG Database',
    type: 'pg',
    credentials: {},
    resources: {
      tables: {
        employees: {
          name: 'employees',
          columns: {
            id: {
              type: 'INT PRIMARY KEY',
            },
            branch_id: {
              type: 'INT',
            },
            email: {
              type: 'VARCHAR(40)',
            },
            age: {
              type: 'INT',
            },
            first_name: {
              type: 'VARCHAR(40)',
            },
            last_name: {
              type: 'VARCHAR(40)',
            },
            contact: {
              type: 'VARCHAR(20)',
            },
          },
        },
        branches: {
          name: 'branches',
          columns: {
            id: {
              type: 'INT PRIMARY KEY',
            },
            manager_id: {
              type: 'INT',
            },
            name: {
              type: 'VARCHAR(40)',
            },
          },
        },
      },
    },
    createdAt: moment(),
  },
  'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1': {
    id: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'MySQL Database',
    type: 'mysql',
    credentials: {},
    resources: {
      tables: {
        employees: {
          name: 'employees',
          columns: {
            id: {
              type: 'INT PRIMARY KEY',
            },
            branch_id: {
              type: 'INT',
            },
            email: {
              type: 'VARCHAR(40)',
            },
            first_name: {
              type: 'VARCHAR(40)',
            },
            last_name: {
              type: 'VARCHAR(40)',
            },
            age: {
              type: 'INT',
            },
            contact: {
              type: 'VARCHAR(20)',
            },
          },
        },
        branches: {
          name: 'branches',
          columns: {
            id: {
              type: 'INT PRIMARY KEY',
            },
            manager_id: {
              type: 'INT',
            },
            name: {
              type: 'VARCHAR(40)',
            },
          },
        },
      },
    },
    createdAt: moment(),
  },
};

// Action types
const actions = {
  ADD_INTEGRATIONS: 'ADD_INTEGRATIONS',
  SET_CURRENT_INTEGRATION: 'SET_CURRENT_INTEGRATION',
};

// Initial state
export const initialState = {
  integrations: { ...dummyIntegrations },
  currentIntegration: 'e145d368-0eab-4e53-b448-44ada1472182',
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INTEGRATIONS: {
      return {
        ...state,
        integrations: action.payload,
      };
    }
    case actions.SET_CURRENT_INTEGRATION: {
      return {
        ...state,
        currentIntegration: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
/**
 * Set current integration
 * @param {string} integrationId
 */
export const selectIntegration = (integrationId) => async (dispatch, getState) => {
  const state = await getState();
  // Check if selected integration exists
  if (state.integrations && state.integrations[integrationId]) {
    dispatch({
      type: actions.SET_CURRENT_INTEGRATION,
      payload: integrationId,
    });
  }
};

export default reducer;
