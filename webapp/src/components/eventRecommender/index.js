// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import CategoryTile from './eventTile';




// events:
// An array of all events which should be displayed as a tile
// the elements of this array must be objects with following fields:
// name: the text displayed in the tile
const EventRecommender = ({eventList}) => (
    <div>
        <h3 style={{textAlign: 'center'}}>Diese Events könnten dir auch gefallen:</h3>
        <Grid columns="1" stackable centered style={{"marginTop": 50}} >
            <Grid.Row>
            {
                // iterate over all all elements in the events array and render a EventTile according to the data
                eventList.map( (eventListEntry, index) => (
                    <Grid.Column key={index} width="2">
                        <CategoryTile {...eventListEntry}/>
                    </Grid.Column>
                ))
            }
            </Grid.Row>   
        </Grid>
    </div>
)

export default EventRecommender;