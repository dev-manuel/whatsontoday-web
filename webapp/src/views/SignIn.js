import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import SignInPanel from '../components/SignInPanel';
import AbstractViewState from '../common/AbstractViewState';


// Inspired by https://react.semantic-ui.com/layouts/login

export default class SignInView extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            viewState: props.global.loggedIn ? new AlreadyLoggedInState(this) : new SignInState(this),
        }
    }

    render(){
        return this.state.viewState.render();
    }
}

//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

class SignInState extends AbstractViewState{

    constructor(context){
        super(context);
    }

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
                    <SignInPanel global={this.context.props.global}/>
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