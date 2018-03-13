import React from 'react'
import {Segment, Container, Header, Divider, Dropdown, Form, Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'

import {getLocations} from '../../common/api/requests/location'

import 'react-datepicker/dist/react-datepicker.css'
import './EventTool.less'


export const DateSelector = ({label, plHolder, onClick, value}) => {
    log.debug('DateSelector#plHolder', plHolder);
    log.debug('DateSelector#value', value);
    return (
        <Form.Input
            onClick={onClick}
            value={value===''?'':`${value} Uhr`}
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
            dateFormat='ddd DD MMM YYYY - HH:mm'
            timeCaption={timeCaption}
            calendarClassName="EventTool_DatePicker"
        />
    )
}

export class LocationSelector extends React.Component {

    state = {
        isFetching: false,
        locationOptions: [],
        value: null,
        searchQuery: ''
    }

    handleChange(event, {value, ...rest}){
        log.debug('LocationSelector#handleChange', value, rest);
        this.setState({
            value: value,
            searchQuery: value,
        })
    }

    handleAddition = (event, {value, ...rest}) => {
        log.debug('LocationSelector#handleAddition', value, rest);
    }

    handleSearchChange(event,data){
        log.debug('LocationSelector#handleSearchChange', data);
        
        this.setState({
            isFetching: true,
            searchQuery: data.searchQuery,
        }),

        this.fetchLocations(data.searchQuery);
    }


    fetchLocations( searchQuery){
        getLocations(searchQuery, 0, 5)
            .then( data => {
                this.setState({
                    isFetching: false,
                    locationOptions: data.map( (locationEntry, index) => ({
                        key: index, text: locationEntry.name, value: locationEntry.name
                    })),
            })
        })
    }


    render(){
        const {value, locationOptions, isFetching, searchQuery} = this.state;
        log.debug('LocationSelector#render', locationOptions);

        return (
            <React.Fragment>
                <Form.Field>
                    <label>Location</label>
                    <Dropdown
                        fluid
                        allowAdditions
                        additionLabel={<i style={{ color: 'blue' }}>Location hinzufügen: </i>}
                        selection
                        options={locationOptions}
                        value={value}
                        placeholder='Location'
                        onChange={this.handleChange.bind(this)}
                        onSearchChange={this.handleSearchChange.bind(this)}
                        search //Todo: Update search function to pass all query options (without additions)
                        searchQuery={searchQuery}
                        loading={isFetching}
                    />
                </Form.Field>
            </React.Fragment>
        )
    }
}

export class ImageUploadFormField extends React.Component {

    state = {

    }

    componentDidMount(){
        this.input.onchange = (event => {
            
            if(this.props.onChange instanceof Function){
                this.props.onChange(event, this.input.files);
            }else{
                log.warn('onChange is not a function');
            }
        })
    }

    render() {
        return (
            <div>
                <input
                    type='file'
                    ref={(input) => this.input = input}
                    style={{ display: 'none' }}
                    multiple
                    accept='image/*'
                />
                <Button
                    onClick={event => {
                        this.input.click();
                    }}
                >
                    {this.props.text}
                </Button>
            </div>
        );
    }
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

                        <LocationSelector />

                        <ImageUploadFormField
                            text='Add Images'
                            onChange={(event, files) => {
                                log.debug('ImageUploadFormField#event', event);
                                log.debug('ImageUploadFormField#files', files);
                            }}
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