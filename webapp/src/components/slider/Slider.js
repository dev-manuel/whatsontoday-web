// Import modules
import React from 'react';
import Slick from 'react-slick';

// Import resources
import './Slider.less';

class Slider extends React.Component {

    render() {
        const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
        };
        return (
          	<div className="sliderContainer">
            	<Slick {...settings}>
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
					<div><h3>5</h3></div>
					<div><h3>6</h3></div>
            	</Slick>
         	</div>
        )
    }
}
    

export default Slider;