const CHAGE_PAGE = 'CHAGE_PAGE';

const initialState = 1;

const actionsCreatorsPagination = {
  changePage: (page) => ({
    type: CHAGE_PAGE,
    page,
  }),
};

function pagination(state = initialState, action) {
  switch (action.type) {
    case CHAGE_PAGE:
      return action.newPage;
    default:
      return state;
  }
}

export { pagination, actionsCreatorsPagination };
