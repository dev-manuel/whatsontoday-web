// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import EventTile from './eventTile';

/**
 * JSX component to render multiple event tiles in a tabular shape
 * @param {{eventList: [{name: string, date: string, categories: [string], imageURI: string, target: string}] }} props 
 */
const EventTileTable = ({eventList, language}) => {

    /**
     * Returns an array with arrays of the given size.
     *
     * @param myArray {Array<Grid.Column>} array of columns to split
     * @param maxSize {Integer} Maximal size of columns in a row
     */
    function packInRow(myArray, maxSize){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += maxSize) {
            let myChunk = myArray.slice(index, index+maxSize);
            let row = <Grid.Row key={index}>{myChunk}</Grid.Row>
            tempArray.push(row);
        }
        return tempArray;
    }


    const eventTiles = eventList.map( (entryListEntry, index) => (
        <Grid.Column key={index % 3} width="2">
            <EventTile {...entryListEntry} language={language}/>
        </Grid.Column>
    ))
    
    return (
        <Grid columns="1" stackable centered>
            { packInRow(eventTiles, 3)}
        </Grid>
    )
}

export default EventTileTable;