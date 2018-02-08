// Import modules
import React from 'react';
import {Card, Icon, Image} from 'semantic-ui-react';

// Import resources
import './tile.less';
import exampleTileImage from '../../img/example_tile.png';

/**
 * JSX component responsible to render a tile which shows instantly all important information about an event
 * @param {{name: string, date: string, categories: string, imageURI: string, target: string}} props 
 */
export default ({name, date, categories, imageURI, target, global}) => (

    <div className="tile">
        <div>
            <h3> {name} </h3>
            <p> {date} </p>
        </div>
    </div>
)

  