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

class SignInState extends AbstractViewState{

    /**
     * Switches the current view state to SuccessfulSignInState
     */
    onSuccess(){
        this.context.props.history.push('/#');
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
                    />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

class AlreadyLoggedInState extends AbstractViewState{

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