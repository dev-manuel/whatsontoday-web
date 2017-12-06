// Import modules
import React from 'react';
import Slick from 'react-slick';
import {Grid} from 'semantic-ui-react';

// Import resources
import './Slider.less';

class Slider extends React.Component {

    render() {
        const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
          	<div className="sliderContainer">
            	<Slick {...settings}>
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
            	</Slick>

                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            image
                        </Grid.Column>
                        <Grid.Column width={4}>
                            image
                        </Grid.Column>
                        <Grid.Column width={4}>
                            image
                        </Grid.Column>
                        <Grid.Column width={4}>
                            image
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
         	</div>
        )
    }
}
    

export default Slider;