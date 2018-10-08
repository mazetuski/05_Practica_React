import {createAction} from "redux-actions";
import {AUTH_USER, LOGOUT} from "../constants/actionTypes";

export const logoutUser = createAction(LOGOUT);