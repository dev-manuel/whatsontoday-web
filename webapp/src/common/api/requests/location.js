import log from 'loglevel'

import {axios} from '../index'

/**
 * 
 * @param {string} name 
 * @param {number} [xPage=0]
 * @param {number} [xPageSize=20]
 */
export const getLocations = (name, xPage = 0, xPageSize = 20) => {
    return axios.get('/location',{
        headers: {
            "X-Page": xPage,
            "X-Page-Size": xPageSize,
        },
    }).then( response => {
            log.debug('getLocations#then', response);
            return response.data;
    })
}

/**
 * 
 * @param {number} id 
 */
export const readLocation = id => {
    return axios.get(`/locations/${id}`)
        .then( response => {
            log.debug('readLocation#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {number} id 
 * @param {number} xPage 
 * @param {number} xPageSize 
 */
export const getNearbyLocations = (id, xPage = 0, xPageSize = 20) => {
    return axios.get(`locations/nearby/${id}`, {
        headers: {
            "X-Page": xPage,
            "X-Page-Size": xPageSize,
        },
    })
        .then( response => {
            log.debug('getNearbyLocations#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {string} name 
 * @param {number} latitude 
 * @param {number} longitude 
 */
export const createLocation = (name, latitude, longitude) => {
    return axios.post('/locations', {
        name,
        latitude,
        longitude,
      }).then( response => {
            log.debug('createLocation#then', response);
            return response.data;
      })
}