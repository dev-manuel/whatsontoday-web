import React from 'react'
import Bla, {Grid, Segment, Container, Card} from 'semantic-ui-react'

import EventTileDesktop from './eventTileDesktop'
import './eventTileTable.less'

/**
 * 
 * @param {{eventList: [{name: string, date: string, categories: string, description: string, imageURI: string, target: string }]}} param0 
 */
export default ({eventList, itemNumber, pageSize, language}) => {

    // Create a big EventTile for all entries in the eventList
    const bigEventTiles = eventList.map( (eventListEntry, index) =>  (
        <EventTileDesktop key= {index} {...eventListEntry} language={language}/>
    ))

    return (
        <div className='eventTileTable_tile'>
            {bigEventTiles}        
        </div>
    )
}