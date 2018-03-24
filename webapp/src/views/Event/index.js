import React from 'react'
import {Grid, Rating} from 'semantic-ui-react'

import {readEvent} from '../../common/api/requests/event'
import EventOverview from './components/eventOverview'
import EventDetails from './components/eventDetails'
import LocationDetails from './components/locationDetails'
import OrganizerDetails from './components/organizerDetails'
import EventRecommender from '../../components/eventRecommender'
import exampleTileImage from '../../img/example_tile.png'

/**
 * @typedef {{name: string, rating: number, description: string, from: Date, to: Date, categories: [string]}} eventData
 */

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

export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* Loading... (TODO) */}
    </div>
)

export const ShowingEventData = ({language, eventData}) => {
    
    const langData = {language};
    return (
        <div style={{marginLeft: '11%', marginRight: '11%'}}>
            <EventOverview {...eventData} {...langData}/>
            {/* <EventDetails {...eventData} {...langData}/> */}
            {/* <LocationDetails {...locationData} {...langData}/>
            <OrganizerDetails {...organizerData} {...langData}/>
            <EventRecommender eventList={recommenderData} {...langData}/> */}
        </div>
    )
}
    

export default class Event extends React.Component{
    
    state = {
        isLoading: true,

        /**
         * @type {eventData}
         */
        eventData: null,
        organizerData: null,
        locationData: null,
    }

    componentDidMount(){
        const eventId = this.props.match.params.id;

        readEvent(eventId)
            .then( eventData => {
                this.setState({
                    eventData,
                    isLoading: false,
                })
            }).catch(error => {
                // Todo
            })
    }

    render(){
        if(this.state.isLoading){
            return <LoadingView/>
        }else{
            return <ShowingEventData eventData={this.state.eventData} language={this.props.language}/>
        }
    }

}
    
