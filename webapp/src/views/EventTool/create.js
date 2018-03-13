import React from 'react'
import {Segment, Container, Header, Divider, Dropdown, Form, Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'


import 'react-datepicker/dist/react-datepicker.css'
import './EventTool.less'


export const DateSelector = ({label, plHolder, onClick, value}) => {
    log.debug('DateSelector#plHolder', plHolder);
    return (
        <Form.Input
            onClick={onClick}
            value={value}
            placeholder={plHolder}
            label={label}
        />
    )
}

export const DateSelectFormField = ({selected, onChange, placeholder, label, timeCaption, minDate}) => {
    return(
        <DatePicker
            minDate={minDate}
            selected={selected}
            onChange={onChange}
            customInput={<DateSelector plHolder={placeholder} label={label}  />}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption={timeCaption}
            calendarClassName="EventTool_DatePicker"
        />
    )
}


export default class Create extends React.Component {

    state = {
        name: '',
        categories: [],
        from: null,
        to: moment.now(),
        location: {},
        description: ''
    }

    
    render(){
        const categoryOptions = [{
            key: 'party',
            value: 'party',
            text: 'party',
        }]

        const lang = this.props.language.eventTool.create;

        return (
            <div>
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.addEvent}</Header>
                    <Divider/>

                    <Form>
                        <Form.Group  widths='equal'>
                            <Form.Input label={lang.name} fluid placeholder={lang.namePlaceholder} />
                            <Form.Field>
                                <label>{lang.categories}</label>
                                <Dropdown placeholder={lang.categoriesPlaceholder} fluid multiple search selection options={categoryOptions} />
                            </Form.Field>
                        </Form.Group>

                        <DateSelectFormField
                            placeholder={lang.fromPlaceholder}
                            label={lang.from}
                            minDate={moment()}
                            selected={this.state.from}
                            onChange={date => {this.setState({from: date})}}
                            timeCaption={this.props.language.time.time}
                        />
                       

                        <Form.TextArea label={lang.description} placeholder={lang.descriptionPlaceholder} />
                        <Form.Button>{lang.submit}</Form.Button>
                    </Form>

                </Container>
            </Segment>
            </div>
        )
    }
}