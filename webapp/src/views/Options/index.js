import React from 'react'
import {Route} from 'react-router-dom'

import Overview from './Overview'
import NewPassword from './NewPassword'

import './Options.less'

export default ({match, language}) => {
    return (
        <React.Fragment>
            <Route exact path={`${match.path}/`} render={routeProps => <Overview {...routeProps} language={language}/>} />
            <Route path={`${match.path}/new_password`} render={routeProps => <NewPassword {...routeProps} language={language}/>} />
        </React.Fragment>
    )
}