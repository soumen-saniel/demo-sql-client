// Initial state
export const initialState = {
  user: {
    id: 'ed3dfdad-0294-4247-beab-280ba75c761f',
    firstName: 'Samurai',
    lastName: 'Jack',
    email: 'samurai.jack@example.com',
  },
};

// Reducer
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default Reducer;
