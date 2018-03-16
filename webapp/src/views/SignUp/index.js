import React from 'react'
import {Route, Switch} from 'react-router-dom'

import User from './user'
import Organizer from './organizer'
import Successful from './successful';
import NotFound from '../404'


export const signUpRoutes = {
    user: 'user',
    organizer: 'organizer',
    successful: 'successful',
}

export default ({match, language, setLoginData}) => {
    const basePath = match.path;
    return (
        <Switch>           
            {/* User */}
            <Route
                path={`${basePath}/${signUpRoutes.user}`}
                render={routeProps => (
                    <Create
                        {...routeProps}
                        basePath={basePath}
                        language={language}
                    />
                )}
            />
            
            {/* Organizer */}
            <Route
                path={`${basePath}/${signUpRoutes.update}`}
                render={routeProps => (
                    <Update
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Successful */}
            <Route
                path={`${basePath}/${signUpRoutes.successful}`}
                render={routeProps => (
                    <Successful
                        {...routeProps}
                        language={language}
                    />
                )}
            />

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