// Import modules
import React from 'react';
import Slick from 'react-slick';

// Import resources
import './slider.less';

class Slider extends React.Component {

    render() {
        const settings = {
			autoplay: true,
			dots: false,
			infinite: true,
			speed: 500,
			autoplaySpeed: 6666,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		const {
			slides = [],
		} = this.props;

        return (
          	<div className="sliderContainer">
            	<Slick {...settings}>
					{slides.map((slide, index) => (<div key={index}>{slide}</div>))}
            	</Slick>
         	</div>
        )
    }
}
    

export default Slider;