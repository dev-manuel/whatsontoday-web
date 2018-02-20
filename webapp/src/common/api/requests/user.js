import {axios} from '../index'

export default {
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
}