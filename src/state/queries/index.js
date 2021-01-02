import moment from 'moment';
import { v4 as uuid } from 'uuid';

// Dummy data
const dummyQueries = {
  // PG queries
  '0f1690e8-714f-4309-9194-a31d4e100314': {
    id: '0f1690e8-714f-4309-9194-a31d4e100314',
    integrationId: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'Query 1',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }, {
      email: 'aku@example.com',
      permission: 'read',
    }],
    createdAt: moment(),
  },
  '672cea3c-4cb4-47c8-9167-deb4e064fcec': {
    id: '672cea3c-4cb4-47c8-9167-deb4e064fcec',
    integrationId: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'Query 2',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }],
    createdAt: moment(),
  },
  '4fa450dc-790c-4127-854d-38f9f7656394': {
    id: '4fa450dc-790c-4127-854d-38f9f7656394',
    integrationId: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'Query 3',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }],
    createdAt: moment(),
  },
  // MySQL queries
  '7e651ed8-903a-452f-9a37-f15d3c11a078': {
    id: '7e651ed8-903a-452f-9a37-f15d3c11a078',
    integrationId: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'Query 1',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }],
    createdAt: moment(),
  },
  '6c5e6db0-bbff-4dd4-b52f-b05cd5bc3ef5': {
    id: '6c5e6db0-bbff-4dd4-b52f-b05cd5bc3ef5',
    integrationId: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'Query 2',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }],
    createdAt: moment(),
  },
  '8b19901d-efb2-48ef-8dd8-0aca94890b25': {
    id: '8b19901d-efb2-48ef-8dd8-0aca94890b25',
    integrationId: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'Query 3',
    query: `
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'admin',
    }, {
      email: 'jane.doe@example.com',
      permission: 'write',
    }],
    createdAt: moment(),
  },
};

// Action types
const actions = {
  ADD_QUERIES: 'ADD_QUERIES',
  CREATE_QUERY: 'CREATE_QUERY',
  UPDATE_QUERY: 'UPDATE_QUERY',
  DELETE_QUERY: 'DELETE_QUERY',
};

// Initial state
export const initialState = {
  queries: { ...dummyQueries },
};

// Reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_QUERIES: {
      return {
        ...state,
        queries: action.payload,
      };
    }
    case actions.CREATE_QUERY: {
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.payload.id]: action.payload,
        },
      };
    }
    case actions.UPDATE_QUERY: {
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.payload.id]: {
            ...state.queries[action.payload.id],
            ...action.payload,
          },
        },
      };
    }
    case actions.DELETE_QUERY: {
      return {
        ...state,
        queries: Object.entries(state.queries).reduce((acc, [id, query]) => {
          if (id !== action.payload) {
            acc[id] = query;
          }

          return acc;
        }, {}),
      };
    }
    default: {
      return state;
    }
  }
};

// Functions
/**
 * Create new query
 * @param {string} query
 */
export const createQuery = (query = '') => async (dispatch, getState) => {
  const state = await getState();
  if (state.currentIntegration) {
    const newQuery = {
      id: uuid(),
      integrationId: state.currentIntegration,
      name: 'Untitled Query',
      query,
      history: [],
      members: [{
        email: state.user.email,
        permission: 'admin',
      }],
      createdAt: moment(),
    };

    dispatch({
      type: actions.CREATE_QUERY,
      payload: newQuery,
    });
  }
};
/**
 * Update query
 * @param {object} query
 */
export const updateQuery = (query = {}) => async (dispatch, getState) => {
  const state = await getState();
  const savedQuery = state.queries[query.id];
  if (savedQuery) {
    dispatch({
      type: actions.UPDATE_QUERY,
      payload: {
        ...savedQuery,
        ...query,
      },
    });
  }
};
/**
 * Delete query
 * @param {string} queryId
 */
export const deleteQuery = (queryId) => (dispatch) => {
  dispatch({
    type: actions.DELETE_QUERY,
    payload: queryId,
  });
};
/**
 * Save query histor. Only latest 10 are saved
 * @param {object} query
 */
export const saveHistory = (query = {}) => async (dispatch, getState) => {
  const state = await getState();
  if (state.queries[query.id]) {
    dispatch({
      type: actions.UPDATE_QUERY,
      payload: {
        ...state.queries[query.id],
        ...query,
        history: [
          {
            query: query.query,
            createdAt: moment(),
          },
          ...state.queries[query.id].history.map((history, index) => index < 9),
        ],
      },
    });
  }
};
/**
 * Add team member to the query
 * @param {string} email
 * @param {string} permission
 * @param {string} queryId
 */
export const addTeamMember = (email, permission, queryId) => async (dispatch, getState) => {
  const state = await getState();
  const query = Object.values(state.queries).find((item) => item.id === queryId);
  if (query && email.trim() !== state.user.email) {
    const member = query.members.find((item) => item.email === email.trim());
    if (!member) {
      query.members = [
        ...query.members,
        {
          email: email.trim(),
          permission,
        },
      ];
    } else if (member.permission !== permission) {
      query.members = query.members.map((item) => {
        if (item.email === email.trim()) {
          return {
            ...item,
            permission,
          };
        }

        return item;
      });
    }

    dispatch({
      type: actions.UPDATE_QUERY,
      payload: query,
    });
  }
};
/**
 * Update team member's permission
 * @param {string} email
 * @param {string} permission
 * @param {string} queryId
 */
export const updateMemberPermission = (email, permission, queryId) => async (dispatch, getState) => {
  const state = await getState();
  const query = Object.values(state.queries).find((item) => item.id === queryId);
  if (query && email.trim() !== state.user.email) {
    const member = query.members.find((item) => item.email === email.trim());
    if (member && member.permission !== permission) {
      query.members = query.members.map((item) => {
        if (item.email === email.trim()) {
          return {
            ...item,
            permission,
          };
        }

        return item;
      });

      dispatch({
        type: actions.UPDATE_QUERY,
        payload: query,
      });
    }
  }
};
/**
 * Remove team member from query
 * @param {string} email
 * @param {string} queryId
 */
export const removeTeamMember = (email, queryId) => async (dispatch, getState) => {
  const state = await getState();
  const query = Object.values(state.queries).find((item) => item.id === queryId);
  if (query && email.trim() !== state.user.email) {
    const find = query.members.indexOf((member) => member.email === email.trim);
    if (find > -1) {
      query.members = query.members.filter((member) => member.email !== email.trim());
      dispatch({
        type: actions.UPDATE_QUERY,
        payload: query,
      });
    }
  }
};

export default Reducer;
