import React from 'react'
import {Link} from 'react-router-dom'
import log from 'loglevel'
import GridRow, { Segment, Container, Button, Divider, Header, Grid } from 'semantic-ui-react'

import {optionLinks} from './index'

export default class OptionView extends React.Component {

    
    render(){
        const lang = this.props.language.options;

        const basePath = this.props.match.url;
        const currentLocation = this.props.location;

        return (
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.options}</Header>
                    <Divider/>

                    <Grid columns={2}>
                        <Grid.Row>
                            {/* Update password */}
                            <Grid.Column>
                                <h4 className="Options_Overview_entry">{lang.newPassword}</h4>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to={{
                                    pathname: `${basePath}/${optionLinks.newPassword}`,
                                    state: {from: currentLocation},
                                }}>
                                    <Button size='mini'>{lang.here}</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                        
                        <Grid.Row>
                            {/* Delete account */}
                            <Grid.Column>
                                <h4 className="Options_Overview_entry">{lang.deleteAccount}</h4>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to={{
                                    pathname: `${basePath}/${optionLinks.deleteAccount}`,
                                    state: {from: currentLocation},
                                }}>
                                    <Button color='red' size='mini'>{lang.here}</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}