import React from 'react';
import { Segment, Container, Grid, Header, List, Divider } from 'semantic-ui-react';

const Footer = () => (
    <div>

    <Segment
        inverted
        vertical
        style={{ padding: '5em 0em' }}>
    <Container textAlign="center">
    <Grid textAlign="center" columns={3} divided inverted stackable>
        <Grid.Row>
            <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>The Team</List.Item>
                    <List.Item as='a'>FAQ</List.Item>                    
                </List>
            </Grid.Column>
            <Grid.Column width={3}>
                <Header inverted as='h4' content='Social Media' />
                <List link inverted>
                    <List.Item as='a'>Facebook</List.Item>
                    <List.Item as='a'>Twitter</List.Item>
                    <List.Item as='a'>Instagram</List.Item>
                </List>
            </Grid.Column>
            <Grid.Column width={7}>
                <Header as='h4' inverted>What's On</Header>
                <p>
                    Find your next event!
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
                                Contact Us
                            </a>
                        </List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header>
                            <a href="#Terms">
                                Terms and Conditions
                            </a>
                        </List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <List.Header>
                            <a href="#PrivacyPolicy">
                                Privacy Policy
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
);

export default Footer;
