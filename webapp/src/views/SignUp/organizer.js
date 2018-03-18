import React from 'react'
import {Grid} from 'semantic-ui-react'

import Successful from './successful'
import OrganizerSignUpForm from './components/organizerSignUpForm'


export default class User extends React.Component {

    state={
        showSuccessView: false,
    }

    onSuccess(){
        this.setState({
            showSuccessView: true,
        })
    }

    render(){
        return this.state.showSuccessView ?
            <Successful 
            language={this.props.language} /> :
            (
                <div className='login-form'>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <OrganizerSignUpForm 
                            onSuccess={this.onSuccess.bind(this)}
                            language={this.props.language}
                        />
                    </Grid.Column>
                </Grid>
            </div>
            )
    }
}

