// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import Slider from '../slider/imageSlider';


let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';
for(let i = 0; i < 3; i++) loremIpsum = loremIpsum + loremIpsum;


const EventDetails = () => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <p>{loremIpsum}</p>
                    </Grid.Column>
                    <Grid.Column width="6">
                        <h2>Wann?</h2>
                        <h2>Wo?</h2>
                        <h2>Kosten</h2>
                        <h2>Weitere Infos</h2>                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default EventDetails;