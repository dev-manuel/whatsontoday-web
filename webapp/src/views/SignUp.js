import React from 'react'
import {Message, Grid} from 'semantic-ui-react'

import SignUpPanel from '../components/signUpPanel';
import AbstractViewState from '../common/AbstractViewState';
import StatefulView from '../common/StatefulView';

// Inspired by https://react.semantic-ui.com/layouts/login

export default class SignUpView extends StatefulView {

    constructor(props){
        super(props);

        this.state = {
            viewState: props.global.loggedIn ? new AlreadyLoggedInState(this) : new SignUpState(this),
        }
    }
}


//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

/**
 * This class simply provides some methods used by multiple views displaying the sign-in panel
 */
class BaseSignUpPanelViewState extends AbstractViewState{
    
    constructor(props){
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
        this.onCredentialErrors = this.onCredentialErrors.bind(this);

        this.baseCredentialErrors = {
            emailError: false,
            acceptError: false,
            passwordError: false,
            repeatPasswordError: false,
        }
    }

    /**
     * switches the current view state to the SuccessfulSignUpState
     */
    onSuccess(){
        this.context.setState({
            viewState: new SuccessfulSignUpState(this.context),
        })
    }

    /**
     * shows an error message (switches to WrongCredentialsState)
     */
    onCredentialErrors(errors){
        const allErrors = Object.assign({}, this.baseCredentialErrors, errors)

        this.context.setState({
            viewState: new WrongCredentialsState(this.context, allErrors)
        })
    }
}


export class SignUpState extends BaseSignUpPanelViewState{

    /**
     * @override
     */
    render(){
        return (
            <div className='login-form'>
                {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.

                    height: -webkit-calc(100% - 127px);
                        height:    -moz-calc(100% - 127px);
                        height:         calc(100% - 127px);
                    
                */}
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <SignUpPanel 
                            credentialErrors={this.baseCredentialErrors}
                            onSuccess={this.onSuccess}
                            onCredentialErrors={this.onCredentialErrors}
                            global={this.context.props.global}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export class WrongCredentialsState extends BaseSignUpPanelViewState{

    constructor(props, errors){
        super(props);
        this.errors = errors;
    }

    /**
     * @override
     */
    render(){
        return (
            <div className='login-form'>
                {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.

                    height: -webkit-calc(100% - 127px);
                        height:    -moz-calc(100% - 127px);
                        height:         calc(100% - 127px);
                    
                */}
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <SignUpPanel 
                            credentialErrors={this.errors}
                            onSuccess={this.onSuccess}
                            onCredentialErrors={this.onCredentialErrors}
                            global={this.context.props.global}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export class SuccessfulSignUpState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        const LANG = this.context.props.global.LANG.signUp;
        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Message>
                            {LANG.success}
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export class AlreadyLoggedInState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Message>
                            You are already logged in!
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}