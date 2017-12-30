import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

const SignInPanel = () => (
    <div>
        <Header color='grey' as='h2' textAlign='center'>
            Log-in to your account
        </Header>
        <Form size='large'>
            <Segment>
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />

                <Button color='olive' fluid size='large'>Login</Button>
            </Segment>
        </Form>
        <Message>
            New to us? <a href='#'>Sign Up</a>
        </Message>
    </div>
)

export default SignInPanel;