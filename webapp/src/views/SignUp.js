import React from 'react'
import {Message, Grid} from 'semantic-ui-react'

import SignUpPanel from '../components/signUpPanel'

// Inspired by https://react.semantic-ui.com/layouts/login

export const AlreadyLoggedInView = ({language}) => {
    const lang = language.signUp;
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

export const ShowingSuccessView = ({language}) => {
    const lang = language.signUp;
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
                        {lang.success}
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export const ShowingSignUpView = ({language, onSuccess}) => {
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
                        onSuccess={onSuccess}
                        language={language}
                    />
                </Grid.Column>
            </Grid>
        </div>
    )
}


export default class SignUpView extends React.Component {

    state = {
        successfulSignUp: false,
    }

    onSuccess(){
        this.setState({
            successfulSignUp: true,
        })
    }

    render(){

        if(this.props.loginData.loggedIn){
            return <AlreadyLoggedInView language={this.props.language}/>
        }

        if(this.state.successfulSignUp){
            return <ShowingSuccessView language={this.props.language}/>
        }

        return <ShowingSignUpView onSuccess={this.onSuccess.bind(this)} language={this.props.language}/>

    }
}
