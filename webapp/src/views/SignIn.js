import React from 'react'
import log from 'loglevel'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Redirect} from 'react-router'

import SignInPanel from '../components/SignInPanel';


// Inspired by https://react.semantic-ui.com/layouts/login

export const AlreadyLoggedInView = ({language}) => {
    const lang = language.signIn;
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
                        {lang.alreadyLoggedIn}
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export class ShowingSignInPanel extends React.Component{

    render(){
        return (
            <div className='login-form'>
                
                <Grid
                    textAlign='center'
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <SignInPanel
                        withRedirect={this.props.withRedirect}
                        language={this.props.language}
                        onSuccess={this.onSuccess}
                        setLoginData={this.props.setLoginData}
                    />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}



export default class SignInView extends React.Component {

    state = {
        redirectTo: null,
    }
    
    handleSuccessfulSignIn(loginData){
        
        let redirectTo = '';
        const locationState = this.props.location.state;
        if(locationState){
            if(locationState.hasOwnProperty('from')){
                // Redirects the user to the original page
                redirectTo = locationState.from;
            }
        }else{
            // Redirects the user to the main page
            redirectTo = '/';
        }
        log.debug('redirectTo', redirectTo);
        this.props.setLoginData(loginData, redirectTo);
    }

    render(){
        const langData = {language: this.props.language}
        return this.props.loginData.loggedIn ? 
            <AlreadyLoggedInView {...langData}/> :
            <ShowingSignInPanel 
                {...langData} 
                withRedirect={!(this.props.location.state)}
                setLoginData={this.handleSuccessfulSignIn.bind(this)}
            />
    }
}