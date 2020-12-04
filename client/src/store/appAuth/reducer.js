import { combineReducers } from 'redux';

import {
    // Init
    INIT_AUTH_DATA,
    INIT_USER_DATA,
    // User
    UPDATE_USER_BASKET,
    UPDATE_USER_DATA,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PHONE,
    // Auth
    UPDATE_AUTH_TOKEN,
    UPDATE_AUTH_STATE
} from './constants';

import {
    DefaultUserDataState,
    DefaultAuthDataState
} from './defaults';

export default combineReducers({
    userInfo: (state = DefaultUserDataState, action) => {
        switch (action.type) {
            case INIT_USER_DATA:
                return DefaultUserDataState;
            case UPDATE_USER_DATA:
                return {
                    ...state,
                    email: action.payload.email ? action.payload.email : '',
                    phone: action.payload.phone ? action.payload.phone : '',
                    basket: action.payload.basket ? action.payload.basket : ''
                };
            case UPDATE_USER_EMAIL:
                return {
                    ...state,
                    email: action.payload
                };
            case UPDATE_USER_PHONE:
                return {
                    ...state,
                    phone: action.payload
                };
            case UPDATE_USER_BASKET:
                return {
                    ...state,
                    basket: action.payload
                };
            default: return state;
        }
    },

    authInfo: (state = DefaultAuthDataState, action) => {
        switch (action.type) {
            case INIT_AUTH_DATA:
                return DefaultAuthDataState;
            case UPDATE_AUTH_STATE:
                return {
                    ...state,
                    state: action.payload
                };
            case UPDATE_AUTH_TOKEN:
                return {
                    ...state,
                    token: action.payload
                }
            default: return state;
        }
    }
});
