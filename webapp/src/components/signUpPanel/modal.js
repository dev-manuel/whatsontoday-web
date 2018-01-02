import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalError = ({show, onClose}) => (
    <Modal
    open={show}
    onClose={onClose}
    basic
    size='small'
    >
    <Header icon='frown' content='Sorry' />
    <Modal.Content>
        <h3>An error occurred. Please try later again.</h3>
    </Modal.Content>
    <Modal.Actions>
        <Button color='green' onClick={onClose} inverted>
        <Icon name='checkmark' /> Got it
        </Button>
    </Modal.Actions>
    </Modal>
)

export default ModalError;