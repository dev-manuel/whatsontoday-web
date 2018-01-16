// Import modules
import React from 'react'
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import StatefulView from '../common/StatefulView';
import AbstractViewState from '../common/AbstractViewState';
import EventOverview from '../components/eventOverview';
import EventDetails from '../components/eventDetails';
import LocationDetails from '../components/locationDetails';
import OrganizerDetails from '../components/organizerDetails';
import EventRecommender from '../components/eventRecommender';
import exampleTileImage from '../img/example_tile.png';



let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';

const eventData = {
    name: 'CoolEvent',
    date: '29. September 2018 (Samstag)',
    rating: 3,
    description: loremIpsum,
    categories: ['#Business'],

    descriptionLong: loremIpsum + loremIpsum +loremIpsum,
    price: '10€',
    locationName: 'AwesomeLocation',
    extraInformation: 'TL;DR',
}

const organizerData = {
    name: 'AwesomeOrganizer',
    description: loremIpsum,
    rating: 4,
    contactLink: '#',
    moreAboutLink: '#',
    imageURI: '#'
}

const locationData = {
    name: 'CoolLocation',
    rating: 4,
    description: loremIpsum,
    target: '#',
    address: {}}

const recommenderData = [
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        {name: 'CoolEventOne', imageURI: exampleTileImage, target: '#'},
        
    ]

export default class Event extends StatefulView{
    
    constructor(props){
        super(props);

        this.state = {
            viewState: new ShowingState(this),
        }
    }
}

//
// ─── VIEW-STATES ────────────────────────────────────────────────────────────────
//

// Todo
class LoadingState extends AbstractViewState{
    
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
    render() {
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
                <EventOverview {...eventData}/>
                <EventDetails {...eventData}/>
                <LocationDetails {...locationData}/>
                <OrganizerDetails {...organizerData}/>
                <EventRecommender eventList={recommenderData}/>
            </div>
        )
    }
}

// Todo
class ErrorState extends AbstractViewState{
    
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
    
