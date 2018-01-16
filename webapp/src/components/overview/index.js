// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import ImageSlider from '../imageSlider';


const Overview = ({name, date, rating, description, categories}) => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="8">
                        {/* <ImageSlider /> */}
                    </Grid.Column>
                    <Grid.Column width="8">
                        <h2>{name}</h2>
                        <h3 style={{color: 'gray'}}>{date}</h3>
                        <Rating defaultRating={rating} maxRating={5} disabled />
                        <p>{description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default Overview;