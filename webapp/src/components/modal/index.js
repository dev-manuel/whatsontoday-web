import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default ({global, show, onClose}) => {
    const LANG = global.LANG.modal;
    return (
        <Modal
        open={show}
        onClose={onClose}
        basic
        size='small'
        >
        <Header icon='frown' content={LANG.heading} />
        <Modal.Content>
            <h3>{LANG.description}</h3>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={onClose} inverted>
            <Icon name='checkmark' /> {LANG.button}
            </Button>
        </Modal.Actions>
        </Modal>
    )
}