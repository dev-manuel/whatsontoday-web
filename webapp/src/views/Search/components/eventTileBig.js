import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {categoryTranslation} from '../../../common/api/utils/categoryeTranslation'
import ConditionalHide from '../../../components/conditionalHide'
import {stringifyTime} from '../../../common/timeStringification'
import {maxNameMapping} from '../../../common/api/utils/categoryUtils'
import exampleTileImage from '../../../img/example_tile.png'

import './eventTileBig.less'


export default ({name, from, to, categories, description, shortDescription, thumbnailImage, target, language}) => {
    const {firstLine, secondLine} = stringifyTime(from, to, language.time);    
    const {categoryNameList, noCategories} = maxNameMapping(categories, 3);

    return (
        <Link to={target}>
            <div className="eventTileBig_main">
                <img src={thumbnailImage} className="eventTileBig_image"/>
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
                            {shortDescription}
                        </div>
                    </div>

                    <div className="eventTileBig_sectionBottom">
                        {/* TODO! */}
                        {/* <div className="eventTileBig_price">
                            {'LoremIpsum'} 
                        </div> */}
                        <div className="eventTileBig_categories">
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
