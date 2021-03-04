import actions from '../actions';

import setTokenToLocaleStorage from '../setTokenToLocaleStorage';
import setUsernameToLocaleStorage from '../setUsernameToLocaleStorage';

function reduceLogging(state = { user: {}, isLoggin: false, isLogginFetching: false }, action) {
  switch (action.type) {
    case actions.logginIsFetchingOn:
      return {
        ...state,
        isLogginFetching: true,
      };
    case actions.logginIsFetchingOff:
      return {
        ...state,
        isLogginFetching: false,
      };
    case actions.signUp:
      return {
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case actions.singIn:
      return {
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case actions.singInWithToken:
      return {
        ...action.user,
        isLoggin: action.user.errors === undefined,
        isLogginFetching: false,
      };
    case actions.updateUser:
      return {
        ...state,
        ...action.user,
        errors: action.errors,
        isLogginFetching: false,
      };
    case actions.logOut:
      setUsernameToLocaleStorage('');
      setTokenToLocaleStorage('');
      return {
        user: {},
        isLoggin: false,
        isLogginFetching: false,
      };
    default:
      return state;
  }
}

export default reduceLogging;
