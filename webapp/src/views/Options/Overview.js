import React from 'react'
import {Link} from 'react-router-dom'
import {Segment, Container, Button, Divider, Header} from 'semantic-ui-react'

export default class OptionView extends React.Component {

    render(){
        console.log(this.props.language);
        const lang = this.props.language.options;
        return (
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.options}</Header>
                    <Divider/>

                    <div>
                        <h4 className="Options_Overview_entry">{lang.newPassword}</h4>
                        <Link to={{
                            pathname: `${this.props.match.url}/new_password`,
                            state: {from: this.props.location},
                        }}>
                            <Button size='mini'>{lang.here}</Button>
                        </Link>
                    </div>
                </Container>
            </Segment>
        )
    }
}