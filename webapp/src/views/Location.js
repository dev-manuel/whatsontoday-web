// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import Overview from '../components/overview';
import AbstractViewState from '../common/AbstractViewState';
import StatefulView from '../common/StatefulView';
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


export default class Organizer extends StatefulView{
    constructor(props){
        super(props);

        this.state = {
            viewState: new ShowingState(this)
        }
    }
}

//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

class LoadingState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        //Todo
    }
}

class ShowingState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
                <Overview {...locationData}/>
                <SelectorMatrix eventList={eventList} />
            </div>
        )
    }
}

class ErrorState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        //Todo
    }
}