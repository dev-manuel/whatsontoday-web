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