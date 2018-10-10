import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_STARTED,
  UPDATE_AUTHORS,
  ADD_ARTICLE, ADD_SUBSCRIPTION
} from "../constants/actionTypes";
import {combineReducers} from "redux";

// Reducer for authentication and logout
const authReducer = (state = {isLogin: false, isAuthenticating: false}, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {...state, isLogin: false, isAuthenticating: true};
    case LOGIN_SUCCESS:
      return {...state, isLogin: true, isAuthenticating: false, user: action.payload};
    case LOGOUT:
      return {...state, isLogin: false, isAuthenticating: false, user: null};
    default:
      return state
  }
};

// Reducer for update author lists
const authorReducer = (state = {authors: [], isLoading: false, profile: null}, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {...state, isLoading: true};
    case UPDATE_AUTHORS:
      return {...state, authors: action.payload, isLoading: false};
    default :
      return state;
  }
};

// Reducer for articles
const initialArticleState = {
  articles: JSON.parse(localStorage.getItem('articles')) || [],
};

const articleReducer = (state = initialArticleState, action) => {
  switch (action.type){
    case ADD_ARTICLE:
      const articles = [...state.articles, action.payload];
      localStorage.setItem('articles', JSON.stringify(articles));
      return {...state, articles: articles};
    default:
      return state;
  }
};

const initialSubscriptionState = {
  subscriptions: JSON.parse(localStorage.getItem('subscriptors')) || []
};

const subscriptionReducer = (state = initialSubscriptionState, action) => {
  switch (action.type){
    case ADD_SUBSCRIPTION:
      const subscriptions = [...state.subscriptions, action.payload];
      return {...state, subscriptions: subscriptions};
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  author: authorReducer,
  article: articleReducer,
  subscription: subscriptionReducer
});