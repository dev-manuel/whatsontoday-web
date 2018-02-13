import React from 'react'
import {Grid, Segment, Container, Card} from 'semantic-ui-react'

import EventTileBig from './eventTileBig'
import './index.less'

/**
 * 
 * @param {{eventList: [{name: string, date: string, categories: string, description: string, imageURI: string, target: string }]}} param0 
 */
const EventTileTable = ({eventList}) => {
    const bigEventTiles = eventList.map( (eventListEntriy, index) =>  (
        <EventTileBig key= {index} {...eventListEntriy} />
    ))

    return (
        <div className='eventTileBig'>
            {bigEventTiles}
        </div>
    )
}

export default EventTileTable;