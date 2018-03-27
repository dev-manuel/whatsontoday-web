import React from 'react'
import log from 'loglevel'
import {Table, Segment, Container, Icon, Header, Divider} from 'semantic-ui-react'

import FormNavigationBar from '../../components/formNavigationBar'
import {getOwnEvents} from '../../common/api/requests/organizer'
import DashboardTable from './components/dashboardTable'

export default class Dashboard extends React.Component {

    state = {
        isUnauthorized: false,
        isFetching: true,
        eventList: [],
    }

    componentDidMount(){
        getOwnEvents()
            .then(eventData => {
                this.setState({
                    isFetching: false,
                    eventList: eventData.map(event => ({
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

    handeleBackClick(){
        this.props.history.push(
            this.props.location.state.from || '/'
        )
    }

    render(){

        const {
            eventList,
        } = this.state;
        const {
            language,
            location,
        } = this.props

        const hasFrom = location.state && location.state.from;
        const lang = language.eventTool.dashboard;

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
                    <FormNavigationBar
                        backText={lang.back}
                        hideNext
                        hideBack={!hasFrom}
                        onBackClicked={this.handeleBackClick.bind(this)}
                    />
                </Container>
            </Segment>
        )
    }
}