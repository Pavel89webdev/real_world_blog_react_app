import realWorldService from '../../services/RealWorldService';

const GET_ARTICLES = 'GET_ARTICLES';
const GET_MY_ARTICLES = 'GET_MY_ARTICLES';
const GET_ONE_ARTICLE = 'GET_ONE_ARTICLE';
const CREATE_NEW_ARTICLE = 'CREATE_NEW_ARTICLE';
const CLEAR_JUST_NEW_ARTICLE = 'CLEAR_JUST_NEW_ARTICLE'; // это вообще нужно?
const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';

const ARTICLES_IS_FETCHING_ON = 'ARTICLES_IS_FETCHING_ON';
const ARTICLES_IS_FETCHING_OFF = 'ARTICLES_IS_FETCHING_OFF';
const SET_ERROR_ARTICLES = 'SET_ERROR_ARTICLES';

const initialState = {
  articles: [],
  totalCount: null,
  newArticle: null,
  isFetching: false,
  error: '',
};

const actionsCreatorsArticle = {
  isFetchingOn: () => ({ type: ARTICLES_IS_FETCHING_ON }),
  isFetchingOff: () => ({ type: ARTICLES_IS_FETCHING_OFF }),
  setError: (error) => ({
    type: SET_ERROR_ARTICLES,
    error,
  }),
  clearJustCreateArticle: () => ({ type: CLEAR_JUST_NEW_ARTICLE }),

  async getArticles(dispatch, offset) {
    dispatch(actionsCreatorsArticle.isFetchingOn());

    try {
      const result = await realWorldService.getArticles(offset);
      const action = {
        type: GET_ARTICLES,
        articles: result.articles,
        totalCount: result.articlesCount,
        isFetching: false,
      };

      return dispatch(action);
    } catch (e) {
      return actionsCreatorsArticle.setError(e.message);
    }
  },

  async getMyArticles(dispatch, offset) {
    dispatch(actionsCreatorsArticle.isFetchingOn());

    try {
      const result = await realWorldService.getMyArticles(offset);
      const action = {
        type: GET_ARTICLES,
        articles: [...result.articles],
        totalCount: result.articlesCount,
      };
      return dispatch(action);
    } catch (e) {
      return actionsCreatorsArticle.setError(e.message);
    }
  },

  async getOneArticle(dispatch, id) {
    dispatch(actionsCreatorsArticle.isFetchingOn());

    try {
      const result = await realWorldService.getOneArticle(id);
      const action = {
        type: GET_ONE_ARTICLE,
        articles: [result.article],
        totalCount: 1,
      };
      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsArticle.setError(e.message));
    }
  },

  async createArticle(dispatch, article) {
    dispatch(actionsCreatorsArticle.isFetchingOn());

    try {
      const result = await realWorldService.createArticle(article);
      const action = {
        type: CREATE_NEW_ARTICLE,
        article: result.article,
        newArticle: result.article.slug,
      };
      return dispatch(action);
    } catch (e) {
      return actionsCreatorsArticle.setError(e.message);
    }
  },

  async updateArticle(dispatch, article, id) {
    dispatch(actionsCreatorsArticle.isFetchingOn());

    try {
      const result = await realWorldService.updateArticle(article, id);
      const action = {
        type: UPDATE_ARTICLE,
        article: result.article,
        newArticle: result.article.slug,
      };
      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsArticle.setError(e.message));
    }
  },

  async deleteArticle(dispatch, id) {
    try {
      await realWorldService.deleteArticle(id);
      const action = {
        type: DELETE_ARTICLE,
        articleId: id,
      };

      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsArticle.setError(e.message));
    }
  },
};

function articles(state = initialState, action) {
  switch (action.type) {
    case ARTICLES_IS_FETCHING_ON:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
        totalCount: action.totalCount,
        isFetching: false,
      };
    case GET_MY_ARTICLES:
      return {
        ...state,
        articles: [...action.articles],
        totalCount: action.totalCount,
        isFetching: false,
      };
    case GET_ONE_ARTICLE:
      return {
        ...state,
        articles: [...action.articles],
        totalCount: action.totalCount,
        isFetching: false,
      };
    case CREATE_NEW_ARTICLE:
      return {
        ...state,
        articles: [action.article],
        newArticle: action.newArticle,
        isFetching: false,
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: [action.article],
        newArticle: action.newArticle,
        isFetching: false,
      };
    case CLEAR_JUST_NEW_ARTICLE:
      return {
        ...state,
        newArticle: null,
      };
    case DELETE_ARTICLE: {
      const newArticles = state.articles.filter(
        (item) => item.slug !== action.articleId
      );
      return {
        ...state,
        articles: newArticles,
        totalCount: --state.totalCount,
        newArticle: null,
      };
    }
    case SET_ERROR_ARTICLES: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }

    default:
      return state;
  }
}

export { articles, actionsCreatorsArticle };
