import log from 'loglevel'

import exampleImage from '../../../img/example_tile.png'

export const createThumbnailImageLinkFromImages = images => {
    const baseUrl = API_BASE_URL; // Defined by the webpack definition plugin
    const thumbnailImage = images.find( image => {
        return image.tag === 'thumbnail';
    })

    if(thumbnailImage){
        return `${baseUrl}/images/bytes/${thumbnailImage.id}`;
    }else{
        return exampleImage;
    }
}

export const createSliderImageLinksFromImages = images => {
    const baseUrl = API_BASE_URL; // Defined by the webpack definition plugin
    const sliderImages = images.filter( image => {
        return image.tag === 'slider';
    })

    log.debug('createSliderImageLinksFromImages#sliderImages', sliderImages)

    if(sliderImages.length !== 0){
        return sliderImages.map(image => `${baseUrl}/images/bytes/${image.id}`);
    }else{
        return [exampleImage];
    }
}