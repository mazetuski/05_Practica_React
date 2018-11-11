// Dependencies
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./reducers";
import throttle from 'lodash/throttle';
import {saveState, loadState} from "./localStorage";

const initialState = loadState();

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
);

store.subscribe(throttle(() => {
  saveState({
    article: store.getState().article,
    subscription: store.getState().subscription
  });
}, 1000));

window.store = store;

export default store;