import React from 'react'
import {Link} from 'react-router-dom'
import log from 'loglevel'
import {Message, Segment, Container, Button} from 'semantic-ui-react'

import DeleteMessage from '../../components/deleteMessage'
import ModalError from '../../components/modal'
import {deleteUser} from '../../common/api/requests/login'

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

    handleAccountDeletion(){
        deleteUser()
            .then( data => {
                this.props.setLoginData({
                    loggedIn: false,
                    token: null,
                    userMail: null,
                }, '/')
            })
            .catch( error => {
                log.debug('deleteUser#catch', error);
                this.setState({
                    showModalError: true,
                })
            })
    }

    render(){
        const lang = this.props.language.options;

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
                            heading={lang.deleteAccountMessage}
                            description={lang.deleteAccountDescription}
                            onYesClick={this.handleAccountDeletion.bind(this)}
                            onNoClick={this.handleNoClick.bind(this)}
                        />
                    </Container>
                </Segment>
            </React.Fragment>
        )
    }
}