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
 * 
 * @param {number} id 
 * @param {entityType} entityType 
 * @param {number} rate 
 */
export const rateEntity = (id, entityType, rate) => {
    return axios.get(`/rating/${id}/${entityType}/${rate}`)
        .then( response => {
            return response.data;
        })
}