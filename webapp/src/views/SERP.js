import React from 'react'
import {withRouter} from 'react-router'
import {parse, stringify} from 'query-string'
import {Grid, Pagination } from 'semantic-ui-react'

import './SERP.less'
import FilterPanel from '../components/filterPanel'
import EventTileTableBig from '../components/eventTileTableBig'
import {searchEvents, sortDirection, sort} from '../common/api/requests/event'


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* Loading... (TODO) */}
    </div>
)

export const ShowingEvents = ({eventList, language, itemNumber, page, pageSize, onPageChange}) => {

    const pageNumber = Math.ceil(itemNumber / pageSize);

    return (
        <div className="pageContent">
            {/* <FilterPanel global={global}/> */}
            <div className="tileTable">
                <EventTileTableBig itemNumber={itemNumber} eventList={eventList} language={language}/>

                <Grid centered columns={3}>
                    <Grid.Column centered>
                        {/* Page has offset of one */}
                        <Pagination
                            activePage={page}
                            totalPages={pageNumber}
                            onPageChange={onPageChange}
                        />   
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    )
}

class SERP extends React.Component{
    
    state = {

        isLoading: true,

        // REST response data
        eventList: [],
        itemNumber: null,

        // Request config
        sortDirection: sortDirection.ASCENDING,
        sort: sort.ID,
        pageSize: 20,
        page: 1,
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

        const {search, page} = parse(location.search);

        let intPage; // The parsed (integer) version of page

        // Check if page property is defined inside the query params, otherwise fallback to default=1
        if(typeof page === 'undefined'){
            intPage = 1;
        }else{
            intPage = parseInt(page);
            // If page query-string is no valid integer (fallback to default=1)
            if(isNaN(intPage))
                intPage = 1;
        }

        this.setState(() => ({
            isLoading:true,
        }))

        // Sending AJAX api request to receive event data
        // Page starts to count with 0, (intPage with 1) so we have to subtract one
        searchEvents(0, search, this.state.sortDirection, this.state.sort, intPage-1, this.state.pageSize)
            .then( resultObject => {
                this.setState( () => ({
                    eventList: resultObject.eventList,
                    itemNumber: resultObject.itemNumber,
                    
                    page: intPage,

                    isLoading: false,
                }));
            }).catch( error => {
                console.log(error);
            })
    }

    handlePageSelection( newPage){

        const pathname = this.props.location.pathname;

        // Getting the query params as object
        const queryParams = parse(this.props.location.search);

        console.log(queryParams);
        queryParams.page = newPage
    
        this.props.history.push({
            pathname,
            search: stringify(queryParams),
        })
    }

    render() {
        if(this.state.isLoading){
            return <LoadingView/>
        }else{

            return <ShowingEvents
                eventList={this.state.eventList}
                language={this.props.language}
                itemNumber={this.state.itemNumber}
                page={this.state.page}
                pageSize={this.state.pageSize}
                onPageChange={(e, {activePage}) => {this.handlePageSelection(activePage)}}
            />
        }
    }
}


export default withRouter(SERP);