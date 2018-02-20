import {axios} from '../index'

export default {
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
}