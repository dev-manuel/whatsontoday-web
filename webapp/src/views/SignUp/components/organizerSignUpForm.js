import React from 'react'
import log from 'loglevel'
import {Link} from 'react-router-dom'
import {Button, Form, Header, Image, Message, Segment} from 'semantic-ui-react'

import ModalError from '../../../components/modal'
import {organizerSignUp} from '../../../common/api/requests/organizer'


export default class OrganizerSignUpForm extends React.Component {
    
    state = {
        nameValue: '',
        emailValue: '',
        passwordValue: '',
        repeatPasswordValue: '',
        acceptedTermsValue: false,
        
        nameError: false,
        emailError: false,
        acceptedTermsError: false,
        passwordError: false,
        repeatPasswordError: false,
        userAlreadyExistsError: false,

        showModalError: false,
    }

    handleSubmit(){

        const validationErrors = {
            emailError: false,
            acceptedTermsError: false,
            passwordError: false,
            repeatPasswordError: false,
            userAlreadyExistsError: false,
        }
        
        // // When no error will occur during the api request no error will displayed
        // if(readyToSubmitRegistrationRequest){
            const {
                emailValue,
                passwordValue,
                nameValue,
            } = this.state;
            organizerSignUp(emailValue, passwordValue, nameValue)
                .then(() => {
                    this.props.onSuccess();
                })
                .catch( err => {
                    log.debug('userSignUp#catch', err);

                    if(!err.response)
                        this.setState({showModalError: true});
                    else
                        switch(err.response.status){

                            // If user already exits, password to short etc...
                            case 400: 
                                // if form inputs are not valid
                                const reqBody = err.response.data;
                                if(reqBody.email)
                                    validationErrors.emailError = true;
                                if(reqBody.email)
                                    validationErrors.emailError = true;
                                if(reqBody.password)
                                    validationErrors.passwordError = true;
                                if(reqBody.message = 'user.exists')
                                    validationErrors.userAlreadyExistsError = true;
                                if(reqBody.acceptedTerms)
                                    validationErrors.acceptedTermsError = true;
                                if(reqBody[''] === 'repeatedPassword')
                                    validationErrors.repeatPasswordError = true;
                                
                                this.setState(validationErrors);
                            break;

                            // On connection errors
                            default:
                                this.setState({showModalError: true});
                            break;
                        }
                })
    }
    

    render(){
        const lang = this.props.language.signUp;
        return (
            <div>
                <ModalError language={this.props.language} show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                <Header color='grey' as='h2' textAlign='center'>
                    {lang.message}
                </Header>
                <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
                    <Segment>
                        <Message negative hidden={!this.state.userAlreadyExistsError}>
                            <Message.Header>{lang.errorHeading}</Message.Header>
                            <p>{lang.userAlreadyExistsError}</p>
                        </Message>
                        <Form.Input
                            error={this.state.nameError}
                            value={this.state.nameValue}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder={lang.organizerNamePlaceholder}
                            onChange={ event => { this.setState({nameValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.state.emailError}
                            value={this.state.emailValue}
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder={lang.email}
                            onChange={ event => { this.setState({emailValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.state.passwordError}
                            value={this.state.passwordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={lang.password}
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Input
                            error={this.state.repeatPasswordError}
                            value={this.state.repeatPasswordValue}                        
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={lang.passwordRepeat}
                            type='password'
                            onChange={ event => { this.setState({repeatPasswordValue: event.target.value}) }}
                        />
                        <Form.Checkbox
                            checked={this.state.acceptedTermsValue}
                            error={this.state.acceptedTermsError}
                            onChange={ () => {this.setState((prevState, props)=>({acceptedTermsValue: !prevState.acceptedTermsValue}))} }
                            label={lang.agree}
                        />
                        <Button color='olive' fluid size='large'>{lang.submit}</Button>
                    </Segment>
                </Form>
                <Message>
                    <Link to='/signup/user'>{lang.signUpAsUser}</Link>
                </Message>
            </div>
        )
    }
}