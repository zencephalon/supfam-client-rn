import { combineReducers } from 'redux';
import auth from '~/apis/auth/reducers';

const rootReducer = combineReducers({ auth });

export default rootReducer;
