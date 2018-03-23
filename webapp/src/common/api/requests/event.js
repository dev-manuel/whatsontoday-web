import log from 'loglevel'

import {axios} from '../index'
import {sqlTimestampToDate, dateToSqlTimestamp} from '../utils/sqlTimeParsing'
import {createEventTargetLink} from '../utils/createTargetLinks'
import {mapEvent} from '../utils/mapEvent'

/**
 * @typedef {{id:number,name:string,parentId:string}} categoryResponse
 *
 * @typedef {{id:number,name:string,loginFk: number}} OrganizerResponse
 *
 * @typedef {{id:number,name:string,latitude:number,longitude:number,country:string,city: string,street:string}} LocationResponse
 *
 * @typedef {{id:number,tag:string}} ImageResponse
 *
 * @typedef {{id:number,name:string,avgRating:number,description:string,shortDescription:string,from:Date,to:Date,categories:[categoryResponse],location:LocationResponse,images:[ImageResponse],participantCount:number}} EventResponse
 */

export const eventBasePath = '/events'

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
    
    return axios.get(`${eventBasePath}`, {
        params: queryParams,
        headers: {
            'X-Page': xPage,
            'X-Page-Size': xPageSize
        },
    }).then(result => {
        log.debug('searchEvents#then', result);
        return {
            eventList: result.data.map(eventResponse=> mapEvent(eventResponse)),
            // Total Number of all items that was found with used filter configuration
            itemNumber: result.headers['x-number-items'],
        }
    })
}

/**
 * @param {number} id
 */
export const readEvent = id => {
    return axios.get(`${$eventBasePath}/${id}`)
        .then(response => {
            log.debug('readEvent#then', response);
            return mapEvent(response);
        })
}

/**
 * @param {number} id 
 */
export const participateToEvent = id => {
    return axios.get(`${eventBasePath}/participate/${id}`)
        .then( response => {
            log.debug('participateToEvent#then', response);
            return response.data;
        })
}

/**
 * @param {number} id 
 */
export const unparticipateToEvent = id => {
    return axios.get(`${events}/unparticipate/${id}`)
        .then( response => {
            log.debug('unparticipateToEvent#then', response);
            return response.data;
        })
}

/**
 * 
 * @param {string} name 
 * @param {string} description 
 * @param {string} shortDescription 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 * @param {[{id: number, tag: (string|undefined)}]} images
 * @param {[{id: number, name: string, parentId: number}]} images
 */
export const createEvent = (name, description, shortDescription, locationId, from, to, images, categories) => {
    const location = locationId ? {id: locationId, name: 'void', latitude: 0,
        longitude: 0, country: 'void', city: 'void', street: 'void'} : undefined;
    const req = {
        name,
        description,
        shortDescription,
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
    
    return axios.post(`${eventBasePath}`, req)
        .then( response => {
            log.debug('createEvent#then', response);
            return response.data;
    })
}

/**
 * @param {number} id
 * @param {string} name 
 * @param {string} description 
 * @param {string} shortDescription 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 * @param {[{id: number, tag: (string|undefined)}]} images
 * @param {[number]} images
 */
export const updateEvent = (id, name, description, shortDescription, locationId, from, to, images, categories) => {
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

    return axios.put(`${eventBasePath}`, req).then( response => {
            log.debug('updateEvent#then', response);
            return response.data;
    })
}

/**
 * @param {number} id 
 */
export const deleteEvent = id => {
    return axios.delete(`${eventBasePath}/${id}`)
        .then( response => {
            log.debug('deleteEvent#then', response);
            return response.data;
        })
}

export const nearbyEvents = (id, xPage, xPageSize) => {
    return axios.get(`${eventBasePath}/nearby/${id}`,{
        headers: {
            'X-Page': xPage,
            'X-Page-Size': xPageSize,
        },
    }.then( response => {
        log.debug('nearbyEvents#then', response);
        return response.data;
        
    }))
}
