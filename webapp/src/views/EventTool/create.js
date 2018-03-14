import React from 'react'
import {Segment, Container, Header, Divider, Dropdown, Form, Button, Table, Icon, Loader} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'

import DateSelectFormField from './components/dateSelectFormField'
import LocationSelectFormField from './components/locationSelectFormField'
import {getLocations} from '../../common/api/requests/location'
import {uploadImage} from '../../common/api/requests/image'

import 'react-datepicker/dist/react-datepicker.css'





/**
 * @readonly
 * @enum {string}
 */
export const FileEntryStatus = {
    LOCAL: 'local',
    LOADING: 'loading',
    UPLOADED: 'uploaded',
}

/**
 * @typedef {{status: FileEntryStatus, file: File, key: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */

export class ImageUploadFormField extends React.Component {

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

class FileTable extends React.Component {

    getIconByFileEntryStatus(status){
        switch(status){
            case FileEntryStatus.LOCAL:
                return <Icon name='close' color='red' size='large'/>
            break;

            case FileEntryStatus.LOADING:
                return <Loader active inline size='small'/>
            break;

            case FileEntryStatus.UPLOADED:
                return <Icon name='checkmark' color='green' size='large'/>
            break;

            default:
            break;
        }
    }

    render(){
        /**
         * @type {FileEntryList}
         */
        const fileEntryList = this.props.fileEntryList;
        log.debug('FileTable#fileEntryList', fileEntryList);

        

        return (
            <Table fixed>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>FileName</Table.HeaderCell>
                        <Table.HeaderCell>Is Uploaded</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
        
                <Table.Body>
                    {
                        fileEntryList.map((fileEntry, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{fileEntry.file.name}</Table.Cell>
                                <Table.Cell>
                                    {this.getIconByFileEntryStatus(fileEntry.status)}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        )
    }
}


export default class Create extends React.Component {

    state = {
        name: '',
        categories: [],
        from: null,
        to: moment.now(),

        locationIsFetching: false,
        locationOptions: [],
        locationValue: null,
        locationSearchQuery: '',

        description: '',
        /**
         * @type {FileEntry}
         */
        thumbnailImage: null,
        /**
         * @type {FileEntryList}
         */
        sliderImages: [],
    }

    //
    // ─── LOCATION ───────────────────────────────────────────────────────────────────
    //
    fetchLocations( searchQuery){
        getLocations(searchQuery, 0, 5)
            .then( data => {
                const locationOptions = data.map( (locationEntry, index) => ({
                    key: index, text: locationEntry.name, value: locationEntry.name
                }))
                log.debug('Create#fetchLocations#locationOptions', locationOptions);
                
                this.setState({
                    locationIsFetching: false,
                    locationOptions,
                })
            })
            .catch(error => {
                log.debug('Create#fetchLocations#error', error);
                this.setState({
                    locationIsFetching: false,
                })
            })
    }
    handleLocationChange(event, {value, ...rest}){
        log.debug('Create#handleLocationChange', value, rest);
        this.setState({
            locationValue: value,
            locationSearchQuery: value,
        })
    }
    handleLocationSearchChange(event, {searchQuery, ...rest}){
        log.debug('Create#handleLocationSearchChange', searchQuery, rest);
        
        this.setState({
            locationIsFetching: true,
            locationSearchQuery: searchQuery,
        }),

        this.fetchLocations(searchQuery);
    }


    //
    // ─── SLIDERIMAGES ───────────────────────────────────────────────────────────────
    //
    handleSliderImageSelection(event, files){
        log.debug('ImageUploadFormField#event', event);
        log.debug('ImageUploadFormField#files', files);

        const sliderImages = Array.from(files).map( (file, index) => ({
            status: FileEntryStatus.LOADING,
            key: index,
            file,
        }));

        this.setState({
            sliderImages,
        })

        sliderImages.forEach(fileEntry => {
            uploadImage(fileEntry.file, `img${Math.floor(Math.random()*1000000)}`)
                .then(data => {
                    this.setState((prevState, props) => {

                        const index = prevState.sliderImages.findIndex(entry => entry.key===fileEntry.key);
                        if(index === -1){ // Not found
                        } else {
                            const newSliderImages = prevState.sliderImages;
                            newSliderImages[index].status = FileEntryStatus.UPLOADED;
                            return {
                                sliderImages: newSliderImages,
                            }
                        }
                    })
                })
                .catch(error => {
                    log.debug('handleSliderImageSelection#error', error);
                })
        })
    }
    

    render(){
        const categoryOptions = [{
            key: 'party',
            value: 'party',
            text: 'party',
        }]

        const lang = this.props.language.eventTool.create;

        const {
            locationIsFetching,
            locationOptions,
            locationValue,
            locationSearchQuery,
        } = this.state;

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

                        <LocationSelectFormField
                            options={locationOptions}
                            value={locationValue}
                            placeholder={'Location'}
                            onChange={this.handleLocationChange.bind(this)}
                            onSearchChange={this.handleLocationSearchChange.bind(this)}
                            searchQuery={locationSearchQuery}
                            loading={locationIsFetching}
                        />

                        <ImageUploadFormField
                            text='Add Images'
                            onChange={this.handleSliderImageSelection.bind(this)}
                        />
                        
                        <FileTable
                            fileEntryList={this.state.sliderImages}
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