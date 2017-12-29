// Import modules
import React from 'react';
import {Grid} from 'semantic-ui-react';


// Import resources
import Thumbnail from './thumbnail';


class ThumbnailList extends React.Component {

    constructor(props){
        super(props);

        this.slider = this.props.sliderRed;

        this.state = {sliderIndex: 0};
    }

    setSliderIndex( index) {
        this.props.goTo( index); // Use the goTo function (in props) to set the displayed image in the slider
        this.setState({sliderIndex: index})
    }

    render(){

        const imageCount = this.props.imageURIList.length;
        const columns = [];

        // create a thumbnail for each image (max 4); Todo: pretty display if only one image
        for(let imageIndex = 0; imageIndex < imageCount && imageIndex < 4; imageIndex++){
            console.log(imageIndex);
            columns.push(
                <Thumbnail isActive={this.state.sliderIndex===imageIndex} imageURI={this.props.imageURIList[imageIndex]} onClick={ ()=>{this.setSliderIndex(imageIndex)} } />
            )
        }

        return (
            <div className='thumbnailList'>
                {columns}
            </div>
        )
    }
}


const Thumbnails = ({imageURI, isActive = false, onClick}) => {
    return (
        <img src={imageURI} className={isActive ? 'activeThumbnail' : 'inactiveThumbnail'} onClick={onClick}/>
    )
}

export default ThumbnailList;