// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {handleActions} from 'redux-actions';
import thunk from 'redux-thunk';
import {urlApi} from "./constants/constants";
import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR} from "./constants/actionTypes";
import {authUser} from "./actions";
import {get} from "./utils/API-Service";

const initialState = {
  count: 0
};

const authReducer = handleActions({
  [authUser]: async (state, action) => {
    const username = action.payload.username;
    const password = action.payload.password;

    const users = await get(urlApi);
    console.log(users);
    const user =users.results.filter(
        user => user.login.username === username && user.login.password === password
    );
    // if not coincidence return not login
    if(!user) return [...state, {isLogin: false}];
    console.log(user);
    return [...state, {isLogin: true, id: user[0].login.uuid}]
  }

}, initialState);
const testReducer2 = (state = initialState) => state;

const rootReducer = combineReducers({
  auth: authReducer,
  test2: testReducer2
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const authByApi = ({username, password}) => async dispatch => {
  dispatch({type: LOGIN_STARTED});
  const users = await get(urlApi);
  console.log(users);
  const user =users.results.filter(
      user => user.login.username === username && user.login.password === password
  );
  // if not coincidence return not login
  if(!user){
    dispatch({type: LOGIN_ERROR});
    return [...state, {isLogin: false}];
  }
  dispatch({type: LOGIN_SUCCESS})
  return [...state, {isLogin: true, id: user[0].login.uuid}]
};

window.store = store;

export default store;