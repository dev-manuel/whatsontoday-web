import React from 'react'
import {Table, Segment, Container, Icon, Header, Divider} from 'semantic-ui-react'

import DashboardTable from './components/dashboardTable'

export default class Dashboard extends React.Component {

    state = {
        eventList: [],
    }

    componentDidMount(){
        // Todo...
    }

    render(){

        const {
            eventList,
        } = this.state;

        return (

            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{'Dashboard'}</Header>
                    <Divider/>
                    <DashboardTable
                        eventList={eventList}
                        basePath={this.props.basePath}
                    />
                </Container>
            </Segment>
        )
    }
}