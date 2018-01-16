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

class SignUpState extends AbstractViewState{

    /**
     * switches the current view state to the SuccessfulSignUpState
     */
    onSuccess(){
        this.context.setState({
            viewState: new SuccessfulSignUpState(this.context),
        })
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
                        <SignUpPanel onSuccess={this.onSuccess.bind(this)} global={this.context.props.global}/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

class SuccessfulSignUpState extends AbstractViewState{

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
                            Registration successful. Welcome to WhatsOn!
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

class AlreadyLoggedInState extends AbstractViewState{

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