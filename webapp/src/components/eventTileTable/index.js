// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import EventTile from '../eventTile';


// An array of all events which should be displayed as a tile
// the elements of this array must be objects with following fields:
// name: {String} the name of the event displayed in the tile
// date: { Todo: Type..} when does the event take place
// categories: { [String]} list of all categories (hashtags) the event is assigned to
const events = [
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business']},
]


const EventTileTable = () => {

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


    let eventTiles = events.map( (content, index) => (
        <Grid.Column key={index % 3} width="2">
            <EventTile name={content.name} date={content.date} categories={content.catagories} />
        </Grid.Column>
    ))
    
    return (
        <Grid columns="1" stackable centered>
            { packInRow(eventTiles, 3)}
        </Grid>
    )
}

export default EventTileTable;