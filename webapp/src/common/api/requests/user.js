import log from 'loglevel'

import {axios} from '../index'

/**
 * @param {string} email
 * @param {string} password
 */
export const userSignUp =  (email, password, repeatedPassword, acceptedTerms) => {
    return axios.post('/user/signUp', {
        email,
        password,
        repeatedPassword,
        acceptedTerms,
    }).then(response => {
        log.debug('userSignUp#then', response);        
        return response.data;
    })
}