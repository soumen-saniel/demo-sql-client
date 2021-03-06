import moment from 'moment';
import {v4 as uuid} from 'uuid';
import dedent from 'dedent';

import {addTab, deleteTab} from '../tabs';

// Dummy data
const dummyQueries = {
  // PG queries
  '0f1690e8-714f-4309-9194-a31d4e100314': {
    id: '0f1690e8-714f-4309-9194-a31d4e100314',
    integrationId: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'Query 1',
    query: dedent`
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'owner',
    }, {
      email: 'jane.doe@example.com',
      permission: 'editor',
    }, {
      email: 'aku@example.com',
      permission: 'viewer',
    }],
    createdAt: moment(),
  },
  '672cea3c-4cb4-47c8-9167-deb4e064fcec': {
    id: '672cea3c-4cb4-47c8-9167-deb4e064fcec',
    integrationId: 'e145d368-0eab-4e53-b448-44ada1472182',
    name: 'Query 2',
    query: dedent`
      SELECT * FROM branches;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'owner',
    }, {
      email: 'jane.doe@example.com',
      permission: 'editor',
    }],
    createdAt: moment(),
  },
  // MySQL queries
  '7e651ed8-903a-452f-9a37-f15d3c11a078': {
    id: '7e651ed8-903a-452f-9a37-f15d3c11a078',
    integrationId: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'Query 1',
    query: dedent`
      SELECT * FROM employees;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'owner',
    }, {
      email: 'jane.doe@example.com',
      permission: 'editor',
    }],
    createdAt: moment(),
  },
  '6c5e6db0-bbff-4dd4-b52f-b05cd5bc3ef5': {
    id: '6c5e6db0-bbff-4dd4-b52f-b05cd5bc3ef5',
    integrationId: 'd1dc5505-555c-4ae5-a0b3-5ed8a5119fd1',
    name: 'Query 2',
    query: dedent`
      SELECT * FROM branches;
    `,
    history: [],
    members: [{
      email: 'samurai.jack@example.com',
      permission: 'owner',
    }, {
      email: 'jane.doe@example.com',
      permission: 'editor',
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
  queries: {...dummyQueries},
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
 * @param {string} name
 */
export const createQuery = (query = '', name) => (dispatch, getState) => {
  const state = getState();
  if (state.currentIntegration) {
    const newQuery = {
      id: uuid(),
      integrationId: state.currentIntegration,
      name: name || 'Untitled Query',
      query,
      history: [],
      members: [{
        email: state.user.email,
        permission: 'owner',
      }],
      createdAt: moment(),
    };

    dispatch({
      type: actions.CREATE_QUERY,
      payload: newQuery,
    });

    dispatch(addTab(newQuery.id));
  }
};
/**
 * Update query
 * @param {object} query
 */
export const updateQuery = (query = {}) => (dispatch, getState) => {
  const state = getState();
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
export const deleteQuery = (queryId) => (dispatch, getState) => {
  const state = getState();
  const tab = state.tabs.find((tab) => tab.queryId === queryId);

  if (tab && tab.id) {
    dispatch(deleteTab(tab.id));
  }

  dispatch({
    type: actions.DELETE_QUERY,
    payload: queryId,
  });
};
/**
 * Save query history. Only latest 10 are saved
 * @param {string} queryId
 * @param {string} queryString
 */
export const saveHistory = (queryId, queryString) => (dispatch, getState) => {
  const state = getState();
  const query = state.queries[queryId];
  if (query) {
    dispatch({
      type: actions.UPDATE_QUERY,
      payload: {
        ...state.queries[query.id],
        ...query,
        history: [
          {
            query: queryString,
            createdAt: moment(),
          },
          ...query.history.slice(0, 8),
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
export const addTeamMember = (email, permission, queryId) =>
  (dispatch, getState) => {
    const state = getState();
    const query = Object.values(state.queries)
        .find((item) => item.id === queryId);
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
export const updateMemberPermission = (email, permission, queryId) =>
  (dispatch, getState) => {
    const state = getState();
    const query = Object.values(state.queries)
        .find((item) => item.id === queryId);
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
export const removeTeamMember = (email, queryId) => (dispatch, getState) => {
  const state = getState();
  const query = Object.values(state.queries)
      .find((item) => item.id === queryId);
  if (query && email.trim() !== state.user.email) {
    const find = query.members
        .findIndex((member) => member.email === email.trim());
    if (find > -1) {
      query.members = query.members
          .filter((member) => member.email !== email.trim());
      dispatch({
        type: actions.UPDATE_QUERY,
        payload: query,
      });
    }
  }
};

export default Reducer;
