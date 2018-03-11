import React from 'react'
import {Route, Redirect} from 'react-router-dom'

/**
 * Shows its content only if the user is loggedIn otherwise it will redirect the user to the SignIn view
 */
export const PrivateRoute = ({ loggedIn, render, path}) => (
    <Route path={path} render={props => {
        if(loggedIn || DISABLE_PRIVATE_ROUTES){ // DISABLE_PRIVATE_ROUTES is defined by the webpack definition plugin
            return render(props);
        }else{
            return (
                <Redirect push to={{
                    pathname: "/signIn",
                    state: {
                        from: props.location,
                        organizerRightsNeeded: false,
                    }
                }}/>
            )
        }
    }}/>
)

/**
 * This Route will redirect the user to the signIn view if loggedIn is false;
 * If the user is (or will) signIn as a "normal" user he will redirected to the NoAccess view;
 * Otherwise it behaves like a regular PrivateRoute and shows its content
 */
export const PrivateOrganizerRoute = ({loggedIn, isOrganizer, render, path}) => (
    <Route path={path} render={props => {
        if((loggedIn && isOrganizer) || DISABLE_PRIVATE_ROUTES){ // DISABLE_PRIVATE_ROUTES is defined by the webpack definition plugin
            return render(props);
        }else{
            return (
                <Redirect push to={{
                    pathname: "/signIn",
                    state: {
                        from: props.location,
                        organizerRightsNeeded: true,
                    }
                }}/>
            )
        }
    }}/>
)