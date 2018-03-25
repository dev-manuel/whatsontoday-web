import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Overview from './overview'
import Create from './create'
import Dashboard from './dashboard'
import Update from './update'
import Delete from './delete'
import NotFound from '../404'
import Successful from './successful';


export default ({match, language, setLoginData}) => {
    const basePath = match.path;
    return (
        <Switch>
            {/* Overview */}
            <Route
                exact
                path={`${basePath}/`}
                render={routeProps => (
                    <Overview
                        {...routeProps}
                        language={language}
                    />
                )}
            />
            
            {/* Create */}
            <Route
                path={`${basePath}/create`}
                render={routeProps => (
                    <Create
                        {...routeProps}
                        basePath={basePath}
                        language={language}
                    />
                )}
            />

            {/* Dashboard */}
            <Route
                path={`${basePath}/dashboard`}
                render={routeProps => (
                    <Dashboard
                        {...routeProps}
                        language={language}
                    />
                )}
            />
            
            {/* Update */}
            <Route
                path={`${basePath}/update`}
                render={routeProps => (
                    <Update
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Delete */}
            <Route
                path={`${basePath}/delete`}
                render={routeProps => (
                    <Delete
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Successful */}
            <Route
                path={`${basePath}/successful`}
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