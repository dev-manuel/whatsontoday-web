import log from 'loglevel'

import {axios} from '../index'

export const organizerBasePath = '/organizer';

/**
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export const organizerSignUp = (email, password, name) => {
    return axios.post(`${organizerBasePath}/signUp`, {
        email,
        password,
        name,
    }).then(response => {
        log.debug('organizerSignUp#then', response);
        return response.data;
    })
}

/**
 * @param {number} id 
 */
export const readOrganizer = id => {
    return axios.get(`${organizerBasePath}/${id}`)
        .then( response => {
            log.debug('readOrganizer#then', response);
            return response.data;
        })
}

/**
 * 
 */
export const getOwnEvents = () => {
    return axios.get(`${organizerBasePath}/eventsCurrent`)
        .then( response => {
            log.debug('getOwnEvents#then', response);
            return response.data;
        })
}
