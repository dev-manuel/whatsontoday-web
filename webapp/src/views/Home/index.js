import React from 'react'
import log from 'loglevel'

import Slider from './components/slider'
import CategoryTileTable from '../../components/categoryTileTable'
import EvenTileTable from '../../components/eventTileTable'
import exampleTileImage from '../../img/example_tile.png'
import SearchPanel from './components/searchPanel'

import backgroundImage from '../../img/blurred.jpeg'
import './Home.less'

const Home = ({language}) => {
    const options= [
        {
                text: 'Jenny Hess',
                value: 'Jenny Hess',
        },
    ]
    
    return (
        <div>
            <div className="Home_search">
                <h1>Find your next event!</h1>
                <div className="Home_searchPanel">
                    <SearchPanel
                        language={language}
                        categoryOptions={options}
                        cityOptions={options}
                        defaultCity='Dresden'
                        onSubmit={(searchValue, categoryValue, cityValue) => {
                            log.info('Home#SearchPanel#submit', searchValue, categoryValue, cityValue);
                        }}
                    />
                </div>
            </div>
            <Slider
                language={language}
                slides={[
                    <img src={backgroundImage}/>
                ]}
            />
            {/* <CategoryTileTable categoryList={categoryList} language={language}/>
            <EvenTileTable eventList={eventList} language={language}/> */}
        </div>
    )
}

export default Home;
