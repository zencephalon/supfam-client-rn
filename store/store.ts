import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState);
}

const store = configureStore({});

export default store;
