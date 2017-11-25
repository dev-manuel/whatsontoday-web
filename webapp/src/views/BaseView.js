// Import modules
import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Import resources
import Header from '../components/header';
import HomeView from './Home';

const BaseView = () => (
        <div>
            <Header/>

            <Switch>
                <Route exact path='/' component={HomeView}/>
            </Switch>
        </div>
)


export default BaseView;