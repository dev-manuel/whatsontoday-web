import React from 'react'
import log from 'loglevel'
import { Grid, Rating, Divider} from 'semantic-ui-react'

import {readEvent} from '../../common/api/requests/event'
import EventOverview from './components/eventOverview'
import EventDetails from './components/eventDetails'
import LocationDetails from './components/locationDetails'
import OrganizerDetails from './components/organizerDetails'
import EventRecommender from '../../components/eventRecommender'
import exampleTileImage from '../../img/example_tile.png'

import './Event.less'


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* Loading... (TODO) */}
    </div>
)

export const ShowingEventData = ({language, eventData}) => {
    
    const langData = {language};
    log.debug('Event#eventData', eventData);
    return (
        <div style={{marginLeft: '11%', marginRight: '11%'}}>
            <EventOverview {...eventData} {...langData}/>
            {/* <EventDetails {...eventData} {...langData}/> */}
            {/* <Divider/> */}
            <LocationDetails {...eventData.location} {...langData}/>
            {/* <OrganizerDetails {...organizerData} {...langData}/>
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
            return (
                <div className="Event_container">
                    <ShowingEventData eventData={this.state.eventData} language={this.props.language}/>
                </div>
            )
        }
    }

}
    
