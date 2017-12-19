// Import modules
import React from 'react';

// Import resources
import './SERP.less'
import FilterPanel from '../components/filterPanel';
import EventTileTableBig from '../components/eventTileTableBig';


const LoremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const eventList = [
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', categories: ['#Business'], description: LoremIpsum, imageURI:'#', target: '#'},
    
]

const SERP = () => (
        <div className="pageContent">
            <FilterPanel/>
            <div className="tileTable">
                <EventTileTableBig eventList={eventList}/>
            </div>
        </div>
)

export default SERP;