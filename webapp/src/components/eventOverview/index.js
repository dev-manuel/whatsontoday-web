// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import Slider from '../slider/imageSlider';


const EventOverview = () => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="8">
                        <Slider/>
                    </Grid.Column>
                    <Grid.Column width="8">
                        <h2>DasSuperEvent</h2>
                        <h3 style={{color: 'gray'}}>29. September 2018 (Samstag)</h3>
                        <Rating defaultRating={3} maxRating={5} disabled />
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default EventOverview;