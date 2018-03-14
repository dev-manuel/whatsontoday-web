import React from 'react'
import {Button} from 'semantic-ui-react'
import log from 'loglevel'

/**
 * @typedef {{status: FileEntryStatus, file: File, key: number, id: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */

/**
 * @readonly
 * @enum {string}
 */
export const FileEntryStatus = {
    LOCAL: 'local',
    LOADING: 'loading',
    UPLOADED: 'uploaded',
}

export default class ImageUploadFormField extends React.Component {

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
                    multiple={this.props.multiple || false}
                    accept='image/*'
                />
                <Button
                    fluid={this.props.fluid || false}
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