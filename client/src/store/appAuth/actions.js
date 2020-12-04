import { action } from 'typesafe-actions';

import {
    // Init
    INIT_ALL,
    INIT_AUTH_DATA,
    INIT_USER_DATA,
    // User
    UPDATE_USER_BASKET,
    UPDATE_USER_DATA,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PHONE,
    // Auth
    UPDATE_AUTH_STATE,
    UPDATE_AUTH_TOKEN,
} from './constants';


export const initAuthState = {
    initAuthData: () => action(
        INIT_AUTH_DATA
    ),

    initUserData: () => action(
        INIT_USER_DATA
    )
};

export const updateUserData = {
    updateUserData: (data) => action(
        UPDATE_USER_DATA,
        data
    ),
    updateUserEmail: (email) => action(
        UPDATE_USER_EMAIL,
        email
    ),
    updateUserPhone: (phone) => action(
        UPDATE_USER_PHONE,
        phone
    ),
    updateUserBasket: (basket) => action(
        UPDATE_USER_BASKET,
        basket
    )
}

export const updateAuthData = {
    updateAuthToken: (token) => action(
        UPDATE_AUTH_TOKEN,
        token
    ),
    updateAuthState: (state) => action(
        UPDATE_AUTH_STATE,
        state
    ),
}
