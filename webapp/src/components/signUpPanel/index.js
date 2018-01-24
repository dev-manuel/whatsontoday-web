import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

import ModalError from '../modal';



class SignUpPanel extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
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


        this.props.global.axios.post('/user/signUp', {
                "firstName": "",
                "lastName": "",
                "email": this.state.emailValue,
                "password": this.state.passwordValue
        }).then( res => {
            this.props.onSuccess();
        }).catch( err => {

            console.log(err);

            if(!err.response)
                this.setState({showModalError: true});
            else
                switch(err.response.status){
                    case 400: // if form inputs are not valid
                        const errors = {
                            emailError: false,
                            passwordError: false,
                            repeatPasswordError: false,
                            acceptError: false,
                        };
                        const reqBody = err.response.data
                        if(reqBody.email)
                            errors.emailError = true;
                        if(reqBody.password)
                            errors.passwordError = true;
                        
                        this.setState(errors);
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
                        <Form.Input
                            error={this.state.repeatPasswordError}
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
                            error={this.state.acceptError}
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