import React from 'react'
import {Grid, Message} from 'semantic-ui-react'


export default class Successful extends React.Component {
    render(){
    const lang = this.props.language.signUp;
    return (
            <div>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Message>
                            {lang.success}
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}