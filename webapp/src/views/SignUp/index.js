import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Grid, Message} from 'semantic-ui-react'

import User from './user'
import Organizer from './organizer'
import NotFound from '../404'


export const signUpRoutes = {
    user: 'user',
    organizer: 'organizer',
}

export const AlreadyLoggedInView = ({language}) => {
    const lang = language.signUp;
    return (
        <div className='login-form'>
            <Grid
                textAlign='center'
                style={{ height: '100%' }} // Todo: adjust style
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

const SignUp =  ({match, language, loginData}) => {
    const basePath = match.path;

    return loginData.loggedIn ?
    <AlreadyLoggedInView language={language} /> :
    (
        <Switch>
            
            {/* BaseRoute */}
            <Route
                exact
                path={`${basePath}/`}
                render={routeProps => (
                    <Redirect to={`${basePath}/${signUpRoutes.user}`} />
                )}
            />

            {/* User */}
            <Route
                path={`${basePath}/${signUpRoutes.user}`}
                render={routeProps => (
                    <User
                        {...routeProps}
                        basePath={basePath}
                        language={language}
                    />
                )}
            />
            
            {/* Organizer */}
            {/* <Route
                path={`${basePath}/${signUpRoutes.organizer}`}
                render={routeProps => (
                    <Organizer
                        {...routeProps}
                        language={language}
                    />
                )}
            /> */}

            {/* NotFound */}
            <Route
                path='/*'
                render={routeProps => (
                    <NotFound
                        {...routeProps}
                        language={language}
                    />
                )}
            />
            
        </Switch>
    )
}

export default withRouter(SignUp);