import log from 'loglevel'

import {axios} from '../index'

/**
 * Authentication needed!
 * @param {string} name
 * @param {number} parentId
 */
export const createCategory = (name, parentId) => {
    return axios.post('/category', {
        name,
        parentId,
    }).then( response => {
            log.debug('createCategory#then', response);
            return response.data;
    })
}

export const getCategories = () => {
    return axios.get('/category')
        .then( response => {
            log.debug('getCategories#then', response);
            return response.data;
        })
}
