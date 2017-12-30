import React from 'react'
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

const SignUpPanel = () => (
    <div>
        <Header color='grey' as='h2' textAlign='center'>
            SignUp to WhatsOn
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
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Repeat password'
                type='password'
            />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Button color='olive' fluid size='large'>Let's go!</Button>
            </Segment>
        </Form>
    </div>
)

export default SignUpPanel;