import {createStore} from 'redux';
import reduceReducers from 'reduce-reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

import integrations, {initialState as integrationsState} from './integrations';
import queries, {initialState as queriesState} from './queries';
import tabs, {initialState as tabsState} from './tabs';
import user, {initialState as userState} from './user';

const initialState = {
  ...integrationsState,
  ...queriesState,
  ...tabsState,
  ...userState,
};

const rootReducer = reduceReducers(
    initialState,
    integrations,
    queries,
    tabs,
    user,
);

export default createStore(rootReducer, composeWithDevTools());
