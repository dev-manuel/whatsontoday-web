// Import modules
import React from 'react';

// Import resources
import './SERP.less'
import FilterPanel from '../components/filterPanel';
import EventTileTableBig from '../components/eventTileTableBig';
import StatefulView from '../common/StatefulView';
import AbstractViewState from '../common/AbstractViewState';


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

export default class SERP extends StatefulView{
    constructor(props){
        super(props);

        this.state = {
            viewState: new ShowingState(this),
        }
    }
}

//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

// Todo

class LoadingState extends AbstractViewState{

    constructor(context){
        super(context);
    }

    /**
     * @override
     */
    render() {
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
                This View is loading!
            </div>
        )
    }
}

class ShowingState extends AbstractViewState{
    /**
     * @override
     */
    render(){
        return (
            <div className="pageContent">
                <FilterPanel/>
                <div className="tileTable">
                    <EventTileTableBig eventList={eventList}/>
                </div>
            </div>
        )
    }
}

// Todo
class ErrorState extends AbstractViewState{
    constructor(context){
        super(context);
    }
    
    /**
     * @override
     */
    render() {
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
                An error occurred!
            </div>
        )
    }
}