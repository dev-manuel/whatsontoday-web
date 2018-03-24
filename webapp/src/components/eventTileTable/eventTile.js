// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import './eventTile.less';
import exampleTileImage from '../../img/example_tile.png';

/**
 * JSX component responible to render a tile which shows instantly all important informations obout an event
 * @param {{name: string, date: string, categories: string, imageURI: string, target: string}} props 
 */
const EventTile = ({name, date, categories, imgageURI, target, language}) => (

    <div className="tile">
        <div>
            <h3> {name} </h3>
            <p> {date} </p>
        </div>
    </div>
)
  
export default EventTile;
  