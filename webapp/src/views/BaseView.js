// Import modules
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Axios from 'axios';

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

import Global from '../common/Global';

class BaseView extends React.Component {
    
    constructor(props){
        super(props);
        this.global = new Global({
            axios: Axios.create({
                baseURL: 'http://localhost:9000/api/', // Just for dev!
                timeout: 10000
            }),
            onUpdate: () => {
                this.forceUpdate(); // Rerender component
            }
        });
    }

    render() {
        return (
            <div>
                <Header global={this.global}/>

                <Switch>
                    <Route exact path='/' component={HomeView}/>
                    <Route path='/SERP' component={SERPView}/> {/* Todo: render specific SERP according to URL parameters */}
                    <Route path='/event' component={EventView}/>
                    <Route path='/organizer' component={Organizer}/>
                    <Route path='/signin' render={() => (<SignIn global={this.global} />)}/>
                    <Route path='/signup' render={() => (<SignUp global={this.global} />)}/>

                    <Route path='/*' component={_404}/> {/* Error 404 page; Has to be at the last position! */}
                </Switch>

                <Footer/>
            </div>
        )
    }
}

export default BaseView;