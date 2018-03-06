import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Axios from 'axios';
import {createHashHistory} from 'history'

import Header from './Header';
import HomeView from './Home';
import SERPView from './SERP';
import EventView from './Event';
import OrganizerView from './Organizer';
import LocationView from './Location';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Confirm from './Confirm';
import _404 from './404';
import Footer from './Footer';

import Global from '../common/Global';
import GER from '../common/dictionary/GER';

class BaseView extends React.Component {
    
    constructor(props){
        super(props);

        // const forceUpdate = this.forceUpdate.bind(this);

        // this.global = new Global({
        //     axios: Axios.create({
        //         baseURL: 'http://localhost:9000/api/v1/', // Just for dev!
        //         timeout: 10000
        //     }),
        //     onUpdate: () => {
        //         forceUpdate(); // Rerender component
        //     },
        //     LANG: GER,
        //     history: createHashHistory(),
        // });
    }

    state = {
        loginData: {
            loggedIn: false,
            token: null,
            userMail: null,
        },

        language: GER,
    }

    /**
     * 
     * @param {{loggedIn: boolean, token: string, userMail: string}} loginData 
     */
    setLoginData(loginData){
        this.setState({loginData});
    }

    render() {

        const language = {language: this.state.language};
        return (
            <div>
                <Header {...this.state}/>

                <div style={{marginTop: 30}}>
                    <Switch>
                        <Route exact path='/'        render={() => <HomeView {...language}/>}/>
                        <Route path='/search'        render={() => <SERPView {...language}/>}/>
                        <Route path='/event/:id'     render={routeParams => <EventView {...language} {...routeParams} />}/>
                        <Route path='/organizer'     render={() => <OrganizerView {...language}/>}/>
                        <Route path='/location'      render={() => <LocationView {...language}/>}/>
                        <Route path='/signin'        render={() => <SignIn {...language} loginData={this.state.loginData} setLoginData={this.setLoginData.bind(this)}/> }/>
                        <Route path='/signup'        render={() => <SignUp {...language} loginData={this.state.loginData} />}/>
                        <Route path='/mailConfirmed' render={() => <Confirm {...language} />} />
                        
                        {/* Error 404 page; Has to be at the last position! */}
                        <Route path='/*'             render={() => <_404 {...language}/>}/>
                    </Switch>
                </div>

                <Footer language={this.state.language}/>
            </div>
        )
    }
}

export default BaseView;