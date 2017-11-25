// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import CategoryTile from '../categoryTile/CategoryTile';


// An array of all catagories which should be displayed as a tile
// the elements of this array must be objects with following fields:
// name: the text displayed in the tile
const categories = [
    {name: 'Business'},
    {name: 'Party'},
    {name: 'Science'},
    {name: 'Technology'},
    {name: 'Sport'}
]


const CategoryTileTable = () => (
    <Grid columns="1" stackable centered style={{"margin-top": 50}} >
        <Grid.Row>
        {
            // iterate over all all elements in the categories array and render a CategoryTile according to the data
            categories.map( (content, index) => (
                <Grid.Column width="2">
                    <CategoryTile title={content.name} key={index} />
                </Grid.Column>
            ))
        }
        </Grid.Row>   
    </Grid>
)

export default CategoryTileTable;