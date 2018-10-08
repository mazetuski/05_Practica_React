import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_STARTED,
  UPDATE_AUTHORS
} from "../constants/actionTypes";
import {combineReducers} from "redux";

// Reducer for authentication and logout
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

// Reducer for update author lists
const authorReducer = (state = {authors: [], isLoading: false}, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {...state, isLoading: true};
    case UPDATE_AUTHORS:
      console.log('holita');
      return {...state, authors: action.payload, isLoading: false};
    default :
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  author: authorReducer
});