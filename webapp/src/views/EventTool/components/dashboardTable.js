import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Icon} from 'semantic-ui-react'

export default class DashboardTable extends React.Component {

    render(){
        const {
            eventList,
            basePath,
            language,
        } = this.props;

        const lang = language.eventTool.dashboard;
        const tableEntries = eventList.map((event, index) => (
            <Table.Row key={index}>
                <Table.Cell>{event.id}</Table.Cell>
                <Table.Cell>
                    <Link to={`${basePath}/update/${event.id}`}>   
                        {event.name}
                    </Link>
                    <Link to={`${basePath}/delete/${event.id}`}>
                        <Icon
                            color='red'
                            name='trash'
                            style={{float: 'right'}}
                        />
                    </Link>
                </Table.Cell>
            </Table.Row>
        ))

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{lang.id}</Table.HeaderCell>
                        <Table.HeaderCell>{lang.name}</Table.HeaderCell>
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