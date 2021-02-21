import axiosClient from './axios';

/**
 * Purpose: Send all the requests with the Authorization Header and the Bearer token
 * 
 * Add the header if the token is provided
 * @param {string} token 
 */
const tokenAuth  = (token: string) => {
    if(token) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosClient.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;