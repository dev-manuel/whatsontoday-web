import React from 'react'
import { Icon, Image as ImageComponent, Item, Segment } from 'semantic-ui-react'

import exampleTileImage from '../../img/example_tile.png';


const ItemExampleExtraContent = ({name, date, categories, description}) => (
    <Segment>
        <Item.Group>
            <Item>
            <Item.Image size='small' src={exampleTileImage}/>

            <Item.Content>
                <Item.Header as='a'>{name}</Item.Header>
                <Item.Description>{description}</Item.Description>
                <Item.Extra>
                    <Icon color='gray' name='calendar' /> {date}
                    <span style={{float: 'right'}}><Icon color="gray" name="tags" /> {categories}</span>
                </Item.Extra>
            </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
)

export default ItemExampleExtraContent
