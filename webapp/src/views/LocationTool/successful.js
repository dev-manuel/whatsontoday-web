import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {parse, stringify} from 'query-string'
import log from 'loglevel'
import {Grid, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'

export default ({language, location}) => {
    const lang = language.eventTool.successful;

    const queryParams = parse(location.search);
    // Select text
    let message = '';
    switch(queryParams.topic){
        case 'create_location':
            message = lang.createLocation;
        break;

        default:
            message = lang.default;
        break;
    }

    const hasFrom = location.state && location.state.from;

    return (
        <Segment
                textAlign="center"
                style={{ minHeight: 600, padding: '5em 0em' }}
                vertical
            >   
                <Container text>
                    <Header
                        as="h2"
                        content={message}
                        style={{ fontSize: '42px', fontWeight: 'normal', marginBottom: 20, marginTop: '3em' }}
                    />
                    <Link
                        to={hasFrom ? location.state.from || '/' : '/'}
                    >
                        <Button
                            color='green'
                            content={lang.goBack}
                        />
                    </Link>
                </Container>
            </Segment>
    )
}