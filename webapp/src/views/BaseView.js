import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Header from './Header'
import HomeView from './Home'
import SERPView from './SERP'
import EventView from './Event'
import OrganizerView from './Organizer'
import LocationView from './Location'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Options from './Options'
import Confirm from './Confirm'
import _404 from './404'
import Footer from './Footer'

import {axios, setToken, removeToken} from '../common/api'
import GER from '../common/dictionary/GER'

import './BaseView.less'

// Shows its content only if the user is loggedIn otherwise it will redirect the user to the SignIn view
export const PrivateRoute = ({ loggedIn, render, path}) => (
    <Route path={path} render={props => {
        console.log(DISABLE_PRIVATE_ROUTES);
        if(loggedIn || DISABLE_PRIVATE_ROUTES){ // DISABLE_PRIVATE_ROUTES is defined by the webpack definition plugin
            return render(props);
        }else{
            return (
                <Redirect push to={{
                    pathname: "/signIn",
                    state: { from: props.location }
                }}/>
            )
        }
    }}/>
)


export default class BaseView extends React.Component {

    state = {
        loginData: {
            loggedIn: false,
            token: null,
            userMail: null,
        },
        language: GER,

        redirectTo: null,
    }

    /**
     * This method will be invoked after a SUCCESSFUL signIn 
     * @param {{loggedIn: boolean, token: string, userMail: string}} loginData 
     */
    setLoginData(loginData, redirectTo){
        setToken( loginData.token);
        this.setState({
            loginData,
            redirectTo,
        });
    }

    /**
     * This method will be invoked after a SUCCESSFUL signOut
    */
    handleSignOut(){
        console.log('lakjslksaj')
        removeToken();
        this.setState({
            loginData: {
                loggedIn: false,
                token: null,
                userMail: null,
            },
        })
    }

    render() {
        const language = {language: this.state.language};
        return this.state.redirectTo ?
            <Redirect to={this.state.redirectTo}/> :
            <div className="BaseView_container">

                <div className="BaseView_header">
                    <Header {...this.state} handleSignOut={this.handleSignOut.bind(this)}/>
                </div>

                <div className="BaseView_body">
                    <Switch>
                        <PrivateRoute
                            loggedIn={this.state.loginData.loggedIn}
                            path='/options'
                            render={ routeParams => <Options {...routeParams} {...language}/>}
                        />

                        <Route exact path='/'         render={() => <HomeView {...language}/>}/>
                        <Route path='/search'         render={() => <SERPView {...language}/>}/>
                        <Route path='/event/:id'      render={routeParams => <EventView {...language} {...routeParams} />}/>
                        <Route path='/organizer'      render={() => <OrganizerView {...language}/>}/>
                        <Route path='/location'       render={() => <LocationView {...language}/>}/>
                        <Route path='/signin'         render={routeParams => <SignIn 
                            {...language}
                            {...routeParams}
                            loginData={this.state.loginData}
                            setLoginData={this.setLoginData.bind(this)}
                        />}/>
                        <Route path='/signup'         render={() => <SignUp {...language} loginData={this.state.loginData} />}/>
                        <Route path='/mailConfirmed'  render={() => <Confirm {...language} />} />
                        
                        {/* Error 404 page; Has to be at the last position! */}
                        <Route path='/*'              render={() => <_404 {...language}/>}/>
                    </Switch>
                </div>

                <div className="BaseView_footer">
                    <Footer language={this.state.language}/>
                </div>
            </div>
    }

    componentDidUpdate(){
        // Check if the redirectTo property was set and reset it in this case to prevent unnecessary 
        // recursions on the redirect element
        if(this.state.redirectTo){
            this.setState({
                redirectTo: null,
            })
        }
    }
}