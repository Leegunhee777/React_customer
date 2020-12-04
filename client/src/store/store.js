import { createStore } from 'redux';
import { createHashHistory } from 'history';

import rootReducer from './root-reducer';

export const history = createHashHistory();

const store = createStore(
    rootReducer(history)
);

export default store;
