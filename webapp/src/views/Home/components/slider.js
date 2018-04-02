// Import modules
import React from 'react';
import Slick from 'react-slick';

// Import resources
import './slider.less';

const NextArrow = ({onClick}) => {
	return (
		<div
			className="Home_slider_nextContainer"
			onClick={onClick}
		>
			<div className="nextIcon"/>
		</div>
	)
}

const BackArrow = ({onClick}) => {
	return (
		<div
			className="Home_slider_backContainer"
			onClick={onClick}			
		>
			<div className="backIcon"/>
		</div>
	)
}

class Slider extends React.Component {

	back(){
		this.slider.slickPrev();
	}

	next(){
		this.slider.slickNext();
	}

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
          	<div className="slider_Container">
				<Slick
					ref={ slider => {this.slider = slider}}
					{...settings}
				>
					{slides.map((slide, index) => (<div key={index}>{slide}</div>))}
            	</Slick>
				<NextArrow 
				  	onClick={this.next.bind(this)}
				/>
				<BackArrow
				  	onClick={this.back.bind(this)}					
				/>
         	</div>
        )
    }
}
    

export default Slider;