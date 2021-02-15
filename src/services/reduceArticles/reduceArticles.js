import actions from '../actions';

const initialState = {
  articles: [],
  totalCount: null,
};

function reduceArticles(state = initialState, action) {
  switch (action.type) {
    case actions.getArticles:
      return {
        articles: action.articles,
        totalCount: action.totalCount,
      };
    case actions.getOneArticle:
      return {
        articles: [...state.articles, { ...action.articles }],
        totalCount: action.totalCount,
      };
    default:
      return state;
  }
}

export default reduceArticles;
