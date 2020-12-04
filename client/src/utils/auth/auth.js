import store, { history } from '@app/store';
import { authActions as appAuth } from '@app/store/appAuth';

/**
 * Sign out.
 */
export function signOut() {
    return new Promise((resolve, reject) => {
        try {
            store.dispatch(appAuth.initAuthState.initAuthData());
            store.dispatch(appAuth.initAuthState.initUserData());
            if (history.location.pathname !== '/auth') {
                history.push('/auth');
            }
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}


/**
 * Sign in
 * @param {} id 
 * @param {} password 
 */
export function signIn(id, password) {
    return new Promise((resolve, reject) => {
        try {
            const user = isUserValid(id, password);
            if (user.length <= 0) {
                resolve(false);
            } else {
                store.dispatch(appAuth.updateUserData.updateUserData({
                    email: user.email,
                    phone: user.phone,
                    basket: user.basket
                }));
                store.dispatch(appAuth.updateAuthData.updateAuthToken('testToken'));
                store.dispatch(appAuth.updateAuthData.updateAuthState(true));
                history.push('/');
                resolve(true);
            }
        } catch (err) {
            reject(err);
        }
    });
}

// ====================== for Server ======================
export function isUserValid(id, password) {
    return userDataArray.filter((userData) => 
        userData.id === id && userData.password === password
    );
}

/**
 * Register user data
 * @param {*} data {id, password, email, password, basket}
 */
export function registerUser(data) {
    return new Promise((resolve, reject) => {
        try {
            const result = userDataArray.filter((userData) => {
                return userData.id === data.id
            });

            if (result.length <= 0) {
                userDataArray = userDataArray.concat(data);
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (err) {
            console.error(err);
            reject(err);
        }
    })
}

let userDataArray = [
    {
        id: 'demo',
        password: 'demo',
        email: 'demo@demo.com',
        phone: '010-5555-5555',
        basket: ''
    }
]
