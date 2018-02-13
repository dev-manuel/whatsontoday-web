import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

import ModalError from '../modal'
import {api} from '../../common/api'


class SignUpPanel extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: '',
            repeatPasswordValue: '',
            acceptValue: false,
            
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
    
        
        /*
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
        */

        api.userSignUp(this.state.emailValue, this.state.passwordValue)
            .then( () => {
                this.props.onSuccess();
            })
            .catch( err => {
                console.log(err);

                if(!err.response)
                    this.setState({showModalError: true});
                else
                    switch(err.response.status){
                        case 400: // if form inputs are not valid
                            const errors = {};
                            const reqBody = err.response.data;
                            if(reqBody.email)
                                errors.emailError = true;
                            if(reqBody.password)
                                errors.passwordError = true;
                            if(reqBody.message = 'user.exists')
                                errors.userAlreadyExistsError = true;
                            
                            this.props.onCredentialErrors(errors);
                        break;
                        default:
                            this.setState({showModalError: true});
                        break;
                    }
        })
    }
    
    
    
    
    render(){
        const LANG = this.props.global.LANG.signUp;
        return (
            <div>
                <ModalError global={this.props.global} show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                <Header color='grey' as='h2' textAlign='center'>
                    {LANG.message}
                </Header>
                <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
                    <Segment>
                        <Message negative hidden={!this.props.credentialErrors.userAlreadyExistsError}>
                            <Message.Header>{LANG.errorHeading}</Message.Header>
                            <p>{LANG.userAlreadyExistsError}</p>
                        </Message>
                        <Form.Input
                            error={this.props.credentialErrors.emailError}
                            value={this.state.emailValue}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder={LANG.email}
                            onChange={ event => { this.setState({emailValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.props.credentialErrors.passwordError}
                            value={this.state.passwordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={LANG.password}
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.props.credentialErrors.repeatPasswordError}
                            value={this.state.repeatPasswordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={LANG.passwordRepeat}
                            type='password'
                            onChange={ event => { this.setState({repeatPasswordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.acceptValue}
                            error={this.props.credentialErrors.acceptError}
                            onChange={ () => {this.setState((prevState, props)=>({acceptValue: !prevState.acceptValue}))} }
                            label={LANG.agree}
                        />
                        <Button color='olive' fluid size='large'>{LANG.submit}</Button>
                    </Segment>
                </Form>
            </div>
        )
        
    }

}

export default SignUpPanel;