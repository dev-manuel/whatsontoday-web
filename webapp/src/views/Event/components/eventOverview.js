import React from 'react'
import {Grid, Rating, Responsive} from 'semantic-ui-react'

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
    const responsiveBreakPoint = 1380;

    const formattedDescription = description.split('\n').map((item, index) => {
        return (
            <React.Fragment>
                <p>{item}</p>
            </React.Fragment>
        )
    })

    return (
        <div>
            <Responsive
                minWidth={responsiveBreakPoint}
            >
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="8">
                            <ImageSlider imageList={sliderImages} />
                        </Grid.Column>
                        <Grid.Column width="8">
                            <div className="eventOverview_desktopTextContainer">
                                {/* Event Title */}
                                <h2 className="eventOverview_name">{name}</h2>

                                {/* Display the dates */}
                                <div className="eventOverview_date">
                                    {stringifiedTime.firstLine}
                                    <br/>
                                    {stringifiedTime.secondLine}
                                </div>

                                {/* <Rating defaultRating={rating || 0} maxRating={5} disabled={!hasRating} /> */}
                                <div className="eventOverview_description">
                                    {formattedDescription}
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Responsive>
            <Responsive
                maxWidth={responsiveBreakPoint-1}
            >
                <ImageSlider imageList={sliderImages} />

                <div className="eventOverview_mobileTextContainer">
                    {/* Event Title */}
                    <h2 className="eventOverview_name">{name}</h2>

                    {/* Display the dates */}
                    <div className="eventOverview_date">
                        {stringifiedTime.firstLine}
                        <br/>
                        {stringifiedTime.secondLine}
                    </div>

                    {/* <Rating defaultRating={rating || 0} maxRating={5} disabled={!hasRating} /> */}
                    <div className="eventOverview_description">
                        {formattedDescription}
                    </div>
                </div>
            </Responsive>
        </div>
    )
}

export default EventOverview;