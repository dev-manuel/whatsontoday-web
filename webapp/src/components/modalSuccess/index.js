import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default ({message, show, onClose}) => {
    return (
            <Modal
        open={show}
        onClose={onClose}
        basic
        size='small'
            >
            <Header icon='smile' content={message.heading} />
            <Modal.Content>
            <h3>{message.description}</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={onClose} inverted>
            <Icon name='checkmark' /> {message.button}
        </Button>
            </Modal.Actions>
            </Modal>
    )
}
