import React from 'react'
import Bla, {Grid, Segment, Container, Card} from 'semantic-ui-react'

import EventTileBig from './eventTileBig'
import './index.less'

/**
 * 
 * @param {{eventList: [{name: string, date: string, categories: string, description: string, imageURI: string, target: string }]}} param0 
 */
export default ({eventList, itemNumber, pageSize}) => {

    // Create a big EventTile for all entries in the eventList
    const bigEventTiles = eventList.map( (eventListEntry, index) =>  (
        <EventTileBig key= {index} {...eventListEntry} />
    ))

    return (
        <div className='eventTileBig'>
            {bigEventTiles}        
        </div>
    )
}