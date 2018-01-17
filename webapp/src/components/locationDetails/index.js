// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
// ...


const floatRight = {style: {float: 'right'}};

/**
 * 
 * @param {{name: string, rating: string, description: string, target: string, address: object}} props 
 */
const LocationDetails = ({name, rating, description, target, address, global}) => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <p>Ohhhh. I'm a map!</p>
                    </Grid.Column>
                    <Grid.Column width="6">
                        <h2>{name} <span {...floatRight}><Rating defaultRating={rating} maxRating={5} disabled /></span></h2>
                        <p>{description}</p>
                        <a {...floatRight} href={target}>Mehr zu CoolLocation</a>                      
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default LocationDetails;