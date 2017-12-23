// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import EventTileBig from './eventTileBig';

/**
 * 
 * @param {{eventList: [{name: string, date: string, categories: string, description: string, imageURI: string, target: string }]}} param0 
 */
const EventTileTable = ({eventList}) => {
    const bigEventTiles = eventList.map( (eventListEntriy, index) =>  (
        <EventTileBig key= {index} {...eventListEntriy} />
    ))

    return (
        <div>
            {bigEventTiles}
        </div>
    )
}

export default EventTileTable;