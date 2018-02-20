import {axios} from '../index'

export default {
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