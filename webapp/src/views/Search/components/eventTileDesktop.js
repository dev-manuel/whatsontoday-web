import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {categoryTranslation} from '../../../common/api/utils/categoryeTranslation'
import ConditionalHide from '../../../components/conditionalHide'
import {stringifyTime} from '../../../common/timeStringification'
import {maxNameMapping} from '../../../common/api/utils/categoryUtils'
import exampleTileImage from '../../../img/example_tile.png'

import './eventTileDesktop.less'


export default ({name, from, to, categories, description, shortDescription, thumbnailImage, target, language}) => {
    const {firstLine, secondLine} = stringifyTime(from, to, language.time);    
    const {categoryNameList, noCategories} = maxNameMapping(categories, 3);

    return (
        <Link to={target}>
            <div className="eventTileDesktop_main">
                <img src={thumbnailImage.uri} className="eventTileDesktop_image"/>
                <div className="eventTileDesktop_body">
                
                    <div className="eventTileDesktop_sectionTop">
                        <div className="eventTileDesktop_heading">{name}</div>
                        <div className="eventTileDesktop_date">
                            <div className="fistLine">{firstLine}</div>
                            <div className="secondLine">{secondLine}</div>
                        </div>
                    </div>

                    <div className="eventTileDesktop_sectionMiddle">
                        <div className="eventTileDesktop_description">
                            {shortDescription}
                        </div>
                    </div>

                    <div className="eventTileDesktop_sectionBottom">
                        {/* TODO! */}
                        {/* <div className="eventTileDesktop_price">
                            {'LoremIpsum'} 
                        </div> */}
                        <div className="eventTileDesktop_categories">
                            <ConditionalHide hide={noCategories}>
                                <Icon name="tags"/>
                            </ConditionalHide>
                            {categoryNameList.map(category => `#${categoryTranslation(category, language.categories)}`).join(' ')} 
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
