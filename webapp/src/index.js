// Import modules
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, IndexRoute} from 'react-router-dom';
import log from 'loglevel'

// Import resources
import BaseView from './views/BaseView';
import 'semantic-ui-less/semantic.less';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';


log.setLevel(LOG_LEVEL); // LOG_LEVEL is defined by webpack define plugin
log.debug('Webpack definition plugin:', {
    DISABLE_PRIVATE_ROUTES,
    LOG_LEVEL,
    API_BASE_URL,
})

// Setup of local page routing
const routing = (
    <Router
        basename='/web'
    >
        <BaseView/>
    </Router>
);

// The dom-element where react-dom renders to
const root = document.getElementById('root');

ReactDOM.render(routing, root);