import realWorldService from '../../services/RealWorldService';
import {
  setUsernameToLocaleStorage,
  setTokenToLocaleStorage,
} from '../../helpers/localStorageForUser/localStorageForUser';

const SING_UP = 'SING_UP';
const SING_IN = 'SING_IN';
const SING_IN_WITH_TOKEN = 'SING_IN_WITH_TOKEN';
const UPDATE_USER = 'UPDATE_USER';
const LOG_OUT = 'LOG_OUT';
const LOGGIN_IS_FETCHING_ON = 'LOGGIN_IS_FETCHING_ON';
const LOGGIN_IS_FETCHING_OFF = 'LOGGIN_IS_FETCHING_OFF';
const LOGGIN_ERROR = 'LOGGIN_ERROR';
const CLEAR_SINGUP_ERRORS = 'CLEAR_SINGUP_ERRORS';

const initialState = {
  user: {},
  isLoggin: false,
  isLogginFetching: false,
  errors: '',
};

const actionsCreatorsUser = {
  isLogginFetchingOn: () => ({ type: LOGGIN_IS_FETCHING_ON }),
  isLogginFetchingOFF: () => ({ type: LOGGIN_IS_FETCHING_OFF }),
  clearSingUpErrors: () => ({ type: CLEAR_SINGUP_ERRORS }),
  setLogginError: (message) => ({
    type: LOGGIN_ERROR,
    message,
  }),

  async singUp(dispatch, userObj) {
    dispatch(actionsCreatorsUser.isLogginFetchingOn());

    try {
      const result = await realWorldService.registerNewUser(userObj);
      const action = {
        type: SING_UP,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsUser.setLogginError(e.message));
    }
  },

  async singIn(dispatch, userObj) {
    dispatch(actionsCreatorsUser.isLogginFetchingOn());

    try {
      const result = await realWorldService.singIn(userObj);
      const action = {
        type: SING_IN,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsUser.setLogginError(e.message));
    }
  },

  async singInWithToken(dispatch) {
    dispatch(actionsCreatorsUser.isLogginFetchingOn());

    try {
      const result = await realWorldService.singIn();
      const action = {
        type: SING_IN_WITH_TOKEN,
        user: { ...result },
      };
      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsUser.setLogginError(e.message));
    }
  },

  async updateUser(dispatch, userObj) {
    dispatch(actionsCreatorsUser.isLogginFetchingOn());

    try {
      const result = await realWorldService.updateUser(userObj);
      const action = {
        type: UPDATE_USER,
      };

      if (result.errors) action.errors = result.errors;
      if (!result.error) action.user = { ...result };

      return dispatch(action);
    } catch (e) {
      return dispatch(actionsCreatorsUser.setLogginError(e.message));
    }
  },

  logOut: () => ({ type: LOG_OUT }),
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOGGIN_IS_FETCHING_ON:
      return {
        ...state,
        isLogginFetching: true,
      };
    case LOGGIN_IS_FETCHING_OFF:
      return {
        ...state,
        isLogginFetching: false,
      };
    case SING_UP:
      return {
        ...state,
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case SING_IN:
      return {
        ...state,
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case SING_IN_WITH_TOKEN:
      return {
        ...state,
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...action.user,
        errors: action.errors || '',
        isLogginFetching: false,
      };
    case CLEAR_SINGUP_ERRORS:
      return {
        ...state,
        errors: '',
      };
    case LOG_OUT:
      setUsernameToLocaleStorage('');
      setTokenToLocaleStorage('');
      return {
        ...state,
        user: {},
        isLoggin: false,
        isLogginFetching: false,
      };
    default:
      return state;
  }
}

export { user, actionsCreatorsUser };
