import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {parse, stringify} from 'query-string'
import log from 'loglevel'
import {Grid, Pagination, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'

import './Search.less'
import FilterPanel from '../../components/filterPanel'
import EventTileTableBig from './components/eventTileTable'
import {searchEvents, sortDirection as SortDirectionEnum, sort as SortEnum} from '../../common/api/requests/event'


export const LoadingView = () => (
    <div style={{marginLeft: '11%', marginRight: '11%'}}>
        {/* TODO: LoadingView */}
    </div>
)

export const NoResultsView = ({language}) => {
    const lang = language.serp;
    return (
        <div>
            <Segment
                textAlign="center"
                style={{ minHeight: 600, padding: '5em 0em' }}
                vertical
            >   
                <Container text>
                    <Header
                        as="h2"
                        content={lang.noResults}
                        style={{ fontSize: '42px', fontWeight: 'normal', marginBottom: 20, marginTop: '3em' }}
                    />
                    {/* Maybe feature some events here */}
                </Container>
            </Segment>
        </div>
    )
}

export const ShowingEvents = ({eventList, language, itemNumber, page, pageSize, onPageChange}) => {

    const pageNumber = Math.ceil(itemNumber / pageSize);

    return (
        <div className="Search_pageContent">
            {/* <FilterPanel global={global}/> */}
            <div className="Search_tileTable">
                <EventTileTableBig itemNumber={itemNumber} eventList={eventList} language={language}/>

                {/* Page has offset of one */}
                <div className="Search_pagination">
                    <Pagination
                        activePage={page}
                        totalPages={pageNumber}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

class SERP extends React.Component{
    
    state = {

        showLoadingView: true,
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
        const parsedQueryParams = this.parseQueryParams(queryParams);
        log.debug('Search#requestPageData#parsedQueryParams', parsedQueryParams);
        const {
            parsedCategories,
            parsedSearch,
            parsedPage,
            parsedPageSize,
            parsedSort,
            parsedSortDirection
        } = parsedQueryParams;

        // Sending AJAX api request to receive event data
        // Page starts to count with 0, (parsedPage with 1) so we have to subtract one
        searchEvents(parsedCategories, parsedSearch, parsedSortDirection, parsedSort, parsedPage-1, parsedPageSize)
            .then( resultObject => {
                this.setState( () => ({
                    eventList: resultObject.eventList,
                    itemNumber: resultObject.itemNumber,
                    
                    // Update REST parameter inside the state (for easier access)
                    sortDirection: parsedSortDirection,
                    sort: parsedSort,
                    pageSize: parsedPageSize,
                    page: parsedPage,

                    showLoadingView: false,
                    isLoading: false,
                }));
            }).catch( error => {
                log.debug('searchEvents#catch', error);
            })
    }

    /**
     * Scrolls up to the top side of the page
    */
    scrollToTop(){
        window.scrollTo(window.scrollX, 0);
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
        if(this.state.showLoadingView){
            return <LoadingView/>
        }else{
            // Check if received no results
            if(this.state.eventList.length === 0){
                return <NoResultsView language={this.props.language}/>
            }else{
                return <ShowingEvents
                    eventList={this.state.eventList}
                    itemNumber={this.state.itemNumber}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    onPageChange={(e, {activePage}) => {
                        this.handlePageSelection(activePage);
                        this.scrollToTop();
                    }}
                    language={this.props.language}
                />
            }
        }
    }
}


export default withRouter(SERP);