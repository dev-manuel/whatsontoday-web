// Import modules
import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Import resources
import Header from '../components/header';
import HomeView from './Home';
import SERPView from './SERP';

const BaseView = () => (
        <div>
            <Header/>

            <Switch>
                <Route exact path='/' component={HomeView}/>
                <Route path='/SERP' component={SERPView}/> {/* Todo: render specific SERP according to URL parameters */}
            </Switch>
        </div>
)


export default BaseView;