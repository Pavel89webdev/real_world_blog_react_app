import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import reduceArticles from '../reduceArticles';
import reduceFetching from '../reduceFetching';
import reducePagination from '../reducePagination';
import reduceErrors from '../reduceErrors';
import reduceLogging from '../reduceLogging';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk)
  // other store enhancers if any
);

const store = createStore(
  combineReducers({
    articles: reduceArticles,
    isFetching: reduceFetching,
    page: reducePagination,
    errors: reduceErrors,
    user: reduceLogging,
  }),
  enhancer
);

export default store;
