import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

import ConditionalHide from '../../../components/conditionalHide';

import './locationDetails.less'

const floatRight = {style: {float: 'right'}};

const LocationDetails = ({name, city, country, street, language, website, comment}) => {
    const lang = language.event;
    const hasNoWebsite = !website;

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="8">
                        {/* <p>Ohhhh. I'm a map!</p> */}
                    </Grid.Column>
                    <Grid.Column width="8">
                        <h2>Location:</h2>
                        {/* <h2>{name} <span {...floatRight}><Rating defaultRating={rating} maxRating={5} disabled /></span></h2> */}
                        <p className="Event_locationDetails_locationAddress">
                            {street} <br/>
                            {city} <br/>
                            {country} <br/>
                        </p>
                        <ConditionalHide hide={hasNoWebsite}>
                            <a {...floatRight} href={website}>{lang.moreAbout(name)}</a>
                        </ConditionalHide>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default LocationDetails;