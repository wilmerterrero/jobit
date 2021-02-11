import { 
    REGISTER_SUCCCES, 
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    USER_AUTH,
    LOG_OUT, 
    CLEAN_ALERT } from '../../types';

const authReducer = (state: any, action: any) => {
    switch(action.type) {
        case REGISTER_SUCCCES:
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authorized: true
            }
        case USER_AUTH:
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT: 
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authorized: null
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export default authReducer;