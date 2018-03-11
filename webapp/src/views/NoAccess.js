import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {parse} from 'query-string'
import {Grid, Pagination, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'
import log from 'loglevel'



export const NoAccessMessage = ({message, language}) => {
    const lang = language.noAccess;

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
                        content={message}
                        style={{ fontSize: '42px', fontWeight: 'normal', marginBottom: 20, marginTop: '3em' }}
                    />
                    <Link to='/'>
                        <Button size='huge' color='teal'>
                            <Icon name='home' />
                            {lang.backToHome}
                        </Button>
                    </Link>
                </Container>
            </Segment>
        </div>
    )
}

class NoAccess extends React.Component {
    render(){
        const lang = this.props.language.noAccess;

        const queryParams = parse(this.props.history.location.search);
        log.debug('NoAccess#queryParams', queryParams);
        const reason = queryParams.reason;

        switch(reason){
            case 'organizer':
                return <NoAccessMessage message={lang.organizer} language={this.props.language}/>
            break;

            default:
                return <NoAccessMessage message={lang.default} language={this.props.language}/>
            break;
        }

    }
}

export default withRouter(NoAccess);
