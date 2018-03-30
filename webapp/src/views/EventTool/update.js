import React from 'react'
import {Link} from 'react-router-dom'
import { Segment, Container, Header, Divider, Dropdown, Form, Button, Grid, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'

import {categoryTranslation} from '../../common/api/utils/categoryeTranslation'
import FormNavigationBar from '../../components/formNavigationBar'
import DateSelectFormField from './components/dateSelectFormField'
import LocationSelectFormField from './components/locationSelectFormField'
import ImageUploadFormField, {FileEntryStatus} from './components/imageUploadFormField'
import FileTable, {getIconByFileEntryStatus} from './components/fileTable'
import {getCategories} from '../../common/api/requests/category'
import {getLocations} from '../../common/api/requests/location'
import {uploadImage} from '../../common/api/requests/image'
import {updateEvent, readEvent} from '../../common/api/requests/event'

import './create.less'
import 'react-datepicker/dist/react-datepicker.css'


/**
 * @typedef {{status: FileEntryStatus, file: File, key: number, id: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */


export default class Create extends React.Component {

    state = {
        nameError: false,
        descriptionError: false,
        shortDescriptionError: false,
        fromError: false,
        toError: false,
        locationError: false,

        eventIsFetching: true,
        eventData: null,

        nameValue: '',
        categoryValue: [],
        categoryOptions: [],
        categoryIsFetching: true, // fetch when page is loaded --> componentDidMount

        fromValue: null,
        toValue: null,

        locationIsFetching: true, // fetch when page is loaded --> componentDidMount
        locationOptions: [],
        locationValue: null,
        // locationSearchQuery: '',

        descriptionValue: '',
        shortDescriptionValue: '',
        
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
        this.fetchEventData();
        this.fetchCategory();
        this.fetchLocations(''); // "default"-value = "empty string" 
    }

    //
    // ─── SUBMIT ─────────────────────────────────────────────────────────────────────
    //
    handleSubmit(){
        log.debug('submit!')
        
        const {
            eventData,

            nameValue,
            categoryValue,
            categoryOptions,
            categoryIsFetching,
            fromValue,
            toValue,
            locationIsFetching,
            locationOptions,
            locationValue,
            // locationSearchQuery,
            descriptionValue,
            shortDescriptionValue,
            thumbnailImage,
            sliderImages,
        } = this.state;

        const parsedFrom = fromValue ? fromValue.toDate() : null;
        const parsedTo = toValue ? toValue.toDate() : null;
        const parsedThumbnailImage = (thumbnailImage && thumbnailImage.id) ? [{id: thumbnailImage.id, tag: 'thumbnail'}] : [];
        const parsedSliderImage = sliderImages.map(fileEntry => ({id: fileEntry.id, tag: 'slider'}));

        const updateThumbnailImage = (parsedThumbnailImage.length === 0) ?
            [eventData.images.find(image => image.tag === 'thumbnail')].filter(value => !!value) :
            parsedThumbnailImage;
        const updateSliderImage = (parsedSliderImage.length === 0) ?
            eventData.images.filter(image => image.tag === 'slider') :
            parsedSliderImage;

        updateEvent(this.props.match.params.id ,nameValue, descriptionValue, shortDescriptionValue, locationValue || eventData.location.id,
            parsedFrom, parsedTo,
            updateSliderImage.concat(updateThumbnailImage),
            categoryValue)
            .then(data => {
                log.debug('Update#handleSubmit#handleSubmit#data', data);

                this.props.history.push(`${this.props.basePath}/successful?topic=update_event`);
            })
            .catch(error => {
                log.debug('Update#handleSubmit#handleSubmit#error', error);
                const errorData = error.response.data;
                let successful = true;

                const formErrors = {
                    nameError: false,
                    descriptionError: false,
                    shortDescriptionError: false,
                    fromError: false,
                    toError: false,
                    locationError: false,
                }

                if(errorData.name){
                    formErrors.nameError = true;
                    successful = false;
                }
                if(errorData.shortDescription){
                    formErrors.shortDescriptionError = true;
                    successful = false;
                }
                if(errorData.description){
                    formErrors.descriptionError = true;
                    successful = false;
                }
                if(errorData.from){
                    formErrors.fromError = true;
                    successful = false;
                }
                if(errorData.to){
                    formErrors.toError = true;
                    successful = false;
                }

                const indexOfLocationPrefixedKeys = Object.keys(errorData).findIndex(keyName => keyName.startsWith('location'));
                log.debug('Update#handleSubmit#handleSubmit#indexOfLocationPrefixedKeys', indexOfLocationPrefixedKeys)
                if( indexOfLocationPrefixedKeys !== -1){
                    formErrors.locationError = true;
                    successful = false;
                }

                this.setState(formErrors);
                log.debug('Update#handleSubmit#handleSubmit#formErrors', formErrors);                
                log.info('Submit successful:', successful);
            })
    }

    handleBackClick(){
        this.props.history.push(this.props.location.state.from);
    }

    //
    // ─── EVENT ──────────────────────────────────────────────────────────────────────
    //
    fetchEventData(){
        const id = this.props.match.params.id;
        readEvent(id)
            .then(data => {
                this.setState({
                    eventData: data,
                    nameValue: data.name,
                    categoryValue: data.categories.map(category => category.id),
                    descriptionValue: data.description,
                    shortDescriptionValue: data.shortDescription,
                    fromValue: moment(data.from),
                    toValue: data.to ? moment(data.to) : null,
                })
            })
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
                        text: categoryTranslation(category.name, this.props.language.categories),
                        value: category.id,
                    }))
                log.debug('Update#fetchCategory#categoryOptions', categoryOptions);
                
                this.setState({
                    categoryOptions,
                    categoryIsFetching: false,
                })

            })
            .catch(error => {
                log.debug('Update#fetchCategory#error', error);
                this.setState({
                    categoryIsFetching: false,
                })
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
            .then( locationResult => {
                const locationOptions = locationResult.map( (locationEntry, index) => ({
                    key: index,
                    text: locationEntry.name,
                    value: locationEntry.id,
                }))
                log.debug('Update#fetchLocations#locationOptions', locationOptions);

                this.setState({
                    locationIsFetching: false,
                    locationOptions,
                })
            })
            .catch(error => {
                log.debug('Update#fetchLocations#error', error);
                this.setState({
                    locationIsFetching: false,
                })
            })
    }
    handleLocationChange(event, {value, ...rest}){
        log.debug('Update#handleLocationChange', value, rest);
        
        this.setState({
            locationValue: value,
        })
    }
    handleLocationSearchChange(event, {searchQuery, ...rest}){
        log.debug('Update#handleLocationSearchChange', searchQuery, rest);
        
        this.setState({
            locationIsFetching: true,
        }),

        this.fetchLocations(searchQuery);
    }

    //
    // ─── THUMBNAILIMAGE ─────────────────────────────────────────────────────────────
    //
    handleThumbnailImageSelection(event, files){
        log.debug('handleThumbnailImageSelection#event', event);
        log.debug('handleThumbnailImageSelection#files', files);

        const thumbnailImage = {
            status: FileEntryStatus.LOADING,
            key: 0,
            id: null,
            file: files.item(0),
        }

        this.setState({
            thumbnailImage,
        })

        
        uploadImage(thumbnailImage.file)
            .then(data => {
                this.setState((prevState, props) => {
                    const newThumbnailImage = prevState.thumbnailImage;
                    newThumbnailImage.status =  FileEntryStatus.UPLOADED;
                    newThumbnailImage.id = data.id;
                    return {
                        thumbnailImage: newThumbnailImage,
                    }
                })
            })
            .catch(error => {
                log.debug('handleSliderImageSelection#error', error);
            })
    }
    
    //
    // ─── SLIDERIMAGES ───────────────────────────────────────────────────────────────
    //
    handleSliderImageSelection(event, files){
        log.debug('handleSliderImageSelection#event', event);
        log.debug('handleSliderImageSelection#files', files);

        const sliderImages = Array.from(files).map( (file, index) => ({
            status: FileEntryStatus.LOADING,
            key: index,
            id: null,
            file,
        }));

        this.setState({
            sliderImages,
        })

        sliderImages.forEach(fileEntry => {
            uploadImage(fileEntry.file)
                .then(data => {
                    this.setState((prevState, props) => {

                        const index = prevState.sliderImages.findIndex(entry => entry.key===fileEntry.key);
                        if(index === -1){ // Not found
                        } else {
                            const newSliderImages = prevState.sliderImages;
                            newSliderImages[index].status = FileEntryStatus.UPLOADED;
                            newSliderImages[index].id = data.id;
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
    
    //
    // ─── RENDER ─────────────────────────────────────────────────────────────────────
    //  
    render(){

        const {
            language,
            location,
        } = this.props;
        const {
            nameError,
            nameValue,
            
            categoryIsFetching,
            categoryOptions,
            categoryValue,
            
            descriptionError,
            descriptionValue,
            shortDescriptionError,
            shortDescriptionValue,
            
            fromError,
            fromValue,
            
            toError,
            toValue,
            
            locationIsFetching,
            locationOptions,
            locationValue,
            locationError,
            // locationSearchQuery,
            
            thumbnailImage,
            sliderImages,
        } = this.state;
        
        const lang = language.eventTool.update;
        const hasFrom = location.state && location.state.from;
        
        return (
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{lang.updateEvent}</Header>

                    <Message
                        icon='idea'
                        content={lang.hint}
                    />
                    <Divider/>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group  widths='equal'>
                            <Form.Input
                                error={nameError}
                                label={lang.name}
                                fluid
                                placeholder={lang.namePlaceholder}
                                value={nameValue}
                                onChange={(event, {value}) => this.setState({nameValue: value})}
                            />
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
                                    options={categoryOptions}
                                    loading={categoryIsFetching}
                                    noResultsMessage={lang.noResults}                                    
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.TextArea
                            error={shortDescriptionError}
                            label={lang.shortDescription}
                            placeholder={lang.shortDescriptionPlaceholder}
                            value={shortDescriptionValue}
                            onChange={(event, {value}) => this.setState({shortDescriptionValue: value})}
                        />

                        <Form.TextArea
                            error={descriptionError}
                            label={lang.description}
                            placeholder={lang.descriptionPlaceholder}
                            value={descriptionValue}
                            onChange={(event, {value}) => this.setState({descriptionValue: value})}
                        />

                        <Grid stackable columns={2}>
                            <Grid.Column width={8}>
                                <DateSelectFormField
                                    error={fromError}
                                    placeholder={lang.fromPlaceholder}
                                    label={lang.from}
                                    minDate={moment()}
                                    selected={fromValue}
                                    onChange={date => {this.setState({fromValue: date})}}
                                    timeCaption={this.props.language.time.time}
                                    locale={this.props.language.time.locale}
                                />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <DateSelectFormField
                                    error={toError}
                                    placeholder={lang.toPlaceholder}
                                    label={lang.to}
                                    minDate={moment()}
                                    selected={toValue}
                                    onChange={date => {this.setState({toValue: date})}}
                                    timeCaption={this.props.language.time.time}
                                    locale={this.props.language.time.locale}
                                />
                            </Grid.Column>
                        </Grid>

                        <LocationSelectFormField
                            error={locationError}                        
                            options={locationOptions}
                            value={locationValue}
                            placeholder={lang.locationPlaceholder}
                            onChange={this.handleLocationChange.bind(this)}
                            onSearchChange={this.handleLocationSearchChange.bind(this)}
                            // searchQuery={locationSearchQuery}
                            loading={locationIsFetching}
                            noResultsMessage={lang.noResults}                                    
                        />

                        <Link
                            to={{
                                pathname: '/location_tool/create',
                                state: {
                                    from: this.props.location,
                                },
                            }}
                        >
                            <Button
                                color='gray'
                                content={lang.createNewLocation}
                            />
                        </Link>
                        

                        <Divider horizontal>{lang.images}</Divider>

                        <Grid columns={2}>
                            <Grid.Column width={4}>
                                <ImageUploadFormField
                                    text={lang.thumbnailImageUploadButtonAddImage}
                                    onChange={this.handleThumbnailImageSelection.bind(this)}
                                    fluid
                                />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                    {
                                        thumbnailImage ?
                                        (<p>
                                            {thumbnailImage.file.name}
                                            {getIconByFileEntryStatus(thumbnailImage.status)}
                                        </p>) :
                                        <p>{lang.thumbnailImageNoFileSelected}</p>
                                    }
                            </Grid.Column>
                        </Grid>

                        <Grid columns={2}>
                            <Grid.Column width={4}>
                                <ImageUploadFormField
                                    text={lang.sliderImageUploadButtonAddImage}
                                    onChange={this.handleSliderImageSelection.bind(this)}
                                    multiple
                                    fluid
                                />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <FileTable
                                    textFileName={lang.sliderImageFileTableFileName}
                                    textIsUploaded={lang.sliderImageFileTableIsUploaded}
                                    fileEntryList={sliderImages}
                                />
                            </Grid.Column>
                        </Grid>
                        
                        <div className="EventTool_create_formNavBar">
                            <FormNavigationBar
                                nextText={lang.submit}
                                backText={lang.back}
                                hideBack={!hasFrom}
                                onBackClicked={this.handleBackClick.bind(this)}
                            />
                        </div>
                    </Form>

                </Container>
            </Segment>
        )
    }
}