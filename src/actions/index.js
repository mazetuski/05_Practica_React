import {createAction} from "redux-actions";
import {AUTH_USER} from "../constants/actionTypes";


export const authUser = createAction(AUTH_USER, (username, password) =>
    ({
      username: username,
      password: password
    })
);