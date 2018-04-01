import React from 'react'
import {Responsive, Grid, Segment, Container, Card, } from 'semantic-ui-react'

import EventTileDesktop from './eventTileDesktop'
import EventTileMobile from './eventTileMobile'
import './eventTileTable.less'

/**
 * 
 * @param {{eventList: [{name: string, date: string, categories: string, description: string, imageURI: string, target: string }]}} param0 
 */
export default ({eventList, itemNumber, pageSize, language}) => {

    // Create a EventTile for all entries in the eventList
    const desktopEventTiles = eventList.map( (eventListEntry, index) =>  (
        <EventTileDesktop key= {index} {...eventListEntry} language={language}/>
    ))

    const mobileEventTiles = eventList.map( (eventListEntry, index) =>  (
        <EventTileMobile key= {index} {...eventListEntry} language={language}/>
    ))

    const responsiveBreakPoint = 1200;

    return (
        <React.Fragment>
            <Responsive
                minWidth={responsiveBreakPoint}
            >
            <div className='eventTileTable_tile'>
                {desktopEventTiles}        
            </div>
            </Responsive>
            <Responsive
                maxWidth={responsiveBreakPoint-1}
            >
                <div className='eventTileTable_tile'>
                    {mobileEventTiles}        
                </div>
            </Responsive>
        </React.Fragment>
    )
}