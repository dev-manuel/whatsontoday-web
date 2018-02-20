import {axios} from '../index'


/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} rememberMe
 */
export const signIn = (email, password, rememberMe) => {
    return axios.post('/login/signIn', {
        email,
        password,
        rememberMe,
    }).then(response => {
            return response.data.token;
    })
}
