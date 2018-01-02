// Import modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {HashRouter, IndexRoute} from 'react-router-dom';
import axios from 'axios';

// Import resources
import BaseView from './views/BaseView';
import 'semantic-ui-less/semantic.less';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';
import { error } from 'util';


export const GLOBAL = {
    axios: axios.create({
        baseURL: 'http://localhost:9000/api/', // Just for dev!
        timeout: 10000
    }),
    token: ''
}


// Setup of local page routing
const routing = (
    <HashRouter>
        <BaseView/>
    </HashRouter>
);

// The dom-element where react-dom renders to
const root = document.getElementById('root');

ReactDOM.render(routing, root);