import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import SignInPanel from '../components/SignInPanel';
import AbstractViewState from '../common/AbstractViewState';
import StatefulView from '../common/StatefulView';


// Inspired by https://react.semantic-ui.com/layouts/login

export default class SignInView extends StatefulView {

    constructor(props){
        super(props);

        this.state = {
            viewState: props.global.loggedIn ? new AlreadyLoggedInState(this) : new SignInState(this),
        }
    }
}

//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

/**
 * This class simply provides some methods used by multiple views displaying the sign-in panel
 */
class BaseSignInPanelViewState extends AbstractViewState{
    
    constructor(props){
        super(props);

        this.onSuccess = this.onSuccess.bind(this);
        this.onCredentialError = this.onCredentialError.bind(this);
    }

    /**
     * redirects the user to the main page
     */
    onSuccess(){
        this.context.props.history.push('/#');
    }

    /**
     * shows an error message (switches to WrongCredentialsState)
     */
    onCredentialError(){
        this.context.setState({
            viewState: new WrongCredentialsState(this.context)
        })
    }
}


export class SignInState extends BaseSignInPanelViewState{


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
                    <SignInPanel
                        global={this.context.props.global}
                        onSuccess={this.onSuccess}
                        showCredentialError={false}
                        onCredentialError={this.onCredentialError}
                    />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export class WrongCredentialsState extends BaseSignInPanelViewState{
    
    constructor(context){
        super(context);
    }
    
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
                    <SignInPanel
                        global={this.context.props.global}
                        onSuccess={this.onSuccess.bind(this)}
                        showCredentialError={true}
                        onCredentialError={this.onCredentialError}
                    />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export class AlreadyLoggedInState extends AbstractViewState{

    constructor(context){
        super(context);
    }

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