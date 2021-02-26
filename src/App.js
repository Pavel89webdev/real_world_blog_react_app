import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import ArticleItemWithService from './components/ArticleItemWithService';
import ErrorMessage from './components/ErrorMessage';
import RegistrationForm from './components/RegistrationForm';
import SingIn from './components/SingInForm';
import Profile from './components/Profile';
import NewArticle from './components/NewArticle';
import EditArticle from './components/EditArticle';

import reduceArticles from './services/reduceArticles';
import reduceFetching from './services/reduceFetching';
import reducePagination from './services/reducePagination';
import reduceErrors from './services/reduceErrors';
import reduceLogging from './services/reduceLogging';
import actionsCreators from './services/actionsCreators';
import getUserFromLocalStorage from './services/getUserFromLocalStorage';
import PrivateRoute from './components/PrivateRoute';

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

const singInUser = getUserFromLocalStorage();

if (singInUser !== false) {
  store.dispatch(() => actionsCreators.singIn(store.dispatch, singInUser));
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Main>
          <Switch>
            <Redirect exact from="/" to="/articles/page/1" />
            <Route path="/sing-in" component={SingIn} />
            <Route
              exact
              path="/articles/page/:id"
              render={({ match }) => {
                const page = +match.params.id;
                store.dispatch(actionsCreators.changePage(page));
                return <ArticleList page={page} />;
              }}
            />
            <Route
              path="/article/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <ArticleItemWithService id={id} />;
              }}
            />
            <Route path="/sing-up" component={RegistrationForm} />

            <PrivateRoute path="/new-article" component={NewArticle} />
            <PrivateRoute Component={Profile} path="/profile" />
            <PrivateRoute
              exact
              path="/articles/:id/edit"
              render={({ match }) => {
                const { id } = match.params;
                return <EditArticle id={id} />;
              }}
            />

            <Route render={() => <ErrorMessage description="404: there is no page on this URL :(" />} />
          </Switch>
        </Main>
      </Provider>
    </Router>
  );
}

export default App;
