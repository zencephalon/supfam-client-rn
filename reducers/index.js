import { combineReducers } from 'redux';
import auth from '~/apis/auth/reducers';
import profile from '~/apis/profile/reducers';
import conversation from '~/apis/conversation/reducers';
import messageCache from '~/apis/messageCache/reducers';

const rootReducer = combineReducers({
	auth,
	profile,
	conversation,
	messageCache,
});

export default rootReducer;
