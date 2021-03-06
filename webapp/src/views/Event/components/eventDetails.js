// Import modules
import React from 'react';
import {Grid, Rating} from 'semantic-ui-react';

// Import resources
// ...

let loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ';
for(let i = 0; i < 3; i++) loremIpsum = loremIpsum + loremIpsum;


const EventDetails = ({date, locationName, price, extraInformation, descriptionLong, language}) => {
    const lang = language.event;
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        <p>{loremIpsum}</p>
                    </Grid.Column>
                    <Grid.Column width="6">
                        <h2>{lang.when}</h2>
                        <p>{date}</p>
                        <h2>{lang.where}</h2>
                        <p>{locationName}</p>
                        <h2>{lang.cost}</h2>
                        <p>{price}</p>
                        <h2>{lang.moreInformation}</h2>    
                        <p>{extraInformation}</p>                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
export default EventDetails;