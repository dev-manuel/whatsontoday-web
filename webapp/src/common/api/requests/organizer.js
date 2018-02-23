import {axios} from '../index'

/**
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export const organizerSignUp = (email, password, name) => {
    return axios.post('/organizer/signUp', {
        email,
        password,
        name,
    })
}

/**
 * @param {number} id 
 */
export const readOrganizer = id => {
    return axios.get(`/organizer/${id}`)
        .then( response => {
            return response.data;
        })
}
