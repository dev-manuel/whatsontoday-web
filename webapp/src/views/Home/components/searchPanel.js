import React from 'react'
import {Form, Dropdown, Button} from 'semantic-ui-react'

import './searchPanel.less'


export default class SearchPanel extends React.Component {
    state ={
        inputValue: '', // Value of the input form field
        categoryValue: null, // Value of the category drop down
        cityValue: null, // Value of city selection drop down
    }

    handleSubmit(){
        const {
            inputValue,
            categoryValue,
            cityValue,
        } = this.state;

        const {
            defaultCategory=null,
            defaultCity=null,
        } = this.props;

        this.props.onSubmit(inputValue, categoryValue || defaultCategory, cityValue || defaultCity);
    }

    render(){
        const {
            defaultCategory=null,
            defaultCity=null,
            categoryOptions,
            cityOptions,
            language,
        } = this.props;

        const {
            inputValue,
            categoryValue,
            cityValue,
        } = this.state;

        const lang = language.home;

        return (
            <div className="Home_searchPanel_container">
                <Form
                    onSubmit={this.handleSubmit.bind(this)}
                    className="Home_searchPanel_form"                
                >
                    <Form.Group
                        unstackable
                        className="Home_searchPanel_group"
                    >
                        
                        <Form.Input
                            value={inputValue}
                            onChange={(event, {value}) => this.setState({inputValue: value})}
                            placeholder={lang.search}
                            className="Home_searchPanel_input"
                        />

                        <Form.Field
                            className="Home_searchPanel_city"
                        >
                            <Dropdown
                                value={cityValue || defaultCity}
                                onChange={(event, {value}) => {this.setState({cityValue: value})}}
                                text={cityValue || defaultCity}
                                placeholder={lang.city}
                                options={cityOptions}
                                selection
                                item
                            />
                        </Form.Field>

                        <Form.Field
                            className="Home_searchPanel_category"
                        >
                            <Dropdown
                                value={categoryValue || defaultCategory}
                                onChange={(event, {value}) => this.setState({categoryValue: value})}
                                text={categoryValue || defaultCategory}
                                placeholder={lang.category}
                                options={categoryOptions}
                                selection
                                item
                            />
                        </Form.Field>

                        <Button
                            type="submit"
                            color='green'
                            className="Home_searchPanel_submit"                            
                        >
                            {lang.submit}
                        </Button>

                    </Form.Group>
                </Form>
            </div>
        )
    }
}