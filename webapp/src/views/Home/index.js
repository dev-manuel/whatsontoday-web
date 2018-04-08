import React from 'react'
import log from 'loglevel'
import {Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {stringify} from 'query-string'

import {categoryTranslation} from '../../common/api/utils/categoryeTranslation'
import {getCategories} from '../../common/api/requests/category'
import Slider from './components/slider'
// import CategoryTileTable from '../../components/categoryTileTable'
// import EvenTileTable from '../../components/eventTileTable'
import SearchPanel from './components/searchPanel'

import WhatsOnSlide from './slides/whatsOn'
import ClubMensaSlide from './slides/clubmensa'
import ScienceMarchSlide from './slides/sciencemarch'

import './Home.less'

class Home extends React.Component {

    state = {
        categoryOptions: [],
        isCategoryFetching: false,
    }

    componentDidMount(){
        this.setState({isCategoryFetching: true})

        // Fetch categories
        getCategories()
            .then( data => {
                this.setState({
                    isCategoryFetching: false,
                    categoryOptions: data.map( category => ({
                        text: categoryTranslation(category.name, this.props.language.categories),
                        value: category.id,
                    })),
                })
            })
            .catch( error => {
                log.debug('Home#getCategories#catch', error);
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
                        <ClubMensaSlide/>,
                        <ScienceMarchSlide/>,
                        <WhatsOnSlide/>,
                    ]}
                />
                <div className="Home_search">
                    <h1>{language.home.slogan}</h1>
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
