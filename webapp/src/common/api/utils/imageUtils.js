import log from 'loglevel'

import sliderPlaceholderImage from '../../../img/placeholderBig.png'
import thumbnailPlaceholderImage from '../../../img/placeholder.png'


export const createThumbnailImageLinkFromImages = images => {
    const baseUrl = API_BASE_URL; // Defined by the webpack definition plugin
    const thumbnailImage = images.find( image => {
        return image.tag === 'thumbnail';
    })

    if(thumbnailImage){
        return {
            uri: `${baseUrl}/images/bytes/${thumbnailImage.id}`,
            copyright: thumbnailImage.copyright,
        };
    }else{
        return {
            uri: thumbnailPlaceholderImage,
        };
    }
}

export const createSliderImageLinksFromImages = images => {
    const baseUrl = API_BASE_URL; // Defined by the webpack definition plugin
    const sliderImages = images.filter( image => {
        return image.tag === 'slider';
    })

    log.debug('createSliderImageLinksFromImages#sliderImages', sliderImages)

    if(sliderImages.length !== 0){
        return sliderImages.map(image => ({
            uri: `${baseUrl}/images/bytes/${image.id}`,
            copyright: image.copyright,
        }
    ));
    }else{
        return [{uri: sliderPlaceholderImage}];
    }
}