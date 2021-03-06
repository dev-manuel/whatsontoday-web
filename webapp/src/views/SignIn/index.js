import React from 'react'
import log from 'loglevel'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Redirect} from 'react-router'

import SignInForm from './components/signInForm';


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

export class ShowingSignInForm extends React.Component{

    render(){
        return (
            <div className='login-form'>
                
                <Grid
                    textAlign='center'
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <SignInForm
                        withRedirect={this.props.withRedirect}
                        language={this.props.language}
                        onSuccess={this.onSuccess}
                        handleSignIn={this.props.handleSignIn}
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

    getRedirectLink(locationState, isOrganizer){
        if(locationState){ // If the whole locationState Object is undefined
            // If the organizerRightsNeeded is set to true (or not undefined) and the user not an organizer
            if(locationState.organizerRightsNeeded && !isOrganizer){
                // Redirects the user to the NoAccess Page (with the hint that needs organizer rights)
                return '/no_access?reason=organizer'
            }else{
                if(locationState.hasOwnProperty('from')){
                    // Redirects the user to the original page
                    return locationState.from;
                }else{
                    // Redirects the user to the main page
                    return '/';
                }
            }
        }else{
            // Redirects the user to the main page
            return '/';
        }
    }
    
    handleSuccessfulSignIn(storeToken, token, userMail, isOrganizer){
        
        const locationState = this.props.location.state;
        const redirectTo = this.getRedirectLink(locationState, isOrganizer);
        log.debug('SignInView#redirectTo', redirectTo);

        this.props.handleSignIn(storeToken, token, userMail, isOrganizer, redirectTo);
    }

    render(){
        const langData = {language: this.props.language}
        return this.props.loginData.loggedIn ? 
            <AlreadyLoggedInView {...langData}/> :
            <ShowingSignInForm 
                {...langData} 
                withRedirect={!(this.props.location.state)}
                handleSignIn={this.handleSuccessfulSignIn.bind(this)}
            />
    }
}