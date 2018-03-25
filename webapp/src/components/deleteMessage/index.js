import React from 'react'
import log from 'loglevel'
import {Message, Button} from 'semantic-ui-react'



export default ({onYesClick, onNoClick, heading, description, language}) => {
    const lang = language.deleteMessage;
    const messageContent = (
        <div>
            <p>{description}</p>
            <Button
                floated='left'
                color='green'
                size='tiny'
                onClick={onNoClick}
                content={lang.no}
            />
            <Button 
                floated='right'
                color='red'
                size='tiny'
                onClick={onYesClick}
                content={lang.yes}                
            />
        </div>
    )

    return (
        <Message 
            negative
            icon='exclamation triangle'
            header={heading}
            content={messageContent}                
        />
    )
}