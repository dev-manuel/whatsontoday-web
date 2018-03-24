import log from 'loglevel'

import {axios} from '../index'

export const loginBasePath = '/login';

/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} rememberMe
 */
export const signIn = (email, password, rememberMe) => {
    return axios.post(`${loginBasePath}/signIn`, {
        email,
        password,
        rememberMe,
    }).then(response => {
            log.debug('signIn#then', response);
            return response.data;
    })
}

/**
 * 
*/
export const signOut = () => {
    return axios.get(`${loginBasePath}/signOut`)
        .then( response => {
            log.debug('signOut#then', response);
            return response.data;
        })
}

/**
 * 
*/
export const getLoggedInUser = () => {
    return axios.get(`${loginBasePath}`)
        .then( response => {
            log.debug('getLoggedInUser#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {string} newPassword 
 */
export const updatePassword = newPassword => {
    return axios.put(`${loginBasePath}`, {
        password: newPassword,
    }).then( response => {
            log.debug('updatePassword#then', response);
            return response.data;
    })
}

/**
 * 
 * @param {string} email 
 */
export const resetPassword = email => {
    return axios.put(`${loginBasePath}/resetPassword`, {
        email,
    }).then( response => {
            log.debug('resetPassword#then', response);
            return response.data;
    })
}

/**
 * 
*/
export const deleteUser = () => {
    return axios.delete(`${loginBasePath}`)
        .then( response => {
            log.debug('deleteUser#then', response);
            return response.data;
        })
}
