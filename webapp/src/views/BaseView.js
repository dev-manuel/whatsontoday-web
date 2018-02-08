// Import modules
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Axios from 'axios';
import {createHashHistory} from 'history'

// Import resources
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

        const forceUpdate = this.forceUpdate.bind(this);

        this.global = new Global({
            axios: Axios.create({
                baseURL: 'http://localhost:9000/api/v1/', // Just for dev!
                timeout: 10000
            }),
            onUpdate: () => {
                forceUpdate(); // Rerender component
            },
            LANG: GER,
            history: createHashHistory(),
        });
    }

    render() {
        return (
            <div>
                <Header global={this.global}/>

                <Switch>
                    <Route exact path='/' render={() => <HomeView global={this.global}/>}/>
                    <Route path='/search' render={() => <SERPView global={this.global}/>}/> {/* Todo: render specific SERP according to URL parameters */}
                    <Route path='/event' render={() => <EventView global={this.global}/>}/>
                    <Route path='/organizer' component={OrganizerView}/>
                    <Route path='/location' component={LocationView}/>
                    <Route path='/signin' render={() => (<SignIn global={this.global} />)}/>
                    <Route path='/signup' render={() => (<SignUp global={this.global} />)}/>
                    <Route path='/mailConfirmed' render={()=> (<Confirm global={this.global} />)} />
                    <Route path='/*' component={_404}/> {/* Error 404 page; Has to be at the last position! */}
                </Switch>

                <Footer global={this.global}/>
            </div>
        )
    }
}

export default BaseView;