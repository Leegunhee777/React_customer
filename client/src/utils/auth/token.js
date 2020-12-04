const TAG = '[IS_TOKEN_VALID]'

export function isTokenValid(token) {
    try {
        if (token !== 'testToken') {
            return false;
        }
        return true;

    } catch (err) {
        console.error(`${TAG}: `, err);
    }
}