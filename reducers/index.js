import { combineReducers } from 'redux';
import statuses from '~/apis/status/reducers';
import auth from '~/apis/auth/reducers';

const rootReducer = combineReducers({ statuses, auth });

export default rootReducer;
