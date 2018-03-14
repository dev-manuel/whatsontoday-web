import React from 'react'
import GridColumn, { Segment, Container, Header, Divider, Dropdown, Form, Button, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'

import DateSelectFormField from './components/dateSelectFormField'
import LocationSelectFormField from './components/locationSelectFormField'
import ImageUploadFormField, {FileEntryStatus} from './components/imageUploadFormField'
import FileTable from './components/fileTable'
import {getCategories} from '../../common/api/requests/category'
import {getLocations} from '../../common/api/requests/location'
import {uploadImage} from '../../common/api/requests/image'

import 'react-datepicker/dist/react-datepicker.css'

/**
 * @typedef {{status: FileEntryStatus, file: File, key: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */


export default class Create extends React.Component {

    state = {
        name: '',
        categoryValue: [],
        categoryOptions: [],
        categoryIsFetching: false,
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

    componentDidMount(){
        this.setState({
            categoryIsFetching: true,
        });
        this.fetchCategory();
    }

    //
    // ─── CATEGORY ─────────────────────────────────────────────────────────────────
    //
    fetchCategory(){
        getCategories()
            .then(data =>  {
                const categoryOptions = data
                    .filter(category => category.id!==1)
                    .map((category, index) => ({
                        key: category.id,
                        text: category.name,
                        value: category.id,
                    }))
                log.debug('Create#fetchCategory#categoryOptions', categoryOptions);
                
                this.setState({
                    categoryOptions,
                    categoryIsFetching: false,
                })

            })
            .catch(error => {
                log.debug('Create#fetchCategory#error', error);
            })
    }
    handleCategoryChange(event, {value, ...rest}){
        this.setState({
            categoryValue: value,
        })
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
                                <Dropdown
                                    placeholder={lang.categoriesPlaceholder}
                                    onChange={this.handleCategoryChange.bind(this)}
                                    fluid
                                    multiple
                                    // search
                                    selection
                                    selectedLabel={null} //No label selected
                                    options={this.state.categoryOptions}
                                    loading={this.state.categoryIsFetching}
                                    noResultsMessage={lang.noResults}                                    
                                />
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
                        
                        <Form.TextArea label={lang.description} placeholder={lang.descriptionPlaceholder} />

                        <Divider horizontal>Images</Divider>

                        <Grid columns={2}>
                            <Grid.Column width={4}>
                                <ImageUploadFormField
                                    text={lang.sliderImageUploadButtonAddImage}
                                    onChange={this.handleSliderImageSelection.bind(this)}
                                    multiple
                                />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <FileTable
                                    textFileName={lang.sliderImageFileTableFileName}
                                    textIsUploaded={lang.sliderImageFileTableIsUploaded}
                                    fileEntryList={this.state.sliderImages}
                                />
                            </Grid.Column>
                        </Grid>

                        

                        <Form.Button>{lang.submit}</Form.Button>
                    </Form>

                </Container>
            </Segment>
            </div>
        )
    }
}