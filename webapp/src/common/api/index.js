import Axios from 'axios'

/**
 * @readonly
 */
export const baseUrl = 'http://localhost:9000/api/v1/'; // Just for dev!


export const axios = Axios.create({
    baseURL: baseUrl,
    timeout: 10000
})

/**
 * Adds the token to the the `x-auth-token` header of the axios config
 * @param {string} token 
 */
export const setToken = token => {
    axios.defaults.headers.common['x-auth-token'] = token;
}

/**
 * Removes the token from the the `x-auth-token` header of the axios config
*/
export const removeToken = () => {
    delete axios.defaults.headers.common['x-auth-token'];
}
