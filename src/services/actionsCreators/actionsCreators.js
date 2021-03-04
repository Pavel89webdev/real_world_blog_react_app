import actions from '../actions';
import realWorldService from '../RealWorldService';

const actionsCreators = {
  isFetchingOn: () => ({ type: actions.isFetchingOn }),
  isFetchingOff: () => ({ type: actions.isFetchingOff }),
  isLogginFetchingOn: () => ({ type: actions.logginIsFetchingOn }),
  isLogginFetchingOff: () => ({ type: actions.logginIsFetchingOff }),
  setLogginError: (message) => ({ type: actions.error, message }),
  async getArticles(dispatch, offset) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.getArticles(offset);
      const action = {
        type: actions.getArticles,
        articles: result.articles,
        totalCount: result.articlesCount,
      };

      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return actionsCreators.setLogginError(e.message);
    }
  },
  async getMyArticles(dispatch, offset) {
    dispatch(actionsCreators.isFetchingOn());

    const result = await realWorldService.getMyArticles(offset);
    const action = {
      type: actions.getArticles,
      articles: [...result.articles],
      totalCount: result.articlesCount,
    };

    dispatch(action);

    return dispatch(actionsCreators.isFetchingOff());
  },
  async getOneArticle(dispatch, id) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.getOneArticle(id);

      const action = {
        type: actions.getMyArticles,
        articles: [result.article],
        totalCount: 1,
      };

      dispatch(action);

      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      const action = {
        type: actions.error,
        message: e.message,
      };
      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    }
  },
  async singUp(dispatch, userObj) {
    dispatch(actionsCreators.isLogginFetchingOn());

    try {
      const result = await realWorldService.registerNewUser(userObj);
      const action = {
        type: actions.signUp,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      dispatch(actionsCreators.isLogginFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async singIn(dispatch, userObj) {
    dispatch(actionsCreators.isLogginFetchingOn());

    try {
      const result = await realWorldService.singIn(userObj);
      const action = {
        type: actions.singIn,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      dispatch(actionsCreators.isLogginFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async singInWithToken(dispatch) {
    dispatch(actionsCreators.isLogginFetchingOn());

    try {
      const result = await realWorldService.singIn();
      const action = {
        type: actions.singInWithToken,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      dispatch(actionsCreators.isLogginFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async updateUser(dispatch, userObj) {
    dispatch(actionsCreators.isLogginFetchingOn());

    try {
      const result = await realWorldService.updateUser(userObj);
      const action = {
        type: actions.updateUser,
        errors: '',
      };

      if (result.errors) action.errors = result.errors;
      if (!result.errors) action.user = { ...result };

      return dispatch(action);
    } catch (e) {
      dispatch(actionsCreators.isLogginFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  logOut: () => ({ type: actions.logOut }),

  async createArticle(dispatch, article) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.createArticle(article);
      const action = {
        type: actions.createNewArticle,
        article: result.article,
        newArticle: result.article.slug,
      };
      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async updateArticle(dispatch, article, id) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.updateArticle(article, id);
      const action = {
        type: actions.updateArticle,
        article: result.article,
        newArticle: result.article.slug,
      };
      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  clearJustCreateArticle: () => ({ type: actions.clearJustCreateArticle }),

  async deleteArticle(dispatch, id) {
    try {
      await realWorldService.deleteArticle(id);
      const action = {
        type: actions.deleteArticle,
        articleId: id,
      };

      return dispatch(action);
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },
};

export default actionsCreators;
