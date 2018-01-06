import React from 'react';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";

class SignInPanel extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            emailValue: '',
            passwordValue: '',
            rememberValue: false,

            emailError: false,
            passwordError: false,
            rememberError: false,
        }
    }

    handleSubmit(){

        // handle validation

        this.props.global.axios.post('/user/signIn', {
            "email": this.state.emailValue,
            "password": this.state.passwordValue,
            "rememberMe": this.state.rememberValue,
        }).then(res => {
            this.props.global.update({
                loggedIn: true,
                token: res.data.token,
            });
            this.props.history.push('/#');
        }).catch(err => {
            //Todo
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Header color='grey' as='h2' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment>
                        <Form.Input
                            error={this.state.emailError}
                            value={this.state.emailValue}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={ event => { this.setState({emailValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.state.passwordError}
                            value={this.state.passwordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.rememberValue}
                            error={this.state.rememberError}
                            onChange={ () => {this.setState((prevState, props)=>({rememberValue: !prevState.rememberValue}))} }
                            label='Remember me'
                        />

                        <Button color='olive' fluid size='large' onClick={this.handleSubmit.bind(this)}>Login</Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#signup'>Sign Up</a>
                </Message>
            </div>
        )
    }
}

export default withRouter( SignInPanel);