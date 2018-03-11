import log from 'loglevel'

import {axios} from '../index'

/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} rememberMe
 */
export const signIn = (email, password, rememberMe) => {
    return axios.post('/login/signIn', {
        email,
        password,
        rememberMe,
    }).then(response => {
            log.debug('signIn#then', response);
            return response.data.token;
    })
}

/**
 * 
*/
export const signOut = () => {
    return axios.get('/login/signOut')
        .then( response => {
            log.debug('signOut#then', response);
            return response.data;
        })
}

/**
 * 
*/
export const getLoggedInUser = () => {
    return axios.get('/login')
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
    return axios.put('/login', {
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
    return axios.put('/login/resetPassword', {
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
    return axios.delete('/login')
        .then( response => {
            log.debug('deleteUser#then', response);
            return response.data;
        })
}
