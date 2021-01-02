import React from 'react';
import { Helmet } from 'react-helmet';
import { Global, ThemeProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

// Store
import store from './state/createStore';

// Styles
import theme, { materialTheme } from './ui/styles/theme';
import globalStyles from './ui/styles/global';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <>
    <Helmet>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Helmet>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MaterialThemeProvider theme={materialTheme}>
          <CssBaseline />
          <Global styles={globalStyles} />
          {element}
        </MaterialThemeProvider>
      </ThemeProvider>
    </Provider>
  </>
);
