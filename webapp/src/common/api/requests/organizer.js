import {axios} from '../index'

/**
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export const organizerSignUp = (email, password, name) => {
    return axios.post('/user/signUp', {
        email,
        password,
        name,
    })
}
