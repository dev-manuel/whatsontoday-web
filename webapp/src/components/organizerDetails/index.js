// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
// ...

let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';

const floatRight = {style: {float: 'right'}};


const OrganizerDetails = ({name, description, rating, contactLink, moreAboutLink, imageLink}) => (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <h2>{name}<span {...floatRight}><Rating defaultRating={rating} maxRating={5} disabled /></span></h2>
                        <p>{description}</p>
                        <a href={contactLink}>{name} kontaktieren</a> <a {...floatRight} href={moreAboutLink}>Mehr zu {name}</a>
                    </Grid.Column>
                    <Grid.Column width="6">
                        <p>Im a image too!</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
)

export default OrganizerDetails;