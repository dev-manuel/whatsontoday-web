import React from 'react'
import {Table, Icon, Loader} from 'semantic-ui-react'
import log from 'loglevel'

import {FileEntryStatus} from './imageUploadFormField'

/**
 * @typedef {{status: FileEntryStatus, file: File, key: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */

export default class FileTable extends React.Component {

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