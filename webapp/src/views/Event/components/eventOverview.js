import React from 'react'
import {Grid, Rating} from 'semantic-ui-react'

import {createSliderImageLinksFromImages} from '../../../common/api/utils/imageUtils'
import {stringifyTime} from '../../../common/timeStringification'
import ImageSlider from '../../../components/imageSlider'
import exampleImage from '../../../img/example_image.jpg'
import './eventOverview.less'

/**
 * 
 * @param {{name: string, rating: number, from: Date, to: Date, description: string}} props 
 */
const EventOverview = ({name, rating, from, to, description, categories, sliderImages, language}) => {
    const hasRating = rating instanceof Number;
    const stringifiedTime = stringifyTime(from, to, language.time);

    const formattedDescription = description.split('\n').map((item, index) => {
        return (
            <React.Fragment>
                <p>{item}</p>
            </React.Fragment>
        )
    })

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="8">
                        <ImageSlider imageList={sliderImages} />
                    </Grid.Column>
                    <Grid.Column width="8">
                        
                        {/* Event Title */}
                        <h2 className="eventOverviewName">{name}</h2>

                        {/* Display the dates */}
                        <div className="eventOverviewDate">
                            {stringifiedTime.firstLine}
                            <br/>
                            {stringifiedTime.secondLine}
                        </div>

                        {/* <Rating defaultRating={rating || 0} maxRating={5} disabled={!hasRating} /> */}
                        {formattedDescription}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default EventOverview;