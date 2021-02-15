import actions from '../actions';

const initialState = {
  error: false,
  message: '',
};

function reduceErrors(state = initialState, action) {
  switch (action.type) {
    case actions.error:
      return {
        error: true,
        message: action.message,
      };
    default:
      return state;
  }
}

export default reduceErrors;
