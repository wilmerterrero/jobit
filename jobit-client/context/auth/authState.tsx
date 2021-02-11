import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
    REGISTER_SUCCCES, 
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    USER_AUTH,
    LOG_OUT, 
    CLEAN_ALERT } from '../../types';

const AuthState: React.FC = ({ children }) => {
    
    const initialState = {
        /**
         * Have the user information
         */
        user: null,
        /**
         * Have the users information
         */
        users: null,
        /**
         * 1. Check if Next is running in client, because Next run in both sides: client and server
         * 2. Get the token from localStorage
         */
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        /**
         * 1. Start null 
         * 2. When the user is authenticated pass to true
         */
        authorized: null,
        /**
         * Used to show all the messages from our backend
         */
        message: null,

        registerUser: (user: IUser) => {}
    }

    //reducer for this state
    const [state, dispatch] = useReducer(authReducer, initialState);

    /**
     * Auth action for register the user
     * 
     * METHOD: POST
     * 
     * @param {IUser} user 
     */
    const registerUser = (user: IUser) => {

        try {
            const response = 'HELLO WORLD'
            dispatch({
                type: REGISTER_SUCCCES,
                payload: user
            })
            console.log(user);
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.user
            })
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);

    }

        /**
     * Auth action for log in the user and get the auth token
     * 
     * METHOD: POST
     * 
     * @param {IUser} user 
     */
    const logInUser = (user: IUser) => {

        try {
            const response = 'HELLO WORLD';
            
            //passing the token to the state
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user
            })

            console.log(user);

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: user
            })
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);

    }

    return (
        <authContext.Provider
            value={{ 
                users: state.users,
                user: state.user,
                token: state.token,
                authorized: state.authorized,
                message: state.message,
                registerUser: registerUser,
                logInUser: logInUser
             }}
        >
            {children}
        </authContext.Provider>
    );

}

export default AuthState;
