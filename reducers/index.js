import { combineReducers } from 'redux';
import users from '~/apis/user/reducers';

const rootReducer = combineReducers({ users });

export default rootReducer;
