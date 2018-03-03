import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router'

import ModalError from '../modal'
import {signIn} from '../../common/api/requests/login'

class SignInPanel extends React.Component {

    state = {
        emailValue: '',
        passwordValue: '',
        rememberValue: false,

        showModalError: false,
        showCredentialError: false,
    }


    onSuccess(){
        // Redirects the user to the main page
        this.props.history.push('/');
    }

    handleSubmit(){
        signIn(this.state.emailValue, this.state.passwordValue, this.state.rememberValue)
            .then(token => {
                this.props.setLoginData({
                    loggedIn: true,
                    token,
                    userMail: this.state.emailValue,
                });
                this.onSuccess();
            })
            .catch(err => {
                console.log('Response error:', err.response); 
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
                    {lang.message}
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
                    {lang.newToUs} <a href='signup'>{lang.signUp}</a>
                </Message>
            </div>
        )
    }
}

export default withRouter(SignInPanel);