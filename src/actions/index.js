import {
  LOGIN_ERROR,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_STARTED,
  UPDATE_AUTHORS,
  ADD_ARTICLE, ADD_SUBSCRIPTION, ACCEPT_SUBSCRIPTION, DECLINE_SUBSCRIPTION,
} from "../constants/actionTypes";
import {urlApi} from "../constants/constants";
import {get} from "../utils/API-Service";

export const logoutUser = ({type: LOGOUT});

// auth user from api
export const authByApi = (username, password) => async dispatch => {
  dispatch({type: LOGIN_STARTED});
  const users = await get(urlApi);
  const user = users.results.filter(
      user => user.login.username === username && user.login.password === password
  );
  // if not coincidence return not login
  if (!user || user.length === 0) {
    return dispatch({type: LOGIN_ERROR});
  }
  dispatch({type: LOGIN_SUCCESS, payload: user[0]});
};
// get all authors from api
export const getAuthors = () => async dispatch => {
  dispatch({type: LOADING_STARTED});
  const users = await get(urlApi);
  dispatch({type: UPDATE_AUTHORS, payload: users.results});
};

// Articles
export const addArticles = article => ({type: ADD_ARTICLE, payload: article});

//Subscriptions
export const addSubscriptions = subscription => ({type: ADD_SUBSCRIPTION, payload: subscription});
export const acceptSubscription = subscription => ({type: ACCEPT_SUBSCRIPTION, payload: subscription});
export const declineSubscription = subscription => ({type: DECLINE_SUBSCRIPTION, payload: subscription});