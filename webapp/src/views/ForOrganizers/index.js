import React from 'react'
import {Link} from 'react-router-dom'
import log from 'loglevel'
import { Segment, Container, Button, Divider, Header, Grid, List} from 'semantic-ui-react'

import {optionLinks} from './index'

export default class ForOrganizers extends React.Component {

    
    render(){
        const lang = this.props.language.forOrganizers;

        const basePath = this.props.match.url;
        const currentLocation = this.props.location;

        return (
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.forOrganizers}</Header>
                    <Divider/>

                    <List relaxed>
                        <List.Item>
                            <List.Icon name='write square' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                    <Link
                                        to={{
                                            pathname: '/event_tool/create',
                                            state: {
                                                from: this.props.location,
                                            },
                                        }}
                                    >{lang.createEvent}</Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='marker' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                    <Link
                                        to={{
                                            pathname: '/location_tool/create',
                                            state: {
                                                from: this.props.location,
                                            },
                                        }}
                                    >{lang.crateLocation}</Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='dashboard' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header>
                                    <Link
                                        to={{
                                            pathname: '/event_tool/dashboard',
                                            state: {
                                                from: this.props.location,
                                            },
                                        }}
                                    >{lang.dashboard}</Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </Container>
            </Segment>
        )
    }
}