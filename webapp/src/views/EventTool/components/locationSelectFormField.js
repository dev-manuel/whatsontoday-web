import React from 'react'
import {Form, Dropdown} from 'semantic-ui-react'
import log from 'loglevel'


export default ({options, value, placeholder, onChange, onSearchChange, searchQuery, loading, noResultsMessage}) => {
    return (
        <React.Fragment>
            <Form.Field>
                <label>Location</label>
                <Dropdown
                    fluid
                    //allowAdditions
                    //additionLabel={<i style={{ color: 'blue' }}>Location hinzufügen: </i>}
                    selection
                    options={options}
                    value={value}
                    placeholder='Location'
                    onChange={onChange}
                    onSearchChange={onSearchChange}
                    search={ options => options} //Todo: Update search function to pass all query options (without additions)
                    // searchQuery={searchQuery} // Todo: Store search query
                    loading={loading}
                    noResultsMessage={noResultsMessage}
                />
            </Form.Field>
        </React.Fragment>
    )
}