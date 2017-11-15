// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';
import exampleTileImage from '../../img/example_tile.png'

const CategoryTile = ({title}) => (
    <Card>
      <Image src={exampleTileImage} />
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
      </Card.Content>
    </Card>
  )
  
  export default CategoryTile;
  