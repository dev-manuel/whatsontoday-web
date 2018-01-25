import React from 'react';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';

import ModalError from '../modal';

export default class SignInPanel extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            emailValue: '',
            passwordValue: '',
            rememberValue: false,

            emailError: false,
            passwordError: false,
            rememberError: false,
            showModalError: false,
        }
    }

    handleSubmit(){
        this.props.global.axios.post('/login/signIn', {
            "email": this.state.emailValue,
            "password": this.state.passwordValue,
            "rememberMe": this.state.rememberValue,
        }).then(res => {
            this.props.global.update({
                loggedIn: true,
                token: res.data.token,
            });
            this.props.onSuccess();
        }).catch(err => {
            console.log('Response error:', err.response);
            
            if(!err.response)
                this.setState({showModalError: true});
            else
                switch(err.response.status){
                    case 404:
                        this.props.onCredentialError();
                    break;
                    default:
                        this.setState({showModalError: true});
                    break;
                }
        })
    }

    render() {
        const LANG = this.props.global.LANG.signIn;
        return (
            <div>
                <ModalError global={this.props.global} show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                <Header color='grey' as='h2' textAlign='center'>
                    {LANG.message}
                </Header>
                <Form size='large'>
                    <Segment>
                        <Message negative hidden={!this.props.showCredentialError}>
                            <Message.Header>{LANG.errorHeading}</Message.Header>
                            <p>{LANG.errorDescription}</p>
                        </Message>
                        <Form.Input
                            error={this.state.emailError}
                            value={this.state.emailValue}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder={LANG.email}
                            onChange={ event => { this.setState({emailValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.state.passwordError}
                            value={this.state.passwordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={LANG.password}
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.rememberValue}
                            error={this.state.rememberError}
                            onChange={ () => {this.setState((prevState, props)=>({rememberValue: !prevState.rememberValue}))} }
                            label={LANG.rememberMe}
                        />

                        <Button color='olive' fluid size='large' onClick={this.handleSubmit.bind(this)}>{LANG.submit}</Button>
                    </Segment>
                </Form>
                <Message>
                    {LANG.newToUs} <a href='#signup'>{LANG.signUp}</a>
                </Message>
            </div>
        )
    }
}