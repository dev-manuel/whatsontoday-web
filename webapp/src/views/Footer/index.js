import React from 'react'
import {Link} from 'react-router-dom'
import { Segment, Container, Grid, Header, List, Divider } from 'semantic-ui-react'

export default ({language}) => {
    const lang = language.footer;
    const links = language.externalLinks;
    return (
        <Segment
            inverted
            vertical
            style={{ padding: '5em 0em' }}>
            <Container textAlign="center">
                <Grid textAlign="center" columns={3} divided inverted stackable>
                    <Grid.Row>
                        {/* <Grid.Column width={3}>
                            <Header inverted as='h4' content={lang.about} />
                            <List link inverted>
                                <List.Item as='a'>{lang.contactUs}</List.Item>
                                <List.Item as='a'>{lang.theTeam}</List.Item>
                                <List.Item as='a'>{lang.faq}</List.Item>                    
                            </List>
                        </Grid.Column> */}
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content={lang.socialMedia} />
                            <List link inverted>
                                <List.Item as='a' target="_blank" href={links.facebook}>{lang.facebook}</List.Item>
                                <List.Item as='a' target="_blank" href={links.twitter}>{lang.twitter}</List.Item>
                                <List.Item as='a' target="_blank" href={links.instagram}>{lang.instagram}</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>What's On Today</Header>
                            <p>
                                {lang.slogan}
                            </p>
                        </Grid.Column>
                    </Grid.Row>

                    <Divider inverted section/>
                    <Grid.Row>
                        <List inverted divided horizontal link size="small">
                            <List.Item>
                                <List.Content>
                                    <List.Header>
                                        <a href="mailto:mail@whats-on.today">
                                            {lang.contactUs}
                                        </a>
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>
                                        <Link to='/terms_of_conditions'>
                                            {lang.terms}
                                        </Link>
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header>
                                        <Link to='/site_notice'>
                                            {lang.siteNotice}
                                        </Link>
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}
