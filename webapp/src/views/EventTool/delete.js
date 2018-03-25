import React from 'react'
import {Link} from 'react-router-dom'
import log from 'loglevel'
import {Message, Segment, Container, Button} from 'semantic-ui-react'

import DeleteMessage from '../../components/deleteMessage'
import ModalError from '../../components/modal'
import {deleteEvent} from '../../common/api/requests/event'

export default class OptionView extends React.Component {

    state = {
        showModalError: false,
    }

    handleNoClick(){
        let fromLocation;
        if(this.props.location.state && this.props.location.state.from){
            fromLocation = this.props.location.state.from;
        }else{
            fromLocation = '/';
        }

        this.props.history.push(fromLocation);
    }

    handleYesClick(){
        const eventId = this.props.match.params.id;
        log.debug('EventTool#delete#eventId', eventId);

        deleteEvent(eventId)
            .then( data => {
                this.props.history.push(`${this.props.basePath}/successful?topic=delete_event`);
            })
            .catch( error => {
                log.debug('deleteUser#catch', error);
                this.setState({
                    showModalError: true,
                })
            })
    }

    render(){
        const lang = this.props.language.eventTool.delete;

        return (
            <React.Fragment>
                <ModalError
                    show={this.state.showModalError}
                    language={this.props.language}
                    onClose={() => {this.setState({showModalError:false})}}

                />

                <Segment vertical>
                    <Container text>
                        <DeleteMessage
                            language={this.props.language}
                            heading={lang.deleteEventMessage}
                            description={lang.deleteEventDescription}
                            onYesClick={this.handleYesClick.bind(this)}
                            onNoClick={this.handleNoClick.bind(this)}
                        />
                    </Container>
                </Segment>
            </React.Fragment>
        )
    }
}