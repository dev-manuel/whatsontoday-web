// Import modules
import React from 'react';
import {Grid} from 'semantic-ui-react';


// Import resources
import Thumbnail from './thumbnail';


class ThumbnailList extends React.Component {

    constructor(props){
        super(props);

        this.slider = this.props.sliderRed;

        this.state = {sliderIndex: 0};
    }

    setSliderIndex( index) {
        this.props.goTo( index);
        this.setState({sliderIndex: index})
    }

    render(){
        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Thumbnail isActive={this.state.sliderIndex===0} imageURI={this.props.imageURIList[0]} onClick={ ()=>{this.setSliderIndex(0)} } />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Thumbnail isActive={this.state.sliderIndex===1} imageURI={this.props.imageURIList[1]} onClick={ ()=>{this.setSliderIndex(1)} } />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Thumbnail isActive={this.state.sliderIndex===2} imageURI={this.props.imageURIList[2]} onClick={ ()=>{this.setSliderIndex(2)} } />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        More...
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


const Thumbnails = ({imageURI, isActive = false, onClick}) => {
    return (
        <img src={imageURI} className={isActive ? 'activeThumbnail' : 'inactiveThumbnail'} onClick={onClick}/>
    )
}

export default ThumbnailList;