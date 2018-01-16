import React from 'react';
import { Segment, Container, Grid, Header, List, Divider } from 'semantic-ui-react';

export default ({global}) => {
    const LANG = global.LANG.footer;
    return (
        <div>
            <Segment
                inverted
                vertical
                style={{ padding: '5em 0em' }}>
                <Container textAlign="center">
                    <Grid textAlign="center" columns={3} divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content={LANG.about} />
                                <List link inverted>
                                    <List.Item as='a'>{LANG.contactUs}</List.Item>
                                    <List.Item as='a'>{LANG.theTeam}</List.Item>
                                    <List.Item as='a'>{LANG.faq}</List.Item>                    
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content={LANG.socialMedia} />
                                <List link inverted>
                                    <List.Item as='a'>{LANG.facebook}</List.Item>
                                    <List.Item as='a'>{LANG.twitter}</List.Item>
                                    <List.Item as='a'>{LANG.instagram}</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>What's On</Header>
                                <p>
                                    {LANG.slogan}
                                </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Divider inverted section/>
                        <Grid.Row>
                            <List inverted divided horizontal link size="small">
                                <List.Item>
                                    <List.Content>
                                        <List.Header>
                                            <a href="#Contact">
                                                {LANG.contactUs}
                                            </a>
                                        </List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>
                                            <a href="#Terms">
                                                {LANG.terms}
                                            </a>
                                        </List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>
                                            <a href="#PrivacyPolicy">
                                                {LANG.privacyPolicy}
                                            </a>
                                        </List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}
