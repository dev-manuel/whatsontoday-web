import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

// Copied from https://react.semantic-ui.com/layouts/login

const SignUp = () => (
  <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.

      height: -webkit-calc(100% - 127px);
        height:    -moz-calc(100% - 127px);
        height:         calc(100% - 127px);
        
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
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
      </Grid.Column>
    </Grid>
  </div>
)

export default SignUp;