import React from 'react'
import log from 'loglevel'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'

import ModalError from '../../../components/modal'
import {signIn} from '../../../common/api/requests/login'

class SignInPanel extends React.Component {

    state = {
        emailValue: '',
        passwordValue: '',
        rememberValue: false,

        showModalError: false,
        showCredentialError: false,
    }

    handleSubmit(){
        signIn(this.state.emailValue, this.state.passwordValue, this.state.rememberValue)
            .then(data => {
                this.props.setLoginData({
                    loggedIn: true,
                    token: data.token,
                    userMail: this.state.emailValue,
                    isOrganizer: data.userType === 'organizer', // <-- TODO!
                });
            })
            .catch(err => {
                log.debug('signIn#catch:', err); 
                switch(err.response.status){
                    
                    // Wrong Credentials
                    case 401:
                        this.setState({
                            showCredentialError: true,
                        })
                    break;

                    // Other Errors
                    default:
                        this.setState({showModalError: true});
                    break;
                }
        })
    }

    render() {
        const lang = this.props.language.signIn;
        return (
            <div>
                <ModalError language={this.props.language} show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                <Header color='grey' as='h2' textAlign='center'>
                    {this.props.withRedirect ? lang.message : lang.redirectMessage}
                </Header>
                <Form size='large'>
                    <Segment>
                        <Message negative hidden={!this.state.showCredentialError}>
                            <Message.Header>{lang.errorHeading}</Message.Header>
                            <p>{lang.errorDescription}</p>
                        </Message>
                        <Form.Input
                            value={this.state.emailValue}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder={lang.email}
                            onChange={ event => { this.setState({emailValue: event.target.value}) }}
                        />
                        <Form.Input
                            value={this.state.passwordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={lang.password}
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.rememberValue}
                            onChange={ () => {this.setState((prevState, props)=>({rememberValue: !prevState.rememberValue}))} }
                            label={lang.rememberMe}
                        />

                        <Button color='olive' fluid size='large' onClick={this.handleSubmit.bind(this)}>{lang.submit}</Button>
                    </Segment>
                </Form>
                <Message>
                    {lang.newToUs} <Link to='/signup'>{lang.signUp}</Link>
                </Message>
            </div>
        )
    }
}

export default withRouter(SignInPanel);