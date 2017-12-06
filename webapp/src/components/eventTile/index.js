// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import './EventTile.less';
import exampleTileImage from '../../img/example_tile.png';


const EventTile = ({name, date, categories}) => (

    <div className="tile">
        <div>
            <h3> {name} </h3>
            <p> {date} </p>
        </div>
    </div>
)
  
export default EventTile;
  