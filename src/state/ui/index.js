// Action types
const actions = {
  SET_LEFT_DRAWER_WIDTH: 'SET_LEFT_DRAWER_WIDTH',
};

// Initial state
export const initialState = {
  leftDrawerWidth: 250,
};

// Reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LEFT_DRAWER_WIDTH: {
      return {
        ...state,
        leftDrawerWidth: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

// Functions
/**
 * Set left drawet width
 * @param {number} width
 */
export const setLeftDrawerWidth = (width) => (dispatch) => {
  if (width) {
    dispatch({
      type: actions.SET_LEFT_DRAWER_WIDTH,
      payload: width,
    });
  }
};

export default Reducer;
