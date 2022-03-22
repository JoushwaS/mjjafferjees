import { combineReducers } from 'redux';
import auth from './auth';

// combine all reducers
const rootReducer = combineReducers({
	auth,
});

export default rootReducer;
