import actions from '../actions';

const initialState = {
  articles: [],
  totalCount: null,
  newArticle: null,
};

function reduceArticles(state = initialState, action) {
  switch (action.type) {
    case actions.getArticles:
      return {
        articles: action.articles,
        totalCount: action.totalCount,
      };
    case actions.getMyArticles:
      return {
        articles: [...action.articles],
        totalCount: action.totalCount,
      };
    case actions.getOneArticle:
      return {
        articles: [...state.articles, { ...action.articles }],
        totalCount: action.totalCount,
      };
    case actions.createNewArticle:
      return {
        ...state,
        articles: [action.article],
        newArticle: action.newArticle,
      };
    case actions.updateArticle:
      return {
        ...state,
        articles: [action.article],
        newArticle: action.newArticle,
      };
    case actions.clearJustCreateArticle:
      return {
        ...state,
        newArticle: null,
      };
    case actions.deleteArticle: {
      const newArticles = state.articles.filter((item) => item.slug !== action.articleId);
      return {
        articles: newArticles,
        totalCount: --state.totalCount,
        newArticle: null,
      };
    }
    default:
      return state;
  }
}

export default reduceArticles;
