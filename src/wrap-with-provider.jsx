import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

// Store
import createStore from './state/createStore';

// Styles
import 'normalize.css';
import theme from './ui/styles/theme';
import globalStyles from './ui/styles/global';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  const store = createStore();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        {element}
      </ThemeProvider>
    </Provider>
  );
};
