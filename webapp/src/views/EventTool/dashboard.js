import React from 'react'
import log from 'loglevel'
import {Table, Segment, Container, Icon, Header, Divider, Pagination} from 'semantic-ui-react'

import ConditionalHide from '../../components/conditionalHide'
import FormNavigationBar from '../../components/formNavigationBar'
import {getOwnEvents} from '../../common/api/requests/organizer'
import DashboardTable from './components/dashboardTable'

import './dashboard.less'

export default class Dashboard extends React.Component {

    state = {
        isUnauthorized: false,
        isFetching: true,
        eventList: [],
        activePage: 1,
        pageSize: 20,
        itemNumber: 1,
    }

    fetchEvents(page){
        const {pageSize} = this.state;
        getOwnEvents(page-1, pageSize)
            .then(eventData => {
                this.setState({
                    itemNumber: eventData.itemNumber,
                    activePage: page,
                    isFetching: false,
                    eventList: eventData.events.map(event => ({
                        id: event.id,
                        name: event.name,
                    }))
                })
            })
            .catch(error => {
                log.debug('EventTool#dashboard#catch', error);

                switch(error.response.status){
                    case 401: // Unauthorized
                        this.setState({
                            isUnauthorized: true,
                        })
                    break;

                    default:
                    break;
                }
            })
    }

    componentDidMount(){
        const {activePage} = this.state;
        this.fetchEvents(activePage);
    }

    handleBackClick(){
        this.props.history.push(
            this.props.location.state.from || '/'
        )
    }

    handlePageSelection(e, {activePage}){
        console.log(activePage);
        this.setState({
            isFetching: true,
        })
        this.fetchEvents(activePage);
        // window.scrollTo(window.scrollX, 0);
    }

    render(){

        const {
            eventList,
            page,
            pageSize,
            itemNumber,
        } = this.state;
        const {
            language,
            location,
        } = this.props

        const hasFrom = location.state && location.state.from;
        const hasNoPagination = eventList.length === 0;
        const lang = language.eventTool.dashboard;
        const pageNumber = Math.ceil(itemNumber / pageSize);

        return (

            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.dashboard}</Header>
                    <Divider/>
                    <DashboardTable
                        eventList={eventList}
                        basePath={this.props.basePath}
                        language={language}
                    />
                    
                    <ConditionalHide hide={hasNoPagination}>
                        <div className="EventTool_dashboard_pagination">
                            <Pagination
                                activePage={page}
                                totalPages={pageNumber}
                                onPageChange={this.handlePageSelection.bind(this)}
                            />
                        </div>
                    </ConditionalHide>
                    <FormNavigationBar
                        backText={lang.back}
                        hideNext
                        hideBack={!hasFrom}
                        onBackClicked={this.handleBackClick.bind(this)}
                    />
                </Container>
            </Segment>
        )
    }
}