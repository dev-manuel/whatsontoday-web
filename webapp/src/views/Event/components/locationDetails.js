import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';


const floatRight = {style: {float: 'right'}};

const LocationDetails = ({name, city, country, street, language}) => {
    const lang = language.event;
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
                        <p style={{textAlign: 'center'}}>
                            {street} <br/>
                            {city} <br/>
                            {country} <br/>
                        </p>
                        {/* <a {...floatRight} href={'/'}>{lang.moreAbout(name)}</a>                       */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default LocationDetails;