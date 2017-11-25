// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import CategoryTile from '../categoryTile/CategoryTile';


const categories = [
    {name: 'Business'},
    {name: 'Party'},
    {name: 'Science'},
    {name: 'Technology'}
]



const CategoryTileTable = () => {
    return (

        <Segment style={{ minHeight: 600, padding: '9em 0em' }}>
        <Grid columns="1" stackable stretched>
            <Grid.Column stretched width="16">
                <Container>
                <Card.Group itemsPerRow="4" stackable>  
                { 
                    categories.map( (content, index) => (
                        <CategoryTile title={content.name} key={index} />
                    ))
                }
                </Card.Group>
                </Container>
            </Grid.Column>
        </Grid>
    </Segment>
    )
}

export default CategoryTileTable;