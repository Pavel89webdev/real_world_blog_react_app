import actions from '../actions';

function reducePagination(state = 1, action) {
  switch (action.type) {
    case actions.changePage:
      return action.newPage;
    default:
      return state;
  }
}

export default reducePagination;
