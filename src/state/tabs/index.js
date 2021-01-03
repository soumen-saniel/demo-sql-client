/* eslint-disable valid-jsdoc */
import {v4 as uuid} from 'uuid';

// Action types
const actions = {
  ADD_TAB: 'ADD_TAB',
  UPDATE_TAB: 'UPDATE_TAB',
  DELETE_TAB: 'DELETE_TAB',
  SET_CURRENT_TAB: 'SET_CURRENT_TAB',
};

// Initial state
export const initialState = {
  tabs: [],
  currentTab: null,
};

// Reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TAB: {
      return {
        ...state,
        tabs: [
          ...state.tabs,
          action.payload,
        ],
      };
    }
    case actions.UPDATE_TAB: {
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === action.payload.id) {
            return {
              ...tab,
              ...action.payload,
            };
          }

          return tab;
        }),
      };
    }
    case actions.DELETE_TAB: {
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== action.payload),
      };
    }
    case actions.SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

// Functions
/**
 * Add tab
 * @param {string} queryId
 */
export const addTab = (queryId) => async (dispatch, getState) => {
  const state = await getState();
  const find = state.tabs.indexOf((tab) => tab.queryId === queryId);
  if (find > -1) {
    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: find,
    });
  } else if (state.queries[queryId]) {
    const query = state.queries[queryId];
    const newTab = {
      id: uuid(),
      integrationId: query.integrationId,
      queryId,
      name: query.name,
      saved: true,
    };

    dispatch({
      type: actions.ADD_TAB,
      payload: newTab,
    });

    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: state.currentTab !== null ? state.currentTab + 1 : 0,
    });
  }
};
/**
 * Update tab
 * @param {object} tab
 */
export const updateTab = (tab = {}) => async (dispatch, getState) => {
  const state = await getState();
  const find = state.tabs.find((item) => item.id === tab.id);
  if (tab.id && find.id) {
    dispatch({
      type: actions.UPDATE_TAB,
      payload: tab,
    });
  }
};
/**
 * Delete tab
 * @param {staring} tabId
 */
export const deleteTab = (tabId) => async (dispatch, getState) => {
  const state = await getState();
  const find = state.tabs.indexOf((item) => item.id === tabId);
  if (tabId && find > -1) {
    dispatch({
      type: actions.DELETE_TAB,
      payload: tabId,
    });

    let currentTab = null;

    if (state.tabs.length > 0) {
      if (find > 0) {
        currentTab = find - 1;
      } else {
        currentTab = 0;
      }
    }

    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: currentTab,
    });
  }
};
/**
 * Set current tab
 * @param {string} queryId
 */
export const setCurrentTab = (queryId) => async (dispatch, getState) => {
  const state = await getState();
  const find = state.tabs.indexOf((tab) => tab.queryId === queryId);
  if (find > -1) {
    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: find,
    });
  }
};

export default Reducer;
