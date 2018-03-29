import React from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import log from 'loglevel'

import Header from '../Header'
import HomeView from '../Home'
import SERPView from '../Search'
import EventView from '../Event'
import OrganizerView from '../Organizer'
import LocationView from '../Location'
import SignIn from '../SignIn'
import SignUp from '../SignUp/index'
import Options from '../Options'
import ForOrganizers from '../ForOrganizers'
import EventTool from '../EventTool'
import LocationTool from  '../LocationTool'
import Confirm from '../Confirm'
import NoAccess from '../NoAccess'
import _404 from '../404'
import Footer from '../Footer'

import SocialMediaBar from './components/socialMediaBar'

import {getLoggedInUser} from '../../common/api/requests/login'
import {PrivateRoute, PrivateOrganizerRoute} from '../../components/routes'
import {setToken, removeToken} from '../../common/api'
import GER from '../../common/dictionary/GER'

import './BaseView.less'




class BaseView extends React.Component {

    localStorage = window.localStorage;

    state = {
        loginData: {
            loggedIn: false,
            token: null,
            userMail: null,
            isOrganizer: false
        },
        language: GER,

        redirectTo: null,
    }

    /**
     * This method will be invoked after a SUCCESSFUL signIn 
     * @param {{loggedIn: boolean, token: string, userMail: string}} loginData 
     */
    setLoginData(loginData, redirectTo){
       log.warn('setLoginData is deprecated!')
    }

    /**
     * 
     * @param {boolean} storeToken 
     * @param {string} token 
     * @param {string} userMail 
     * @param {*} redirect 
     */
    handleSignIn(storeToken, token, userMail, isOrganizer, redirectTo){
        setToken(token);
        if(storeToken){
            this.localStorage.setItem('token', token);
        }
        this.setState({
            loginData: {
                loggedIn: true,
                token: token,
                userMail: userMail,
                isOrganizer,
            },
            redirectTo,
        })
    }

    /**
     * This method will be invoked after a SUCCESSFUL signOut
    */
    handleSignOut(redirectTo){
        removeToken();
        this.localStorage.removeItem('token');
        this.setState({
            loginData: {
                loggedIn: false,
                token: null,
                userMail: null,
                isOrganizer: false,
            },
            redirectTo,
        })
    }

    componentDidMount(){
        if(this.localStorage.hasOwnProperty('token')){
            log.info('Token property is set inside the localStorage');
            const token = this.localStorage.getItem('token');

            setToken(token);
            getLoggedInUser({
            }).then(data => {
                this.setState({
                    loginData: {
                        loggedIn: true,
                        token: token,
                        userMail: data.email,
                        isOrganizer: data.userType === 'organizer',
                    },
                })
            }).catch(error => {
                log.debug('BaseView#getLoggedInData#catch', error);
                removeToken();
                this.localStorage.removeItem('token');    
            })
        }
    }

    render() {
        const language = {language: this.state.language};

        // Set social media bar to active if on home-view (`/`)
        const {pathname} = this.props.location;
        const smBarActive = pathname === '/';

        return this.state.redirectTo ?
            <Redirect to={this.state.redirectTo}/> :
            <div 
                className={ smBarActive ? "BaseView_container_smBar" : "BaseView_container"}
            >

                <div className="BaseView_header">
                    <Header {...this.state} handleSignOut={this.handleSignOut.bind(this)}/>
                </div>

                <div className="BaseView_body">
                    <Switch>

                        {/* Private routes */}
                        <PrivateRoute
                            loggedIn={this.state.loginData.loggedIn}
                            path='/options'
                            render={ routeParams => (
                                <Options
                                    {...language}
                                    {...routeParams}
                                    handleSignOut={this.handleSignOut.bind(this)}
                                />
                            )}
                        />

                        {/* Private organizer routes */}
                        <PrivateOrganizerRoute
                            loggedIn={this.state.loginData.loggedIn}
                            isOrganizer={this.state.loginData.isOrganizer}
                            path='/event_tool'
                            render={ routeParams => (
                                <EventTool
                                    {...language}
                                    {...routeParams}
                                />
                            )}
                        />
                        <PrivateOrganizerRoute
                            loggedIn={this.state.loginData.loggedIn}
                            isOrganizer={this.state.loginData.isOrganizer}
                            path='/location_tool'
                            render={ routeParams => (
                                <LocationTool
                                    {...language}
                                    {...routeParams}
                                />
                            )}
                        />
                        <PrivateOrganizerRoute
                            loggedIn={this.state.loginData.loggedIn}
                            isOrganizer={this.state.loginData.isOrganizer}
                            path='/for_organizers'
                            render={ routeParams => (
                                <ForOrganizers
                                    {...language}
                                    {...routeParams}
                                />
                            )}
                        />


                        {/* Regular routes */}
                        <Route exact path='/'         render={() => <HomeView {...language}/>}/>
                        <Route path='/search'         render={() => <SERPView {...language}/>}/>
                        <Route path='/event/:id'      render={routeParams => <EventView {...language} {...routeParams} />}/>
                        <Route path='/organizer'      render={() => <OrganizerView {...language}/>}/>
                        <Route path='/location'       render={() => <LocationView {...language}/>}/>
                        <Route path='/signin'         render={routeParams => <SignIn 
                            {...language}
                            {...routeParams}
                            loginData={this.state.loginData}
                            handleSignIn={this.handleSignIn.bind(this)}
                        />}/>
                        <Route path='/signup'         render={() => <SignUp {...language} loginData={this.state.loginData} />}/>
                        <Route path='/mailConfirmed'  render={() => <Confirm {...language} />} />
                        <Route path='/no_access'      render={() => <NoAccess {...language} />} />

                        {/* Error 404 page; Has to be at the last position! */}
                        <Route path='/*'              render={() => <_404 {...language}/>}/>
                    </Switch>
                </div>

     
                {/* Footer */}

                <div className={ smBarActive ? "BaseView_smBar" : "BaseView_smBarHidden"} >
                    <SocialMediaBar {...language}/>
                </div>
                <div className={ smBarActive ? "BaseView_footer_smBar" : "BaseView_footer"}>
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

export default withRouter(BaseView);