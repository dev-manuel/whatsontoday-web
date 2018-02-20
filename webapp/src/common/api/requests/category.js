import {axios} from '../index'

export default {
    /**
     * Authentication needed!
     * @param {string} name
     * @param {number} parentId
     */
    createCategory: (name, parentId) => {
        return axios.post('/category', {
            name,
            parentId,
        }).then( response => {
            return response.data;
        })
    },

    getCategories: () => {
        return axios.get('/category')
            .then( response => {
                return response.data;
            })
    },
}