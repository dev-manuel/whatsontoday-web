// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import './categoryTile.less';
import exampleTileImage from '../../img/example_tile.png';

/**
 * JSX Component which is responsible to render a category tile (consits of an image, and an title)
 * @param {{name: string, imageURI: string, target: string}} props 
 */
const CategoryTile = ({name, imageURI, target, global}) => (
    <Card className="cardDimensions" href={target}>
		<Image src={imageURI} class="cardDimensions"/>
		<Card.Content>
			<Card.Header className="cardText">
				{name}
			</Card.Header>
		</Card.Content>
    </Card>
)
  
export default CategoryTile;
  