import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'


import { boardReducer } from './reducers/boardReducer.js';
import { cardReducer } from './reducers/cardReducer.js';
// import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    boardModule: boardReducer,
    cardModule: cardReducer
    // userModule: userReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
