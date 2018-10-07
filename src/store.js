// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {handleActions} from 'redux-actions';
import thunk from 'redux-thunk';

const testReducer = (state) => state;
const testReducer2 = (state) => state;

const rootReducer = combineReducers({
  test: testReducer,
  test2: testReducer2
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;