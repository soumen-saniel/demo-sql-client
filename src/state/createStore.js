import {applyMiddleware, createStore} from 'redux';
import reduceReducers from 'reduce-reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import integrations, {initialState as integrationsState} from './integrations';
import queries, {initialState as queriesState} from './queries';
import tabs, {initialState as tabsState} from './tabs';
import user, {initialState as userState} from './user';
import ui, {initialState as uiState} from './ui';

const initialState = {
  ...integrationsState,
  ...queriesState,
  ...tabsState,
  ...userState,
  ...uiState,
};

const rootReducer = reduceReducers(
    initialState,
    integrations,
    queries,
    tabs,
    user,
    ui,
);

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));
