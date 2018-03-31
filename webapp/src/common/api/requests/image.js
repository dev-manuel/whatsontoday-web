import log from 'loglevel'

import {axios} from '../index'

export const imageBasePath = '/images';

/**
 * @readonly
 * @enum {string}
 */
export const entityType = {
    EVENT: 'Event',
    LOCATION: 'Location',
    ORGANIZER: 'Organizer',
}

/**
 * @param {File} file
 * @param {string} copyright
 */
export const uploadImage = (file, copyright) => {
    const data = new FormData();
    data.set('image', file);
    if(copyright)
        data.set('copyright', copyright);
    data.set('data',JSON.stringify({
        name: name,
    }))

    return axios.post(imageBasePath, data)
        .then( response => {
            log.debug('uploadImage#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {number} id 
 */
export const readImageData = id => {
    return axios.get(`${imageBasePath}/${id}`)
        .then( response => {
            log.debug('readImageData#then', response);
            return response.data;
        })
}

/**
 * @param {entityType} entityType
 * @param {number} entityId
 * @param {string} tag
 */
export const attachImage = (entityType, entityId, tag) => {
    // Query parameters for the AJAX request
    const queryParams = {
        entityType,
        entityId,
    };
    if(tag) // Appending a `tag` parameter according if is set
        queryParams.tag = tag;

    return axios.get(`${imageBasePath}/attach`, {
        params: queryParams,
    }).then(response => {
            log.debug('attachImage#then', response);
            return response.data;
    })
}
