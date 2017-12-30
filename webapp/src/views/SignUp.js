import React from 'react'
import {Grid} from 'semantic-ui-react'

import SignUpPanel from '../components/signUpPanel';

// Inspired by https://react.semantic-ui.com/layouts/login

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
            <SignUpPanel/>
        </Grid.Column>
    </Grid>
  </div>
)

export default SignUp;