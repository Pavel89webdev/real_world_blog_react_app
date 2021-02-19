import actions from '../actions';
import realWorldService from '../RealWorldService';

const actionsCreators = {
  isFetchingOn: () => ({ type: actions.isFetchingOn }),
  isFetchingOff: () => ({ type: actions.isFetchingOff }),
  setLogginError: (message) => ({ type: actions.error, message }),
  async getArticles(dispatch, offset) {
    dispatch(actionsCreators.isFetchingOn());

    const result = await realWorldService.getArticles(offset);
    const action = {
      type: actions.getArticles,
      articles: result.articles,
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
        type: actions.getOneArticle,
        articles: result.article,
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
  changePage: (newPage) => ({ type: actions.changePage, newPage }),
  async singUp(dispatch, userObj) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.registerNewUser(userObj);
      const action = {
        type: actions.signUp,
        user: { ...result },
      };
      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async singIn(dispatch, userObj) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.singIn(userObj);
      const action = {
        type: actions.singIn,
        user: { ...result },
      };
      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  async updateUser(dispatch, userObj, token) {
    dispatch(actionsCreators.isFetchingOn());

    try {
      const result = await realWorldService.updateUser(userObj, token);
      const action = {
        type: actions.updateUser,
        errors: '',
      };

      if (result.errors) action.errors = result.errors;
      if (!result.errors) action.user = { ...result };

      dispatch(action);
      return dispatch(actionsCreators.isFetchingOff());
    } catch (e) {
      dispatch(actionsCreators.isFetchingOff());
      return dispatch(actionsCreators.setLogginError(e.message));
    }
  },

  logOut: () => ({ type: actions.logOut }),
};

export default actionsCreators;
