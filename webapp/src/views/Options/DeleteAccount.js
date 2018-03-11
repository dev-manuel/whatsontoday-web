import React from 'react'
import {Link} from 'react-router-dom'
import {Message, Segment, Container, Button} from 'semantic-ui-react'

import ModalError from '../../components/modal'
import {deleteUser} from '../../common/api/requests/login'

export default class OptionView extends React.Component {

    state = {
        showModalError: false,
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
                console.log(error);
                this.setState({
                    showModalError: true,
                })
            })
    }

    render(){
        const lang = this.props.language.options;

        let fromLocation;
        if(this.props.location.state && this.props.location.state.hasOwnProperty('from')){
            fromLocation = this.props.location.state.from;
        }else{
            fromLocation = '/';
        }

        const messageContent = (
            <div>
                <p>{lang.deleteAccountDescription}</p>
                <Link to={fromLocation}>
                    <Button floated='left' color='green' size='tiny'>{lang.no}</Button>
                </Link>
                <Button 
                    floated='right'
                    color='red'
                    size='tiny'
                    onClick={this.handleAccountDeletion.bind(this)}
                >
                    {lang.yes}
                </Button>
            </div>
        )

        return (
            <React.Fragment>

                <ModalError
                    show={this.state.showModalError}
                    language={this.props.language}
                    onClose={() => {this.setState({showModalError:false})}}
                />

                <Segment vertical>
                    <Container text>
                        <Message 
                            negative
                            icon='exclamation triangle'
                            header={lang.deleteAccountMessage}
                            content={messageContent}                
                        />
                    </Container>
                </Segment>
            </React.Fragment>
        )
    }
}