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
export const addTab = (queryId) => (dispatch, getState) => {
  const state = getState();
  const find = state.tabs.findIndex((tab) => tab.queryId === queryId);
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
      payload: state.currentTab !== null ? state.tabs.length : 0,
    });
  }
};
/**
 * Update tab
 * @param {object} tab
 */
export const updateTab = (tab = {}) => (dispatch, getState) => {
  const state = getState();
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
export const deleteTab = (tabId) => (dispatch, getState) => {
  const state = getState();
  const find = state.tabs.findIndex((item) => item.id === tabId);
  if (tabId && find > -1) {
    dispatch({
      type: actions.DELETE_TAB,
      payload: tabId,
    });

    let currentTab = null;

    if (state.tabs.length > 1) {
      if (state.currentTab < find) {
        currentTab = state.currentTab;
      } else if (state.currentTab > find) {
        currentTab = state.currentTab - 1;
      } else {
        if (state.tabs.length - 1 > find) {
          currentTab = state.currentTab;
        } else {
          currentTab = state.currentTab - 1;
        }
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
export const setCurrentTab = (tabId) => (dispatch, getState) => {
  const state = getState();
  const find = state.tabs.findIndex((tab) => tab.id === tabId);
  if (find > -1) {
    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: find,
    });
  } else {
    dispatch({
      type: actions.SET_CURRENT_TAB,
      payload: null,
    });
  }
};

export default Reducer;
