import actions from '../actions';

function reduceLogging(state = { user: {}, isLoggin: false }, action) {
  switch (action.type) {
    case actions.signUp:
      return {
        ...action.user,
        isLoggin: true,
      };
    case actions.singIn:
      return {
        ...action.user,
        isLoggin: !action.user.errors,
      };
    default:
      return state;
  }
}

export default reduceLogging;
