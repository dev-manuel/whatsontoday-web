// Import modules
import React from 'react';
import Slick from 'react-slick';
import {Grid} from 'semantic-ui-react';

// Import resources
import './imageSlider.less';
import ThumbnailList from './thumbnailList';

class ImageSlider extends React.Component{
    
    constructor(props) {
        super(props)
        this.goTo = this.goTo.bind(this);
    }

    goTo( index) {
        this.slider.slickGoTo( index);
    }

    render(){
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            adaptiveHeight: true
        };

        const imageCount = this.props.imageURIList.length;
        const sliderEntries = [];

        // create a slider entry for each image (max 4); Todo: pretty display if only one image
        for(let imageIndex = 0; imageIndex < imageCount && imageIndex < 4; imageIndex++){
            sliderEntries.push(
                <div><img src={this.props.imageURIList[imageIndex]}/></div>
            )
        }

        return (
            <div>
                <div className="imageSliderContainer">
                    <Slick ref={ slider => {this.slider = slider}} {...settings}>
                        {sliderEntries}
                    </Slick>
                </div>
                <ThumbnailList imageURIList={this.props.imageURIList} goTo={this.goTo}/>  
            </div>
        )
    }
}
    

export default ImageSlider;
