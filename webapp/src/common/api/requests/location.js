import log from 'loglevel'

import {axios} from '../index'


/**
 * @typedef {{id:number,name:string,latitude:number,longitude:number,country:string,city: string,street:string}} LocationResult
 */


/**
 * 
 * @param {string} search 
 * @param {number} [xPage=0]
 * @param {number} [xPageSize=20]
 * @returns {Promise<[LocationResult]>}
 */
export const getLocations = (search, xPage = 0, xPageSize = 20) => {
    return axios.get('/location',{
        params: {
            search,
        },
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
    return axios.get(`/location/${id}`)
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
    return axios.get(`location/nearby/${id}`, {
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
 * @param {string} country
 * @param {string} city 
 * @param {string} street 
 * @returns {Promise<LocationResult>}
 */
export const createLocation = (name, country, city, street, website, comment) => {
    return axios.post('/location', {
        name,
        latitude: 0,
        longitude: 0,
        country,
        city,
        street,
        website,
        comment,
      }).then( response => {
            log.debug('createLocation#then', response);
            return response.data;
      })
}