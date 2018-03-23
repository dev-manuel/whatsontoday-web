import React from 'react'

import ModalError from '../../components/modal'

import { updatePassword } from '../../common/api/requests/login'

import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

export default class OptionView extends React.Component {

    state = {
        passwordValue: '',
        passwordRepeatValue: '',

        showModalError: false,
        showPasswordError: false,
    }

    render(){
        const lang = this.props.language.options.changePassword;
        return <div>
                <ModalError language={this.props.language} show={this.state.showModalError} onClose={()=>{this.setState({showModalError: false})}}/>

                <Form size='large'>
                    <Segment>
                        <Message negative hidden={!this.state.showPasswordError}>
                            <Message.Header>{lang.errorHeading}</Message.Header>
                            <p>{lang.errorDescription}</p>
                        </Message>
                        <Form.Input
                            value={this.state.passwordValue}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={lang.password}
                            type='password'
                            onChange={ event => { this.setState({passwordValue: event.target.value}) }}
                        />
                        <Form.Input
                            value={this.state.passwordRepeat}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={lang.passwordRepeat}
                            type='password'
                            onChange={ event => { this.setState({passwordRepeatValue: event.target.value}) }}
                        />

                        <Button color='olive' fluid size='large' onClick={this.handleSubmit.bind(this)}>{lang.submit}</Button>
                    </Segment>
                </Form>
            </div>
    }

    handleSubmit(){
        updatePassword(this.state.passwordValue)
            .then(data => {
                
            })
            .catch(err => {
                log.debug('signIn#catch:', err);
                if(err.response.status == 400)
                    this.setState({
                            showCredentialError: true,
                        });
        })
    }
}
