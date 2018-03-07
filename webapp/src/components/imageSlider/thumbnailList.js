// Import modules
import React from 'react';

// Import resources
import Thumbnail from './thumbnail';
import { setInterval } from 'timers';


class ThumbnailList extends React.Component {

    constructor(props){
        super(props);

        this.slider = this.props.sliderRed;

        const next = this.next.bind(this);
        this.state = {
            sliderIndex: 0,
            //sliderTimer: setInterval(next, 6000) // Todo: reset if user manually select a slider entry
        };

        this.imageCount = this.props.imageURIList.length;
    }

    next(){
        this.setSliderIndex( (this.state.sliderIndex + 1) % this.imageCount)
    }

    setSliderIndex( index) {
        //clearInterval(this.state.sliderTimer);
        this.props.goTo( index); // Use the goTo function (in props) to set the displayed image in the slider
        this.setState({sliderIndex: index})
    }

    render(){
        const columns = [];

        // create a thumbnail for each image (max 4); Todo: pretty display if only one image
        for(let imageIndex = 0; imageIndex < this.imageCount && imageIndex < 4; imageIndex++){
            columns.push(
                <Thumbnail isActive={this.state.sliderIndex===imageIndex} imageURI={this.props.imageURIList[imageIndex]} onClick={ ()=>{this.setSliderIndex(imageIndex)} } />
            )
        }

        return (
            <div className='thumbnailList'>
                {columns}
            </div>
        )
    }
}

export default ThumbnailList;