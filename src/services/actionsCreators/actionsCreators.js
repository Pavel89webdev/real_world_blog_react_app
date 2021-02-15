import actions from '../actions';
import realWorldService from '../RealWorldService';

const actionsCreators = {
  isFetchingOn: () => ({ type: actions.isFetchingOn }),
  isFetchingOff: () => ({ type: actions.isFetchingOff }),
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
};

export default actionsCreators;
