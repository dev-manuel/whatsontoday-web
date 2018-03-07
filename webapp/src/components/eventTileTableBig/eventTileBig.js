import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {stringifyTime} from '../../common/timeStringification'
import exampleTileImage from '../../img/example_tile.png'

import './eventTileBig.less'


export default ({name, from, to, categories, description, imageURI, target, language}) => {
    const {firstLine, secondLine} = stringifyTime(from, to, language.time);    

    return (
        <Link to={target}>
            <div className="eventTileBig_main">
                <img src={exampleTileImage} className="eventTileBig_image"/>
                <div className="eventTileBig_body">
                
                    <div className="eventTileBig_sectionTop">
                        <div className="eventTileBig_heading">{name}</div>
                        <div className="eventTileBig_date">
                            <div className="fistLine">{firstLine}</div>
                            <div className="secondLine">{secondLine}</div>
                        </div>
                    </div>

                    <div className="eventTileBig_sectionMiddle">
                        <div className="eventTileBig_description">
                            {description}
                        </div>
                    </div>

                    <div className="eventTileBig_sectionBottom">
                        {/* TODO! */}
                        {/* <div className="eventTileBig_price">
                            {'LoremIpsum'} 
                        </div> */}
                        <div className="eventTileBig_categories">
                            {/* TODO: Use Max/Min number of categories */}
                            <Icon name="tags" /> 
                            {'LoremIpsum'}
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
