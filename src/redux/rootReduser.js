import { combineReducers } from 'redux';

import { articles } from './redusers/articles';
import { pagination } from './redusers/pagination';
import { user } from './redusers/user';

const rootReduser = combineReducers({
  articles,
  pagination,
  user,
});

export default rootReduser;
