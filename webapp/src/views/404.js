import React from 'react';
import {Grid, Rating, Message} from 'semantic-ui-react';

export default ({language}) => {
    const lang = language.notFound;
    return (
        <div className='login-form'>
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
                    <Message>
                        {lang.message}
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    )
}