// Import modules
import React from 'react';

// Import resources
import Header from '../components/header';
import Slider from '../components/slider';
import CategoryTileTable from '../components/categoryTileTable';
import EvenTileTable from '../components/eventTileTable';
import exampleTileImage from '../img/example_tile.png';


const categoryList = [
    {name: 'StartUp', imageURI: exampleTileImage, target: '#'},
    {name: 'Wissenschaft', imageURI: exampleTileImage, target: '#'},
    {name: 'Party', imageURI: exampleTileImage, target: '#'},
    {name: 'Feste', imageURI: exampleTileImage, target: '#'},
    {name: 'Kultur', imageURI: exampleTileImage, target: '#'},
]

const eventList = [
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},
    {name: 'StartUpWeekend', date: '17. Nov. 2017', catagories: ['#Business'], imageURI: '#', target: '#'},    
]

const Home = ({global}) => (
        // Todo: Use dictionary!
        <div>
            <Slider title='Education' global={global}/>
            <CategoryTileTable categoryList={categoryList} global={global}/>
            <EvenTileTable eventList={eventList} global={global}/>
        </div>
)

export default Home;