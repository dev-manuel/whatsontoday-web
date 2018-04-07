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

export class ProgressBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			progress: 0, // In percent
		}

		this.rate = 26.0; // FPS
		this.duration = 6; // Seconds
	}

	componentDidMount(){


		this.interval = setInterval(this.createProgressUpdate(this.rate, this.duration), 1 / this.rate * 1000);
	}

	createProgressUpdate(rate, duration){
		const widthDelta = 100 / (rate * duration);

		return () => {
			if(!this.props.pause){
				this.setState(({progress}) => {
					const newProgress = progress + widthDelta;
					if(newProgress >= 100)
						this.props.next();
					return {
						progress: newProgress%100,
					}
				});
			}
		}
	}

	render(){
		return (
			<div className="Home_slider_progressContainer">
				<div
					o
					className="Home_slider_progress"
					style={{width: `${this.state.progress}%`}}
				/>
			</div>
		)
	}
}

class Slider extends React.Component {

	state = {
		pauseProgress: false,
	}

	back(){
		this.slider.slickPrev();
	}

	next(){
		this.slider.slickNext();
	}

    render() {
        const settings = {
			autoplay: false,
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
			<div
			  	className="slider_Container"
				onMouseOver={()=>this.setState({pauseProgress:true})}
				onMouseOut={()=>this.setState({pauseProgress:false})}
			>
			  	<ProgressBar
					next={this.next.bind(this)}
					pause={this.state.pauseProgress}
				/>
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