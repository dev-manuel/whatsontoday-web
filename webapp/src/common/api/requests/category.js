import {axios} from '../index'


/**
 * Authentication needed!
 * @param {string} name
 * @param {number} parentId
 */
export const createCategory = (name, parentId) => {
    return axios.post('/category', {
        name,
        parentId,
    }).then( response => {
        return response.data;
    })
}

export const getCategories = () => {
    return axios.get('/category')
        .then( response => {
            return response.data;
        })
}
