import {axios} from '../index'

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
 * @param {string} name
 */
export const uploadImage = ( file, name) => {
    const data = new FormData();
    data.set('image', file);
    data.set('data',JSON.stringify({
        name: name,
    }))

    return axios.post(`images`, data)
        .then( response => {
            return response.data;
        })
}

/**
 * 
 * @param {number} id 
 */
export const readImageData = id => {
    return axios.get(`/images/${id}`)
        .then( response => {
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

    return axios.get('/image/attach', {
        params: queryParams,
    }).then(response => {
        return response.data;
    })
}
