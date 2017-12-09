// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import exampleTileImage from '../../img/example_tile.png';


const EventTile = ({title}) => (
    <Card>
		<Image src={exampleTileImage}/>
		<Card.Content>
			<Card.Header>
				{title}
			</Card.Header>
		</Card.Content>
    </Card>
)
  
export default EventTile;
  