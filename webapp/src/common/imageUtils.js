import {apiEnums} from './api'


/**
 * @param {number} id
 * @returns {string}
 */
const createImageLink = (id) => {
    return `${apiEnums.baseUrl}images/bytes/${id}`;
}

/**
 * @param {[{id: number, name: string, tag: string}]} images
 * @returns {number} Returns undefined if logo is not found
 */
const getLogoImageId = (images) => {
    const logo = images.find( image => {
        return image.tag === 'logo';
    })

    if(logo){
        return logo.id;
    }else{
        return undefined;
    }
}