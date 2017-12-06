// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import Slider from '../slider/imageSlider';


let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';
//for(let i = 0; i < 1; i++) loremIpsum = loremIpsum + loremIpsum;

const floatRight = {style: {float: 'right'}};

const LocationDetails = () => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <p>Ohhhh. I'm a map!</p>
                    </Grid.Column>
                    <Grid.Column width="6">
                        <h2>CoolLocation <span {...floatRight}><Rating defaultRating={3} maxRating={5} disabled /></span></h2>
                        <p>{loremIpsum}</p>
                        <a {...floatRight}>Mehr zu CoolLocation</a>                      
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default LocationDetails;