import Axios from 'axios'
import {sqlTimestampToDate, DateToSqlTimestamp} from './sqlTimeParsing'

export const apiEnums = {

    /**
     * @readonly
     */
    baseUrl:  'http://localhost:9000/api/v1/', // Just for dev!

    /**
     * @readonly
     * @enum {boolean}
     */
    sortDirection: {
        ASCENDING: true,
        DESCENDING: false
    },

    /**
     * @readonly
     * @enum {string}
     */
    sort: {
        ID: 'id',
        NAME: 'name',
        FROM: 'from',
        TO: 'to',
        RATING: 'rating',
        LOCATION: 'location',
    },

    /**
     * @readonly
     * @enum {string}
     */
    entityType: {
        EVENT: 'Event',
        LOCATION: 'Location',
        ORGANIZER: 'Organizer',
    }
}

export const api = {
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

    /**
     * @param {string} email
     * @param {string} password
     * @param {boolean} rememberMe
     */
    signIn: (email, password, rememberMe) => {
        return axios.post('/login/signIn', {
            email,
            password,
            rememberMe,
        }).then(response => {
                return response.data.token;
        })
    },

    /**
     * @param {string} email
     * @param {string} password
     */
    userSignUp: (email, password) => {
        return axios.post('/user/signUp', {
            email,
            password,
        })
    },

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} name
     */
    organizerSignUp: (email, password, name) => {
        return axios.post('/user/signUp', {
            email,
            password,
            name,
        })
    },

    /**
     * @param {File} file
     * @param {string} name
     */
    uploadImage: ( file, name) => {
        const data = new FormData();
        data.set('image', file);
        data.set('data',JSON.stringify({
            name: name,
        }))

        return axios.post(`images`, data)
            .then( response => {
                return response.data;
            })
    },

    /**
     * @param {entityType} entityType
     * @param {number} entityId
     * @param {string} tag
     */
    attachImage: (entityType, entityId, tag) => {
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
}

export const axios = Axios.create({
    baseURL: apiEnums.baseUrl,
    timeout: 10000
})
