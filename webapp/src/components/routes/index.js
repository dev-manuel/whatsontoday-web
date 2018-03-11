import React from 'react'
import {Route, Redirect} from 'react-router-dom'

// Shows its content only if the user is loggedIn otherwise it will redirect the user to the SignIn view
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