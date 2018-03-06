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
    }).then((result)=>{
            switch(result.status){
                case 200:
                    return result.data.map((event)=>({
                        id: event.id,
                        name: event.name,
                        date: event.from,
                        categories: [], //Todo
                        description: event.description,
                        imageURI: '#', //Todo
                        target: createEventTargetLink(event.id),
                    }))
                break;

                default:
                    return Promise.reject(new Error(`No AJAX response handling for status code ${result.status}`));
                break;
            }
    })
}

/**
 * @param {number} id
 */
export const readEvent = id => {
    return axios.get(`events/${id}`)
        .then(response => {
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
            return response.data;
        })
}

/**
 * @param {number} id 
 */
export const unparticipateToEvent = id => {
    return axios.get(`/event/unparticipate/${id}`)
        .then( response => {
            return response.data;
        })
}

/**
 * 
 * @param {string} name 
 * @param {string} description 
 * @param {number} creatorId 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 */
export const createEvent = (name, description, creatorId, locationId, from, to) => {
    return axios.post('/event', {
        name,
        description,
        creatorId,
        locationId,
        from: dateToSqlTimestamp(from),
        to: dateToSqlTimestamp(to),
    }).then( response => {
        return response.data;
    })
}

/**
 * @param {number} id
 * @param {string} name 
 * @param {string} description 
 * @param {number} creatorId 
 * @param {number} locationId 
 * @param {Date} from 
 * @param {Date} to
 */
export const updateEvent = (id, name, description, creatorId, locationId, from, to) => {
    return axios.put('/event', {
        name,
        description,
        creatorId,
        locationId,
        from: dateToSqlTimestamp(from),
        to: dateToSqlTimestamp(to),
    }).then( response => {
        return response.data;
    })
}

/**
 * @param {number} id 
 */
export const deleteEvent = id => {
    return axios.delete(`/event/${id}`)
        .then( response => {
            return response.data;
        })
}