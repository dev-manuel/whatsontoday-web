import React from 'react'

import ModalSuccess from '../../components/modalSuccess'

import { updatePassword } from '../../common/api/requests/login'

import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react'

import log from 'loglevel'

export default class OptionView extends React.Component {

    state = {
        passwordValue: '',
        passwordRepeatValue: '',

        showMatchError: false,
        showPasswordError: false,
        showModalSuccess: false
    }

    render(){
        const lang = this.props.language.options.changePassword;
        return <div>
                   <ModalSuccess message={lang.modal} show={this.state.showModalSuccess}
                       onClose={()=>{ this.props.history.push('/options')}}/>

                <Form size='large'>
                    <Segment>
                        <Message negative hidden={!this.state.showMatchError}>
                            <Message.Header>{lang.error.match.heading}</Message.Header>
                            <p>{lang.error.match.description}</p>
                        </Message>
                        <Message negative hidden={!this.state.showPasswordError}>
                            <Message.Header>{lang.error.password.heading}</Message.Header>
                            <p>{lang.error.password.description}</p>
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
        if(this.state.passwordValue == this.state.passwordRepeatValue
           && this.state.passwordValue.length > 7) {
            updatePassword(this.state.passwordValue)
            .then(data => {
                this.setState({
                    showModalSuccess: true,
                    showPasswordError: false,
                    showMatchError: false
                });
            })
            .catch(err => {
                log.debug('signIn#catch:', err);
                if(err.response.status == 400)
                    this.setState({
                        showPasswordError: true,
                        showMatchError: false
                    });
            });
        } else {
            this.setState({
                showMatchError: this.state.passwordValue != this.state.passwordRepeatValue,
                showPasswordError: this.state.passwordValue.length <= 7
            });
        }
    }
}
