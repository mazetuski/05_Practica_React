// Dependencies
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {handleActions} from 'redux-actions';
import thunk from 'redux-thunk';
import {urlApi} from "./constants/constants";
import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from "./constants/actionTypes";
import {get} from "./utils/API-Service";

const initialState = {
  count: 0
};

const authReducer = (state = {isLogin: false, isAuthenticating: false}, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {...state, isLogin: false, isAuthenticating: true};
    case LOGIN_SUCCESS:
      return {...state, isLogin: true, isAuthenticating: false, id: action.payload};
    case LOGOUT:
      return {...state, isLogin: false, isAuthenticating: false, id: null};
    default:
      return state
  }
};

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export const authByApi = (username, password) => async dispatch => {
  dispatch({type: LOGIN_STARTED});
  const users = await get(urlApi);
  const user = users.results.filter(
      user => user.login.username === username && user.login.password === password
  );
  // if not coincidence return not login
  if(!user){
    dispatch({type: LOGIN_ERROR});
  }
  dispatch({type: LOGIN_SUCCESS, payload: user[0].login.uuid});
};

window.store = store;

export default store;