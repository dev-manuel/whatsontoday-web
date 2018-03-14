import React from 'react'
import {Table, Icon, Loader} from 'semantic-ui-react'
import log from 'loglevel'

import {FileEntryStatus} from './imageUploadFormField'

/**
 * @typedef {{status: FileEntryStatus, file: File, key: number}} FileEntry
 * @typedef {[FileEntry]} FileEntryList
 */

export const getIconByFileEntryStatus = status =>{
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


export default class FileTable extends React.Component {



    render(){
        /**
         * @type {FileEntryList}
         */
        const fileEntryList = this.props.fileEntryList;
        log.debug('FileTable#fileEntryList', fileEntryList);

        const tableEntries = fileEntryList.map((fileEntry, index) => (
            <Table.Row key={index}>
                <Table.Cell>{fileEntry.file.name}</Table.Cell>
                <Table.Cell>
                    {getIconByFileEntryStatus(fileEntry.status)}
                </Table.Cell>
            </Table.Row>
        ))

        return (
            <Table fixed>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{this.props.textFileName}</Table.HeaderCell>
                        <Table.HeaderCell>{this.props.textIsUploaded}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
        
                <Table.Body>
                    {
                        tableEntries.length !== 0 ?
                        tableEntries :
                        (
                            <Table.Row>
                                <Table.Cell>---</Table.Cell>
                                <Table.Cell>---</Table.Cell>
                            </Table.Row>   
                        )
                    }
                </Table.Body>
            </Table>
        )
    }
}