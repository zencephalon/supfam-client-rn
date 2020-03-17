import { combineReducers } from 'redux';
import users from '~/apis/user/reducers';
import friends from '~/apis/friend/reducers';
import statuses from '~/apis/status/reducers';
import auth from '~/apis/auth/reducers';

const rootReducer = combineReducers({ users, friends, statuses, auth });

export default rootReducer;
