import actions from '../actions';

function reduceLogging(state = { user: {}, isLoggin: false }, action) {
  switch (action.type) {
    case actions.signUp:
      return {
        ...action.user,
        isLoggin: !action.user.errors,
      };
    case actions.singIn:
      return {
        ...action.user,
        isLoggin: !action.user.errors,
      };
    case actions.updateUser:
      return {
        ...state,
        ...action.user,
        errors: action.errors,
      };
    case actions.logOut:
      return {
        user: {},
        isLoggin: false,
      };
    default:
      return state;
  }
}

export default reduceLogging;
