// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
// ...

/**
 * JSX Component which is responsible to render a event  tile (consits of an image, and an title)
 * @param {{name: string, imageURI: string, target: string}} props 
 */
const EventTile = ({name, imageURI, target}) => (
    <Card className="cardDimensions" href={target}>
		<Image src={imageURI} class="cardDimensions"/>
		<Card.Content>
			<Card.Header className="cardText">
				{name}
			</Card.Header>
		</Card.Content>
    </Card>
)
  
export default EventTile;
  