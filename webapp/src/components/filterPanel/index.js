// Import modules
import React from 'react';
import {Segment, Grid, Dropdown} from 'semantic-ui-react';

// Import resources
import exampleTileImage from '../../img/example_tile.png';

const exampleOptions = [{key: 0, value: 0, text: 'Lorem'},
                        {key: 1, value: 1, text: 'Ipsum'},
                        {key: 2, value: 2, text: 'Dolor'},
                        {key: 3, value: 3, text: 'Foo'},]


const FilterPanel = ({title}) => (
    <Segment>
        <Grid centered>
            <Grid.Row>
                <Grid.Column width="4">
                    <h4>Was?</h4>
                    <Dropdown placeholder='Categories' fluid multiple search selection options={exampleOptions} />
                </Grid.Column>

                <Grid.Column width="4">
                    <h4>Wo?</h4>
                </Grid.Column>

                <Grid.Column width="4">
                    <h4>Wann?</h4>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
)
  
export default FilterPanel;
  