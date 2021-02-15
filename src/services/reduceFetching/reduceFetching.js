import actions from '../actions';

function reduceFetching(state = false, action) {
  switch (action.type) {
    case actions.isFetchingOn:
      return true;
    case actions.isFetchingOff:
      return false;
    default:
      return state;
  }
}

export default reduceFetching;
