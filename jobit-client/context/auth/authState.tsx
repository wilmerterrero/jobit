import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';

import { 
    REGISTER_SUCCCES, 
    REGISTER_ERROR,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    USER_AUTH,
    LOG_OUT, 
    CHANGE_USER_ROLE_SUCCESS,
    CHANGE_USER_ROLE_ERROR,
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

        registerUser: (user: IUser) => {},

        loginUser: (user: IUser) => {},

        authUser: () => {},
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
    const registerUser = async (user: IUser) => {

        try {
            const response = await axiosClient.post('/auth/register', user);
            dispatch({
                type: REGISTER_SUCCCES,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
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
    const logInUser = async (user: IUser) => {

        try {
            const response = await axiosClient.post('/auth/login', user);
            
            //passing the token to the state
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);

    }

     /**
     * Auth action for check if the user is authenticated through the token
     */
    const authUser = async () => {

        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/auth/');
            dispatch({
                type: USER_AUTH,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const logOutUser = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    const getAllUsers = async () => {
        try {
            const response = await axiosClient.get('/auth/users');
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: GET_USERS_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const changeRole = async (user: IUserRole) => {

        try {
            const response = await axiosClient.post('/auth/login/admin/change', user);
            
            dispatch({
                type: CHANGE_USER_ROLE_SUCCESS,
                payload: response.data.msg
            })

        } catch (error) {
            dispatch({
                type: CHANGE_USER_ROLE_ERROR,
                payload: error.response.data.msg
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
                logInUser: logInUser,
                logOutUser: logOutUser,
                getAllUsers: getAllUsers,
                authUser: authUser,
                changeRole: changeRole
             }}
        >
            {children}
        </authContext.Provider>
    );

}

export default AuthState;
