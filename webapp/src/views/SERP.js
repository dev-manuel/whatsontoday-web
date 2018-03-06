import React from 'react'
import {withRouter} from 'react-router'
import {parse} from 'query-string'

import './SERP.less'
import FilterPanel from '../components/filterPanel'
import EventTileTableBig from '../components/eventTileTableBig'
import {searchEvents} from '../common/api/requests/event'


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* Loading... (TODO) */}
    </div>
)

export const ShowingEvents = ({eventList, language}) => (
    <div className="pageContent">
        {/* <FilterPanel global={global}/> */}
        <div className="tileTable">
            <EventTileTableBig eventList={eventList} language={language}/>
        </div>
    </div>
)

class SERP extends React.Component{
    
    state = {
        isLoading: true,
        eventList: [],
        
    }

    componentDidMount(){

        // "Subscribing" to determine if the url (especially the query params) have changes and 
        // then requesting the new event data according to the query params
        // See https://stackoverflow.com/questions/45373742/detect-route-change-with-react-router
        this.unlisten = this.props.history.listen((location, action) => {
            this.requestPageData(location);
        });

        // Initial event data request
        this.requestPageData(this.props.history.location);
    }

    // "Unsubscribe"
    componentWillUnmount() {
        this.unlisten();
    }


    requestPageData(location){
        // Getting query-parameter from url
        const {search} = parse(location.search );

        this.setState(() => ({
            isLoading:true,
        }))

        // Sending AJAX api request to receive event data
        searchEvents(0, search)
            .then( eventList => {
                this.setState( () => ({
                    eventList,
                    isLoading: false,
                }));
            }).catch( error => {
                console.log(error);
            })
    }

    render() {
        if(this.state.isLoading){
            return <LoadingView/>
        }else{
            return <ShowingEvents
                eventList={this.state.eventList}
                language={this.props.language}
            />
        }
    }
}


export default withRouter(SERP);