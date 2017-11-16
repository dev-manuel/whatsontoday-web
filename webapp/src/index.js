// Import modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {HashRouter, IndexRoute} from 'react-router-dom'

// Import resources
import BaseView from './views/BaseView';
import 'semantic-ui-less/semantic.less';


// Setup of local page routing
const routing = (
    <HashRouter>
        <BaseView/>
    </HashRouter>
);

// The dom-element where react-dom renders to
const root = document.getElementById('root');

ReactDOM.render(routing, root);