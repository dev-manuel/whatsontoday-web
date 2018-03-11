import React from 'react'
import {Message, Segment, Container, Button} from 'semantic-ui-react'

export default class OptionView extends React.Component {

    render(){
        const lang = this.props.language.options;

        const messageContent = (
            <div>
                <p>{lang.deleteAccountDescription}</p>
                <Button floated='left' color='green' size='tiny'>{lang.no}</Button>
                <Button floated='right' color='red' size='tiny'>{lang.yes}</Button>
            </div>
        )

        return (
            <Segment vertical>
                <Container text>
                    <Message 
                        negative
                        icon='exclamation triangle'
                        header={lang.deleteAccountMessage}
                        content={messageContent}                
                    />
                </Container>
            </Segment>
        )
    }
}