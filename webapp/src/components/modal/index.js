import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default ({language, show, onClose}) => {
    return (
        <Modal
        open={show}
        onClose={onClose}
        basic
        size='small'
        >
        <Header icon='frown' content={language.modal.heading} />
        <Modal.Content>
            <h3>{language.modal.description}</h3>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={onClose} inverted>
            <Icon name='checkmark' /> {language.modal.button}
            </Button>
        </Modal.Actions>
        </Modal>
    )
}