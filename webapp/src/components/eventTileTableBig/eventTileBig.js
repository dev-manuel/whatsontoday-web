import React from 'react'
import { Icon, Image as ImageComponent, Item, Segment } from 'semantic-ui-react'

import {stringifyTime} from '../../common/timeStringification'
import exampleTileImage from '../../img/example_tile.png'

import './eventTileBig.less'

/**
 * 
 * @param {{name: string, from: Date, to: Date categories: string, description: string, imageURI: string, target: string }} props 
 */
const ItemExampleExtraContent = ({name, from, to, categories, description, imageURI, target, language}) => {
    const stringifiedTime = stringifyTime(from, to, language.time);

    return(
        <Segment>
            <Item.Group href={target}>
                <Item>
                <Item.Image size='small' src={exampleTileImage}/>

                <Item.Content>
                    <Item.Header>
                        {name}

                        {/* Display the dates */}
                        <Icon name='calendar' />
                        <div className="eventOverviewDate">
                            {stringifiedTime.firstLine}
                            <br/>
                            {stringifiedTime.secondLine}
                        </div>
                    </Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <span style={{float: 'right'}}><Icon color="gray" name="tags" /> {categories}</span>
                    </Item.Extra>
                </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
}

export default ({name, from, to, categories, description, imageURI, target, language}) => {
    const {firstLine, secondLine} = stringifyTime(from, to, language.time);    

    return (
        <div className="eventTileBig_main">
            <img src={exampleTileImage} className="eventTileBig_image"/>
            <div className="eventTileBig_body">
                <div className="eventTileBig_heading">{name}</div>
                <div className="eventTileBig_date">
                    <div className="fistLine">{firstLine}</div>
                    <div className="secondLine">{secondLine}</div>
                </div>
            </div>
        </div>
    )
}
