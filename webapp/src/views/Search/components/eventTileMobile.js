import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {categoryTranslation} from '../../../common/api/utils/categoryeTranslation'
import ConditionalHide from '../../../components/conditionalHide'
import {stringifyTime} from '../../../common/timeStringification'
import {maxNameMapping} from '../../../common/api/utils/categoryUtils'
import exampleTileImage from '../../../img/example_tile.png'

import './eventTileMobile.less'


export default ({name, from, to, categories, description, shortDescription, thumbnailImage, target, language}) => {
    const {firstLine, secondLine} = stringifyTime(from, to, language.time);    
    const {categoryNameList, noCategories} = maxNameMapping(categories, 3);

    return (
        <Link to={target}>
            <div className="eventTileMobile_main">
                <div className="eventTileMobile_leftLine"/>
                <div className="eventTileMobile_rightLine"/>
                <div className="eventTileMobile_imageBox">
                    <div>
                        <img src={thumbnailImage.uri} className="eventTileMobile_image"/>
                    </div>
                </div>
                <div className="eventTileMobile_heading">{name}</div>
                <div className="eventTileMobile_date">
                    <div className="fistLine">{firstLine}</div>
                    <div className="secondLine">{secondLine}</div>
                </div>
                <div className="eventTileMobile_description">
                    {shortDescription}
                </div>
                <div className="eventTileMobile_categories">
                    <ConditionalHide hide={noCategories}>
                        <Icon name="tags"/>
                    </ConditionalHide>
                    {categoryNameList.map(category => `#${categoryTranslation(category, language.categories)}`).join(' ')} 
                </div>


                {/* 
                    <div className="eventTileMobile_sectionBottom">
                        <div className="eventTileMobile_price">
                            {'LoremIpsum'} 
                        </div>
                    </div>

                */}
            </div>
        </Link>
    )
}
