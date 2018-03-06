// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import Overview from '../components/overview';
import SelectorMatrix from '../components/selectorMatrix';



let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';

const locationData = {
    name: 'AwesomeLocation',
    description: loremIpsum,
    rating: 4,
    contactLink: '#',
    moreAboutLink: '#',
    imageLink: '#'
}

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


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* Loading... (TODO) */}
    </div>
)

export const ShowingLocationView = () => {
    return (
        <div style={{marginLeft: '11%', marginRight: '11%'}}>
            <Overview {...locationData}/>
            <SelectorMatrix eventList={eventList} />
        </div>
    )
}

export default class Location extends React.Component{
    
    state = {
        isLoading: false,
    }

    render(){
        return this.state.isLoading ?
            <LoadingView /> :
            <ShowingLocationView />
    }
}