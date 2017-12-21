// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import CategoryTile from './categoryTile';


/**
 * JSX Component which is responsible to render a list of category tiles
 * @param {{categoryList:[{name: string, imageURI: string, target: string}]}} params 
 */
const CategoryTileTable = ({categoryList}) => (
    <Grid columns="1" stackable centered style={{"marginTop": 50}} >
        <Grid.Row>
        {
            // iterate over all all elements in the categoryLIst and render a CategoryTile according to the data
            categoryList.map( (categoryListEntry, index) => (
                <Grid.Column key={index} width="2">
                    <CategoryTile {...categoryListEntry}/>
                </Grid.Column>
            ))
        }
        </Grid.Row>   
    </Grid>
)

export default CategoryTileTable;