// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
import EventOverview from '../components/eventOverview';
import EventDetails from '../components/eventDetails';


const Event = () => (
        <div>
            <EventOverview />
            <EventDetails/>
        </div>
)

export default Event;