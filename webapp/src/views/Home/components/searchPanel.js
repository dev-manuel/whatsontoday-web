import React from 'react'
import {Form, Dropdown, Button} from 'semantic-ui-react'

import './searchPanel.less'


export default class SearchPanel extends React.Component {
    state ={
        inputValue: '', // Value of the input form field
        categoryValue: null, // Value of the category drop down
        cityValue: null, // Value of city selection drop down

        categoryText: '',
        cityText: '',
    }

    
    handleCategoryChange(event, {value}){
        const newCategory = this.props.categoryOptions.find(entry => entry.value === value);
        this.setState({
            categoryValue: newCategory.value,
            categoryText: newCategory.text,
        })
    }
    handleCityChange(event, {value}){
        const newCity = this.props.cityOptions.find(entry => entry.value === value);
        this.setState({
            cityValue: newCity.value,
            cityText: newCity.text,
        })
    }
    
    handleSubmit(){
        const {
            inputValue,
            categoryValue,
            cityValue,
        } = this.state;

        const {
            defaultCategory={},
            defaultCity={},
        } = this.props;

        this.props.onSubmit({
            searchValue: inputValue,
            categoryValue: categoryValue || defaultCategory.value,
            cityValue: cityValue || defaultCity.value,
        });
    }

    render(){
        const {
            categoryLoading,
            cityLoading,
            defaultCategory={},
            defaultCity={},
            /**
             * @type {[{value: number, text: string}]}
             */
            categoryOptions,
            /**
             * @type {[{value: number, text: string}]}
             */
            cityOptions,
            language,
        } = this.props;

        const {
            inputValue,
            categoryValue,
            cityValue,
            categoryText,
            cityText,
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
                                loading={cityLoading}
                                value={cityValue || defaultCity.value}
                                onChange={this.handleCityChange.bind(this)}
                                text={cityText || defaultCity.text}
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
                                loading={categoryLoading}
                                value={categoryValue || defaultCategory.value}
                                onChange={this.handleCategoryChange.bind(this)}
                                text={categoryText || defaultCategory.text}
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