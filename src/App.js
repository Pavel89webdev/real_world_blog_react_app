import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import store from './services/store';

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

import actionsCreators from './services/actionsCreators';
import getTokenFromLocaleStorage from './services/getTokenFromLocaleStorage';
import PrivateRoute from './components/PrivateRoute';
import pageSize from './components/Pagination/pageSize';

const token = getTokenFromLocaleStorage();
if (token) {
  store.dispatch(() => actionsCreators.singInWithToken(store.dispatch));
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Main>
          <Switch>
            <Redirect exact from="/" to="/articles/page/1" />
            <Route exact path="/sing-in" component={SingIn} />
            <Route
              exact
              path="/articles/page/:id"
              render={({ match }) => {
                const page = +match.params.id;
                const offset = (page - 1) * pageSize;
                store.dispatch(() => actionsCreators.getArticles(store.dispatch, offset));
                return <ArticleList page={page} />;
              }}
            />
            <Route
              path="/article/:id"
              exact
              render={({ match }) => {
                const { id } = match.params;
                return <ArticleItemWithService id={id} />;
              }}
            />
            <Route exact path="/sing-up" component={RegistrationForm} />

            <PrivateRoute path="/new-article" component={NewArticle} />
            <PrivateRoute Component={Profile} path="/profile" />
            <PrivateRoute
              exact
              path="/article/:id/edit"
              render={({ match }) => {
                const { id } = match.params;
                return <EditArticle id={id} />;
              }}
            />
            <PrivateRoute
              path="/my-articles"
              exact
              render={() => {
                const offset = 0;
                store.dispatch(() => actionsCreators.getMyArticles(store.dispatch, offset));
                return <ArticleList page={1} />;
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
