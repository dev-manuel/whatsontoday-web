import React from 'react'
import { Icon, Image as ImageComponent, Item, Segment } from 'semantic-ui-react'

import exampleTileImage from '../../img/example_tile.png';


const LoremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const ItemExampleExtraContent = () => (
    <Segment>
        <Item.Group>
            <Item>
            <Item.Image size='small' src={exampleTileImage}/>

            <Item.Content>
                <Item.Header as='a'>Some cool event</Item.Header>
                <Item.Description>{LoremIpsum}</Item.Description>
                <Item.Extra>
                <Icon color='green' name='check' /> 121 Votes
                </Item.Extra>
            </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
)

export default ItemExampleExtraContent
