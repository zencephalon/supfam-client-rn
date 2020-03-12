import { combineReducers } from 'redux';
import users from '~/apis/user/reducers';
import friends from '~/apis/friend/reducers';
import statuses from '~/apis/status/reducers';

const rootReducer = combineReducers({ users, friends, statuses });

export default rootReducer;
