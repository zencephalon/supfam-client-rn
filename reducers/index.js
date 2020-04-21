import { combineReducers } from 'redux';
import auth from '~/apis/auth/reducers';
import profile from '~/apis/profile/reducers';

const rootReducer = combineReducers({ auth, profile });

export default rootReducer;
