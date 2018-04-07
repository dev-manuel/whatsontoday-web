import React from 'react'
import {Segment, Container, Divider, Header, Form, Button} from 'semantic-ui-react'
import log from 'loglevel'

import {createLocation} from '../../common/api/requests/location'
import FormNavigationBar from '../../components/formNavigationBar'

export default class Create extends React.Component {

    state = {
        nameError: false,
        streetError: false,
        cityError: false,
        countryError: false,
        websiteError: false,
        commentError: false,

        nameValue: '',
        streetValue: '',
        cityValue: '',
        countryValue: '',
        websiteValue: '',
        commentValue: '',
    }

    handleBackClick(){
        this.props.history.push(this.props.location.state.from);
    }

    handleSubmit(){
        log.debug('submit!')

        const {
            nameValue,
            streetValue,
            cityValue,
            countryValue,
            websiteValue,
            commentValue
        } = this.state;
        const {
            history,
            basePath,
            location,
        } = this.props;


        createLocation(nameValue, countryValue, cityValue, streetValue,
            websiteValue===''?undefined:websiteValue, commentValue===''?undefined:commentValue)
            .then( locationResult => {
                log.debug('LocationTool#create#submit', location.state);
                history.push({
                    pathname: `${basePath}/successful`,
                    search: '?topic=create_location',
                    state: location.state,
                })
            })
            .catch( error => {
                log.debug('LocationTool#create#catch', error);
                
                const formErrors = {
                    nameError: false,
                    streetError: false,
                    cityError: false,
                    countryError: false,
                    websiteError: false,
                    commentError: false,
                }
                const errorData = error.response.data;
                
                if(errorData.name)
                    formErrors.nameError = true;
                if(errorData.street)
                    formErrors.streetError = true;
                if(errorData.city)
                    formErrors.cityError = true;
                if(errorData.country)
                    formErrors.countryError = true;
                if(errorData.website)
                    formErrors.websiteError = true;
                if(errorData.comment)
                    formErrors.commentError = true;

                this.setState(formErrors);
            })
    }

    render(){
        const lang = this.props.language. locationTool.create;

        const {
            nameError,
            cityError,
            streetError,
            countryError,
            websiteError,
            commentError,

            nameValue,
            streetValue,
            cityValue,
            countryValue,
            websiteValue,
            commentValue,
        } = this.state;

        const {location} = this.props;
        const hasFrom = location.state && location.state.from;

        return (
            <Segment vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>{'Add Location'}</Header>
                    <Divider/>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Input
                            required
                            error={nameError}
                            label={lang.name}
                            fluid
                            placeholder={lang.namePlaceholder}
                            value={nameValue}
                            onChange={(event, {value}) => this.setState({nameValue: value})}
                        />
                        <Form.Input
                            required
                            error={streetError}
                            label={lang.street}
                            fluid
                            placeholder={lang.streetPlaceholder}
                            value={streetValue}
                            onChange={(event, {value}) => this.setState({streetValue: value})}
                        />
                        <Form.Input
                            required
                            error={cityError}
                            label={lang.city}
                            fluid
                            placeholder={lang.cityPlaceholder}
                            value={cityValue}
                            onChange={(event, {value}) => this.setState({cityValue: value})}
                        />
                        <Form.Input
                            required
                            error={countryError}
                            label={lang.country}
                            fluid
                            placeholder={lang.countryPlaceholder}
                            value={countryValue}
                            onChange={(event, {value}) => this.setState({countryValue: value})}
                        />


                        <Divider
                            horizontal
                            content={lang.extra}
                        />

                        <Form.Group
                            widths='equal'
                        >
                            <Form.Input
                                error={websiteError}
                                label={lang.website}
                                fluid
                                placeholder={lang.websitePlaceholder}
                                value={websiteValue}
                                onChange={(event, {value}) => this.setState({websiteValue: value})}
                            />
                            <Form.Input
                                error={commentError}
                                label={lang.comment}
                                fluid
                                placeholder={lang.commentPlaceholder}
                                value={commentValue}
                                onChange={(event, {value}) => this.setState({commentValue: value})}
                            />
                        </Form.Group>
                        
                        <FormNavigationBar
                            nextText={lang.submit}
                            backText={lang.back}
                            hideBack={!hasFrom}
                            onBackClicked={this.handleBackClick.bind(this)}
                        />
                    </Form>
                </Container>
            </Segment>
                
        )
    }
}