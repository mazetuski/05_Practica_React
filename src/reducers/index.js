import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_STARTED,
  UPDATE_AUTHORS,
  ADD_ARTICLE, ADD_SUBSCRIPTION, ACCEPT_SUBSCRIPTION, DECLINE_SUBSCRIPTION, LOGIN_ERROR
} from "../constants/actionTypes";
import {combineReducers} from "redux";
import {STATUS_ACCEPTED} from "../constants/constants";

// Reducer for authentication and logout
const authReducer = (state = {isLogin: false, isAuthenticating: false}, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {...state, isLogin: false, isAuthenticating: true};
    case LOGIN_SUCCESS:
      return {...state, isLogin: true, isAuthenticating: false, user: action.payload};
    case LOGOUT:
    case LOGIN_ERROR:
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
      localStorage.setItem('subscriptors', JSON.stringify(subscriptions));
      return {...state, subscriptions: subscriptions};
    case ACCEPT_SUBSCRIPTION:
      const subscriptionModified = action.payload;
      // get subscriptions with new subscription modified
      const subscriptionsModified = state.subscriptions.map(subscriptionLoop => {
        if(subscriptionLoop.userCreator === subscriptionModified.userCreator
        && subscriptionLoop.userReceiver === subscriptionModified.userReceiver){
          subscriptionLoop.status = STATUS_ACCEPTED;
        }
        return subscriptionLoop;
      });
      localStorage.setItem('subscriptors', JSON.stringify(subscriptionsModified));
      return {...state, subscriptions: subscriptionsModified};
    case DECLINE_SUBSCRIPTION:
      const subscriptionDeclined = action.payload;
      const subscriptionsWithoutDeclined = state.subscriptions.filter(subscription =>
          subscription.userCreator !== subscriptionDeclined.userCreator
          && subscription.userReceiver === subscriptionDeclined.userReceiver);
      localStorage.setItem('subscriptors', JSON.stringify(subscriptionsWithoutDeclined));
      return {...state, subscriptions: subscriptionsWithoutDeclined};
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