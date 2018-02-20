import Axios from 'axios'

/**
 * @readonly
 */
export const baseUrl = 'http://localhost:9000/api/v1/'; // Just for dev!


export const axios = Axios.create({
    baseURL: baseUrl,
    timeout: 10000
})
