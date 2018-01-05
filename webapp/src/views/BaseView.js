// Import modules
import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Import resources
import Header from '../components/header';
import HomeView from './Home';
import SERPView from './SERP';
import EventView from './Event';
import Organizer from './Organizer';
import SignIn from './SignIn';
import SignUp from './SignUp';
import _404 from './404';
import Footer from '../components/footer';

import global from '../common/Global';

class BaseView extends React.Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Header loggedIn={global.loggedIn}/>

                <Switch>
                    <Route exact path='/' component={HomeView}/>
                    <Route path='/SERP' component={SERPView}/> {/* Todo: render specific SERP according to URL parameters */}
                    <Route path='/event' component={EventView}/>
                    <Route path='/organizer' component={Organizer}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' render={() => (<SignUp global={global} />)}/>

                    <Route path='/*' component={_404}/> {/* Error 404 page; Has to be at the last position! */}
                </Switch>

                <Footer/>
            </div>
        )
    }
}

export default BaseView;