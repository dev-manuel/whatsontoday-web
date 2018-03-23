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
import EventTool from '../EventTool'
import Confirm from '../Confirm'
import NoAccess from '../NoAccess'
import _404 from '../404'
import Footer from '../Footer'

import SocialMediaBar from './components/socialMediaBar'

import {PrivateRoute, PrivateOrganizerRoute} from '../../components/routes'
import {setToken, removeToken} from '../../common/api'
import GER from '../../common/dictionary/GER'

import './BaseView.less'




class BaseView extends React.Component {

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
        removeToken();
        this.setState({
            loginData: {
                loggedIn: false,
                token: null,
                userMail: null,
                isOrganizer: false,
            },
        })
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
                                    setLoginData={this.setLoginData.bind(this)}
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
                                    setLoginData={this.setLoginData.bind(this)}
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
                            setLoginData={this.setLoginData.bind(this)}
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