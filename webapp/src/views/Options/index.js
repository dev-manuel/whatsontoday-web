import React from 'react'
import {Route} from 'react-router-dom'

import Overview from './Overview'
import NewPassword from './NewPassword'
import DeleteAccount from './DeleteAccount'

import './Options.less'

export const optionLinks = {
    newPassword: 'new_password',
    deleteAccount: 'delete_account',
}

export default ({match, language, setLoginData}) => {
    const basePath = match.path
    return (
        <React.Fragment>
            <Route exact path={`${basePath}/`} render={routeProps => <Overview {...routeProps} language={language}/>} />
            <Route path={`${basePath}/${optionLinks.newPassword}`} render={routeProps => <NewPassword {...routeProps} language={language}/>} />
            <Route 
                path={`${basePath}/${optionLinks.deleteAccount}`}
                render={routeProps => (
                    <DeleteAccount
                        {...routeProps}
                        setLoginData={setLoginData}
                        language={language}
                    />
                )}
            />
            
        </React.Fragment>
    )
}