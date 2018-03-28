import React from 'react'
import log from 'loglevel'
import {Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {stringify} from 'query-string'

import {getCategories} from '../../common/api/requests/category'
import Slider from './components/slider'
// import CategoryTileTable from '../../components/categoryTileTable'
// import EvenTileTable from '../../components/eventTileTable'
import SearchPanel from './components/searchPanel'
import ExampleSlide from './slides/example'

import './Home.less'

class Home extends React.Component {

    state = {
        categoryOptions: [],
        isCategoryFetching: false,
    }

    componentDidMount(){
        this.setState({isCategoryFetching: true})

        getCategories()
            .then( data => {
                this.setState({
                    isCategoryFetching: false,
                    categoryOptions: data.map( category => ({
                        text: category.name,
                        value: category.id,
                    })),
                })
            })
    }


    handleSubmit({searchValue, categoryValue, cityValue}){
        const search = {};

        if(searchValue)
            search.search = searchValue;
        if(categoryValue)
            search.categories = categoryValue;
        // TODO: City

        this.props.history.push({
            pathname: '/search',
            search: stringify(search),
        });
    }

    render(){
        const {
            categoryOptions,
            isCategoryFetching,
        } = this.state;
        const {
            language,
        } = this.props;


        const defaultCity = {
            text: 'Dresden',
            value: 0
        }
        const cityOptions= [
            defaultCity,
        ]

        return (
            <div>
                <Slider
                    language={language}
                    slides={[
                        <ExampleSlide/>
                    ]}
                />
                <div className="Home_search">
                    <h1>Find your next Event!</h1>
                    <div className="Home_searchPanel">
                        <SearchPanel
                            language={language}
                            categoryOptions={categoryOptions}
                            categoryLoading={isCategoryFetching}
                            cityOptions={cityOptions}
                            defaultCity={defaultCity}
                            onSubmit={this.handleSubmit.bind(this)}
                        />
                    </div>
                </div>
                
                {/* <CategoryTileTable categoryList={categoryList} language={language}/>
                <EvenTileTable eventList={eventList} language={language}/> */}
            </div>
        )
    }
}

export default withRouter(Home);
