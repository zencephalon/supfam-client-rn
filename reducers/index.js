import { combineReducers } from 'redux';
import auth from '~/apis/auth/reducers';
import profile from '~/apis/profile/reducers';
import conversation from '~/apis/profile/reducers';

const rootReducer = combineReducers({ auth, profile, conversation });

export default rootReducer;
