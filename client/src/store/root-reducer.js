import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { authReducer } from './appAuth';

export default (history) => combineReducers({
    router: connectRouter(history),
    appAuth: authReducer
});
