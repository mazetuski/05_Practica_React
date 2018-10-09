import {
  LOGIN_ERROR,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING_STARTED,
  UPDATE_AUTHORS,
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
  if (!user) {
    dispatch({type: LOGIN_ERROR});
  }
  dispatch({type: LOGIN_SUCCESS, payload: user[0]});
};
// get all authors from api
export const getAuthors = () => async dispatch => {
  dispatch({type: LOADING_STARTED});
  const users = await get(urlApi);
  dispatch({type: UPDATE_AUTHORS, payload: users.results});
};