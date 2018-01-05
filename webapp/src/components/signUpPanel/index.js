import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

import ModalError from './modal';



class SignUpPanel extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showSuccess: false,

            emailValue: '',
            emailError: false,
            passwordValue: '',
            passwordError: false,
            repeatPasswordValue: '',
            repeatPasswordError: false,
            acceptValue: false,
            acceptError: false,

            showModalError: false
        }
    }


    /**
     * 
     * @param {string} mailAddress
     * @param {boolean} if email address is valid
     */
    validateEmail( mailAddress){
        // http://emailregex.com/
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(mailAddress);
    }

    /**
     * 
     * @param {*} password 
     * @returns {boolean}
     */
    validatePassword( password){
        return true; // Todo
    }

    handleSubmit(){
        let success = true;
        let errors = {
            emailError: false,
            passwordError: false,
            repeatPasswordError: false,
            acceptError: false,
        };

        // Check if email is valid
        const email = this.state.emailValue;
        if(!this.validateEmail(email)){
            errors.emailError = true;
            success = false;
        }

        // Check if password is valid
        const password = this.state.passwordValue;
        if(!this.validatePassword(password)){
            errors.passwordError = true;
            success = false;
        }

        // Check if repeat-password is valid
        const repeatPassword = this.state.repeatPasswordValue;
        if( repeatPassword !== password){
            errors.repeatPasswordError = true;
            success = false
        }

        // Check if (accept) checkbox is valid        
        const accept = this.state.acceptValue;
        if(!accept){
            errors.acceptError = true;
            success = false;
        }

        this.setState(errors);
        if(success){
            this.props.global.axios.post('/user/signUp', {
                    "firstName": "",
                    "lastName": "",
                    "email": this.state.emailValue,
                    "password": this.state.passwordValue
            }).then( res => {
                this.setState({showSuccess: true});
                this.props.global.update({
                    loggedIn: true,
                    token: res.data.token,
                });
            }).catch( err => {
                //console.log(err);
                this.setState({showModalError: true});
            })
        }
    }
    
    
    
    
    render(){
        if(this.state.showSuccess){
            return (
                <Header color='grey' as='h1' textAlign='center'>
                    Registration successful
                </Header>
            )
        } else {
            return (
                <div>
                    <ModalError show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                    <Header color='grey' as='h2' textAlign='center'>
                        SignUp to WhatsOn
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
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
                        <Form.Input
                            error={this.state.repeatPasswordError}
                            value={this.state.repeatPasswordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Repeat password'
                            type='password'
                            onChange={ event => { this.setState({repeatPasswordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.acceptValue}
                            error={this.state.acceptError}
                            onChange={ () => {this.setState((prevState, props)=>({acceptValue: !prevState.acceptValue}))} }
                            label='I agree to the Terms and Conditions'
                        />
                        <Button color='olive' fluid size='large'>Let's go!</Button>
                        </Segment>
                    </Form>
                </div>
            )
        }
    }

}

export default SignUpPanel;