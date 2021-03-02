import {
  REGISTER_SUCCCES,
  REGISTER_ERROR,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_AUTH,
  LOG_OUT,
  CLEAN_ALERT,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_ERROR,
} from "../../types";

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case CHANGE_USER_ROLE_SUCCESS:
    case CHANGE_USER_ROLE_ERROR:
    case GET_USERS_ERROR:
    case REGISTER_SUCCCES:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        authorized: true,
      };
    case USER_AUTH:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        authorized: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default authReducer;
