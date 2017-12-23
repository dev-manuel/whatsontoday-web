// Import modules
import React from 'react';
import Slick from 'react-slick';
import {Grid} from 'semantic-ui-react';

// Import resources
import './imageSlider.less';
import Thumbnail from './thumbnail';

class ImageSlider extends React.Component{
    
    constructor(props) {
        super(props)
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    next() {
        this.slider.slickNext()
    }

    previous() {
        this.slider.slickPrev()
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
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Thumbnail isActive imageURI={this.props.imageURIList[0]} onClick={ ()=>{this.goTo(0)} } />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Thumbnail imageURI={this.props.imageURIList[1]} onClick={ ()=>{this.goTo(1)} } />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Thumbnail imageURI={this.props.imageURIList[2]} onClick={ ()=>{this.goTo(3)} } />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            More...
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
    

export default ImageSlider;
