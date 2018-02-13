import Axios from 'axios'
import {sqlTimestampToDate, DateToSqlTimestamp} from './sqlTimeParsing'


const axios = Axios.create({
    baseURL: 'http://localhost:9000/api/v1/', // Just for dev!
    timeout: 10000
})

export const apiEnums = {

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
     * @enum {boolean}
     */
    sort: {
        ID: 'id',
        NAME: 'name',
        FROM: 'from',
        TO: 'to',
        RATING: 'rating',
        LOCATION: 'location',
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
            'X-Page': xPage,
            'X-Page-Size': xPageSize
        };
        if(category) // Appending a `category` parameter according if is set
            queryParams.category = category;
        
        return axios.get('events', {params: queryParams})
            .then((result)=>{
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
    getEvent: id => {
        return axios.get(`events/${id}`)
            .then(response => {
                const data = response.data;
                const event = {
                    id: data.id,
                    name: data.name,
                    from: new Date()
                }
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
}
