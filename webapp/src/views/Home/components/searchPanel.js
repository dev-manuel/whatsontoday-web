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

        this.props.onSubmit(inputValue, categoryValue, cityValue);
    }

    render(){
        const {
            categoryOptions,
            cityOptions,
        } = this.props;

        const {
            inputValue,
            categoryValue,
            cityValue,
        } = this.state;

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
                            placeholder='Search...'
                            className="Home_searchPanel_input"
                        />

                        <Form.Field
                            className="Home_searchPanel_city"
                        >
                            <Dropdown
                                value={cityValue}
                                onChange={(event, {value}) => this.setState({cityValue: value})}
                                text={cityValue}
                                options={cityOptions}
                                selection
                                item
                            />
                        </Form.Field>

                        <Form.Field
                            className="Home_searchPanel_category"
                        >
                            <Dropdown
                                value={categoryValue}
                                onChange={(event, {value}) => this.setState({categoryValue: value})}
                                text='Category'
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
                            {'submit'}
                        </Button>

                    </Form.Group>
                </Form>
            </div>
        )
    }
}