import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import store from './redux/store';

import Main from './components/Main';
import Header from './containers/Header';
import ArticleList from './containers/ArticleList';
import ArticleItemWithService from './containers/ArticleWithService';
import ErrorMessage from './components/ErrorMessage';
import SingUpFormContainer from './containers/SingUpFormContainer';
import SingInFormContainer from './containers/SingInFormContainer';
import ProfileContainerWithLoader from './containers/ProfileContainerWithLoader';
import NewArticleContainer from './containers/NewArticleContainer';
import EditArticle from './containers/EditArticle';

import { actionsCreatorsUser } from './redux/redusers/user';
import { getTokenFromLocaleStorage } from './helpers/localStorageForUser/localStorageForUser';
import PrivateRoute from './containers/PrivateRoute';

const token = getTokenFromLocaleStorage();
if (token) {
  store.dispatch(() => actionsCreatorsUser.singInWithToken(store.dispatch));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Main>
          <Switch>
            <Redirect exact from="/" to="/articles/page/1" />
            <Route exact path="/sing-up" component={SingUpFormContainer} />
            <Route exact path="/sing-in" component={SingInFormContainer} />
            <Route
              exact
              path="/articles/page/:id"
              render={({ match }) => {
                const page = +match.params.id;
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

            <PrivateRoute path="/new-article" component={NewArticleContainer} />
            <PrivateRoute
              component={ProfileContainerWithLoader}
              path="/profile"
            />
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
              render={() => <ArticleList page={1} myArticles />}
            />

            <Route
              render={() => (
                <ErrorMessage description="404: there is no page on this URL :(" />
              )}
            />
          </Switch>
        </Main>
      </Router>
    </Provider>
  );
}

export default App;
