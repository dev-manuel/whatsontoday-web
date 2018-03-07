import React from 'react'
import { Icon, Image as ImageComponent, Item, Segment } from 'semantic-ui-react'

import exampleTileImage from '../../img/example_tile.png';

/**
 * 
 * @param {{name: string, date: string, categories: string, description: string, imageURI: string, target: string }} props 
 */
const ItemExampleExtraContent = ({name, date, categories, description, imageURI, target}) => (
    <Segment>
        <Item.Group href={target}>
            <Item>
            <Item.Image size='small' src={exampleTileImage}/>

            <Item.Content>
                <Item.Header as='a'>{name}</Item.Header>
                <Item.Description>{description}</Item.Description>
                <Item.Extra>
                    <Icon name='calendar' /> {date}
                    <span style={{float: 'right'}}><Icon color="gray" name="tags" /> {categories}</span>
                </Item.Extra>
            </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
)

export default ItemExampleExtraContent
