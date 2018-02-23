import {axios} from '../index'

/**
 * @param {string} email
 * @param {string} password
 */
export const userSignUp =  (email, password) => {
    return axios.post('/user/signUp', {
        email,
        password,
    })
}