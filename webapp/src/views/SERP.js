import React from 'react'
import {parse} from 'query-string'

import './SERP.less'
import FilterPanel from '../components/filterPanel'
import EventTileTableBig from '../components/eventTileTableBig'
import StatefulView from '../common/StatefulView'
import AbstractViewState from '../common/AbstractViewState'
import {api, apiEnums} from '../common/api'


const LoremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';


export default class SERP extends StatefulView{
    constructor(props){
        super(props);
        this.state = {
            viewState: new LoadingState(this),
            eventList: [],
        }
    }
}

//
// ─── VIEW-STATES ─────────────────────────────────────────────────────────────────
//

class LoadingState extends AbstractViewState{

    constructor(context){
        super(context);
        this.requestPageData();
    }

    requestPageData(){
        const {search} = parse(this.context.props.query);


        api.searchEvents(search)
            .then( eventList => {
                this.context.setState({
                    eventList,
                    viewState: new ShowingState(this.context),
                });

            })
            .catch( error => {
                console.log(error);
            })
    }

    /**
     * @override
     */
    render() {
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
               Loading...
            </div>
        )
    }
}

class ShowingState extends AbstractViewState{
    /**
     * @override
     */
    render(){
        const global = this.context.props.global;
        return (
            <div className="pageContent">
                {/* <FilterPanel global={global}/> */}
                <div className="tileTable">
                    <EventTileTableBig eventList={this.context.state.eventList} global={global}/>
                </div>
            </div>
        )
    }
}

// Todo
class ErrorState extends AbstractViewState{
    
    /**
     * @override
     */
    render() {
        return (
            <div style={{marginLeft: '11%', marginRight: '11%'}}>
                An error occurred!
            </div>
        )
    }
}