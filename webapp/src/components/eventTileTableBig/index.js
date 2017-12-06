// Import modules
import React from 'react';
import {Grid, Segment, Container, Card} from 'semantic-ui-react';

// Import resources
import EventTileBig from '../eventTileBig';


const LoremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

// An array of all events which should be displayed as a tile
// the elements of this array must be objects with following fields:
// name: {String} the name of the event displayed in the tile
// date: { Todo: Type..} when does the event take place
// categories: { [String]} list of all categories (hashtags) the event is assigned to
// description: {String} text which is displayed as a description
const events = [
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum},
]


const EventTileTable = () => {

    const bigEventTiles = events.map( (event, index) =>  (
        <EventTileBig key= {index} {...event} />
    ))

    return (
        <div>
            {bigEventTiles}
        </div>
    )
}

export default EventTileTable;