import React from 'react'
import {withRouter} from 'react-router'
import {parse, stringify} from 'query-string'
import {Grid, Pagination } from 'semantic-ui-react'

import './SERP.less'
import FilterPanel from '../components/filterPanel'
import EventTileTableBig from '../components/eventTileTableBig'
import {searchEvents, sortDirection as SortDirectionEnum, sort as SortEnum} from '../common/api/requests/event'


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        Loading...
    </div>
)

export const NoResultsView = () => {
    return (
        <div style={{marginLeft: '11%', marginRight: '11%'}}>
            Wir haben leider keine Ergebnisse für deine Suche finden können...
        </div>
    )
}

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
        categories: [],
        sortDirection: SortDirectionEnum.ASCENDING,
        sort: SortEnum.ID,
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

    parseQueryParams({categories, search, page, page_size, sort, sort_direction}){
        
        let parsedCategories = [];
        if(typeof categories !== 'undefined'){ 
            parsedCategories = categories;
        }

        let parsedSearch = '';
        if(typeof search !== 'undefined'){ 
            parsedSearch = search;
        }


        let parsedPage; // The parsed (integer) version of page
        if(typeof page === 'undefined'){ // Check if page property is defined inside the query params, otherwise fallback to default=1
            parsedPage = 1;
        }else{
            parsedPage = parseInt(page);
            // If page query-string is no valid integer (fallback to default=1)
            if(isNaN(parsedPage))
                parsedPage = 1;
        }

        let parsedPageSize; // The parsed (integer) version of page_size
        if(typeof page_size === 'undefined'){ // Check if page_size property is defined inside the query params, otherwise fallback to default=20
            parsedPageSize = 20;
        }else{
            parsedPageSize = parseInt(page_size);
            // If page query-string is no valid integer (fallback to default=20)
            if(isNaN(parsedPageSize))
                parsedPageSize = 20;
        }

        let parsedSort = '';
        switch(sort){
            case 'id':
                parsedSort = SortEnum.ID;
            break;

            case 'from':
                parsedSort =  SortEnum.FROM;
            break;

            case 'to':
                parsedSort =  SortEnum.TO;
            break;

            case 'name':
                parsedSort =  SortEnum.NAME;
            break;

            case 'location':
                parsedSort =  SortEnum.LOCATION;
            break;

            case 'rating':
                parsedSort =  SortEnum.RATING;
            break;

            default:
                parsedSort = SortEnum.ID;    
            break;
        }

        let parsedSortDirection = '';
        switch(sort_direction){
            case 'ascending':
                parsedSortDirection = SortDirectionEnum.ASCENDING;
            break;

            case 'descending':
                parsedSortDirection =  SortDirectionEnum.DESCENDING;
            break;

            default:
                parsedSortDirection = SortDirectionEnum.ASCENDING;    
            break;
        }
        
        return {
            parsedCategories,
            parsedSearch,
            parsedPage,
            parsedPageSize,
            parsedSort,
            parsedSortDirection,
        }
    }


    requestPageData(location){
        this.setState(() => ({
            isLoading:true,
        }))

        // Getting query-parameter from url ad parse it!
        const queryParams = parse(location.search);
        const {
            parsedCategories,
            parsedSearch,
            parsedPage,
            parsedPageSize,
            parsedSort,
            parsedSortDirection
        } = this.parseQueryParams(queryParams);

        // Sending AJAX api request to receive event data
        // Page starts to count with 0, (parsedPage with 1) so we have to subtract one
        searchEvents(0, parsedSearch, parsedSortDirection, parsedSort, parsedPage-1, parsedPageSize)
            .then( resultObject => {
                this.setState( () => ({
                    eventList: resultObject.eventList,
                    itemNumber: resultObject.itemNumber,
                    
                    // Update REST parameter inside the state (for easier access)
                    sortDirection: parsedSortDirection,
                    sort: parsedSort,
                    pageSize: parsedPageSize,
                    page: parsedPage,

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

        // Update the page property of the query parameters
        queryParams.page = newPage;

        this.props.history.push({
            pathname,
            search: stringify(queryParams),
        })
    }

    render() {
        if(this.state.isLoading){
            return <LoadingView/>
        }else{
            // Check if received no results
            if(this.state.eventList.length === 0){
                return <NoResultsView />
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
}


export default withRouter(SERP);