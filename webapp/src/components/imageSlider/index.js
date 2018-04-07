// Import modules
import React from 'react';
import Slick from 'react-slick';
import {Grid} from 'semantic-ui-react';

// Import resources
import './imageSlider.less';
import ThumbnailList from './thumbnailList';

class ImageSlider extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            currentSliderIndex:0,
        }
        this.goTo = this.goTo.bind(this);
    }

    goTo( index) {
        this.slider.slickGoTo( index);
        this.setState({
            currentSliderIndex: index,
        })
    }

    render(){
        const settings = {
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            adaptiveHeight: true
        };

        const imageCount = this.props.imageList.length;
        const sliderEntries = [];

        // create a slider entry for each image (max 4)
        for(let imageIndex = 0; imageIndex < imageCount && imageIndex < 4; imageIndex++){
            sliderEntries.push(
                <div><img src={this.props.imageList[imageIndex].uri}/></div>
            )
        }

        return (
            <div>
                <div className="imageSlider_Container">
                    <Slick ref={ slider => {this.slider = slider}} {...settings}>
                        {sliderEntries}
                    </Slick>
                </div>
                <div className="imageSlider_copyright">
                    {this.props.imageList[this.state.currentSliderIndex].copyright}
                </div>
                <ThumbnailList
                    imageURIList={this.props.imageList.map(image => image.uri)}
                    goTo={this.goTo}
                    global={this.props.global}
                />  
            </div>
        )
    }
}
    

export default ImageSlider;
