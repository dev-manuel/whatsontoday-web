import log from 'loglevel'

import {axios} from '../index'
import {sqlTimestampToDate, dateToSqlTimestamp} from '../utils/sqlTimeParsing'
import {createEventTargetLink} from '../utils/createTargetLinks'

/**
 * @typedef {{name: string, rating: number, description: string, from: Date, to: Date, categories: [string]}} eventData
 */

/**
 * @readonly
 * @enum {boolean}
 */
export const sortDirection = {
    ASCENDING: true,
    DESCENDING: false
}

/**
 * @readonly
 * @enum {string}
 */
export const sort = {
    ID: 'id',
    NAME: 'name',
    FROM: 'from',
    TO: 'to',
    RATING: 'rating',
    LOCATION: 'location',
}

/**
 * @param {number} category ID of the category your adding to the filter
 * @param {string} [search='']
 * @param {sortDirection} [sortDirection]
 * @param {sort} [sort] sort criteria
 * @param {number} [xPage=0]
 * @param {number} [xPageSize=20]
 */
export const searchEvents = (category, search = '', sortDirection=true, sort='id', xPage=0, xPageSize=20) => {
    // Query parameters for the AJAX request
    const queryParams = {
        search,
        sortDir: sortDirection,
        sort,
    };
    if(category) // Appending a `category` parameter according if is set
        queryParams.category = category;
    
    return axios.get('events', {
        params: queryParams,
        headers: {
            'X-Page': xPage,
            'X-Page-Size': xPageSize
        },
    }).then(result => {
        log.debug('searchEvents#then', result);
        return {
            eventList: result.data.map((event)=>({
                id: event.id,
                name: event.name,
                from: event.from,
                to: event.to,
                categories: event.categories, 
                description: event.description,
                imageURI: '#', //Todo
                target: createEventTargetLink(event.id)
            })),
            // Total Number of all items that was found with used filter configuration
            itemNumber: result.headers['x-number-items'],
        }
    })
}

/**
 * @param {number} id
 */
export const readEvent = id => {
    return axios.get(`events/${id}`)
        .then(response => {
            log.debug('readEvent#then', response);
            const data = response.data;

            /**
             * @type {eventData}
            */
            const event = {
                id: data.id,
                rating: data.rating,
                name: data.name,
                from: sqlTimestampToDate( data.from),
                to: sqlTimestampToDate( data.to),
                description: data.description,
                categories: data.categories,
                // creator: data.creator,
                // location: data.location,
                // images: data.images,
            }
            return event;
        })
}

/**
 * @param {number} id 
 */
export const participateToEvent = id => {
    return axios.get(`/event/participate/${id}`)
        .then( response => {
            log.debug('participateToEvent#then', response);
            return response.data;
        })
}

/**
 * @param {number} id 
 */
export const unparticipateToEvent = id => {
    return axios.get(`/event/unparticipate/${id}`)
        .then( response => {
            log.debug('unparticipateToEvent#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {string} name 
 * @param {string} description 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 * @param {[{id: number, tag: (string|undefined)}]} images
 * @param {[{id: number, name: string, parentId: number}]} images
 */
export const createEvent = (name, description, locationId, from, to, images, categories) => {
    const location = locationId ? {id: locationId, name: 'void', latitude: 0,
        longitude: 0, country: 'void', city: 'void', street: 'void'} : undefined;
    const req = {
        name,
        description,
        location,
        from: dateToSqlTimestamp(from),
        to: dateToSqlTimestamp(to),
        images,
        categories: categories.map(id => ({
            id,
            name: 'void',
            parentId: 1,
        })),
    }
    log.debug('createEvent#req', req);  
    
    return axios.post('/events', req)
        .then( response => {
            log.debug('createEvent#then', response);
            return response.data;
    })
}

/**
 * @param {number} id
 * @param {string} name 
 * @param {string} description 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 * @param {[{id: number, tag: (string|undefined)}]} images
 * @param {[number]} images
 */
export const updateEvent = (id, name, description, locationId, from, to, images, categories) => {
    const location = locationId ? {id: locationId, name: 'void', latitude: 0,
        longitude: 0, country: 'void', city: 'void', street: 'void'} : undefined;
    const req = {
        name,
        description,
        location,
        from: dateToSqlTimestamp(from),
        to: dateToSqlTimestamp(to),
        images,
        categories: categories.map(id => ({
            id,
            name: 'void',
            parentId: 1,
        })),
    }
    log.debug('updateEvent#req', req);    

    return axios.put('/events', req).then( response => {
            log.debug('updateEvent#then', response);
            return response.data;
    })
}

/**
 * @param {number} id 
 */
export const deleteEvent = id => {
    return axios.delete(`/events/${id}`)
        .then( response => {
            log.debug('deleteEvent#then', response);
            return response.data;
        })
}