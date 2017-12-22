// Import modules
import React from 'react';
import Slick from 'react-slick';
import {Grid} from 'semantic-ui-react';

// Import resources
import './imageSlider.less';

const ImageSlider = ({imageURIList}) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="sliderContainer">
            <Slick {...settings}>
                <div><img src={imageURIList[0]}/></div>
                <div><img src={imageURIList[1]}/></div>
                <div><img src={imageURIList[2]}/></div>
                <div><img src={imageURIList[3]}/></div>
            </Slick>

            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <img src={imageURIList[1]} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <img src={imageURIList[2]} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <img src={imageURIList[3]} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        More...
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

    

export default ImageSlider;
