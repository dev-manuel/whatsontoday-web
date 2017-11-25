// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import './CategoryTile.less';
import exampleTileImage from '../../img/example_tile.png';


const CategoryTile = ({title}) => (
    <Card className="cardDimensions">
		<Image src={exampleTileImage} class="cardDimensions"/>
		<Card.Content>
			<Card.Header className="cardText">
				{title}
			</Card.Header>
		</Card.Content>
    </Card>
)
  
export default CategoryTile;
  