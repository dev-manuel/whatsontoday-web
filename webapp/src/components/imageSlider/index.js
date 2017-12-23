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

        //setInterval(()=>{this.next()}, 2000)

        return (
            <div>
                <div className="sliderContainer">
                    <Slick ref={ slider => {this.slider = slider}} {...settings}>
                        <div><img src={this.props.imageURIList[0]}/></div>
                        <div><img src={this.props.imageURIList[1]}/></div>
                        <div><img src={this.props.imageURIList[2]}/></div>
                        <div><img src={this.props.imageURIList[3]}/></div>
                    </Slick>
                </div>
                <ThumbnailList imageURIList={this.props.imageURIList} goTo={this.goTo}/>  
            </div>
        )
    }
}
    

export default ImageSlider;
