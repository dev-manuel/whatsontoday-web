import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Overview from './overview'
import Create from './create'
import Update from './update'
import Delete from './delete'
import NotFound from '../404'
import Successful from './successful';


export const eventToolLinks = {
    create: 'create',
    update: 'update',
    delete: 'delete',
    successful: 'successful',
}

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
                path={`${basePath}/${eventToolLinks.create}`}
                render={routeProps => (
                    <Create
                        {...routeProps}
                        language={language}
                    />
                )}
            />
            
            {/* Update */}
            <Route
                path={`${basePath}/${eventToolLinks.update}`}
                render={routeProps => (
                    <Update
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Delete */}
            <Route
                path={`${basePath}/${eventToolLinks.delete}`}
                render={routeProps => (
                    <Delete
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Delete */}
            <Route
                path={`${basePath}/${eventToolLinks.delete}`}
                render={routeProps => (
                    <Delete
                        {...routeProps}
                        language={language}
                    />
                )}
            />

            {/* Successful */}
            <Route
                path={`${basePath}/${eventToolLinks.successful}`}
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