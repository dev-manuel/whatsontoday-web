import {axios} from '../index'
import {sqlTimestampToDate} from '../utils/sqlTimeParsing'

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
},

export default {
    /**
     * @param {string} search
     * @param {sortDirection} sortDirection
     * @param {number} category ID of the category your adding to the filter
     * @param {sort} sort sort criteria
     */
    searchEvents: (search = '', sortDirection=apiEnums.sortDirection.ASCENDING, category, sort=apiEnums.sort.ID, xPage=0, xPageSize=20) => {
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
                            target: '#' //Todo
                        }))
                    break;

                    default:
                        return Promise.reject(new Error(`No AJAX response handling for status code ${result.status}`));
                    break;
                }
        })
    },

    /**
     * @param {number} id
     */
    getEvent: id => {
        return axios.get(`events/${id}`)
            .then(response => {
                const data = response.data;

                const event = {
                    id: data.id,
                    name: data.name,
                    from: sqlTimestampToDate( data.from),
                    to: sqlTimestampToDate( data.to),
                    description: data.description,
                    creator: data.creator,
                    categories: data.categories,
                    location: data.location,
                    images: data.images,
                }
                return event;
            })
    },
}