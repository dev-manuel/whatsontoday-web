import React from 'react'
import log from 'loglevel'
import {Button} from 'semantic-ui-react'

import Slider from './components/slider'
import CategoryTileTable from '../../components/categoryTileTable'
import EvenTileTable from '../../components/eventTileTable'
import exampleTileImage from '../../img/example_tile.png'
import SearchPanel from './components/searchPanel'
import ExampleSlide from './slides/example'

import './Home.less'

const Home = ({language}) => {
    const options= [
        {
                text: 'Jenny Hess',
                value: 'Jenny Hess',
        },
    ]
    
    const socialMediaSize = 'huge';
    const lang = language.externalLinks;

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
                    <ExampleSlide/>
                ]}
            />
            <div
                className="Home_socialMedia"
            >
                <div>
                    <Button href={lang.facebook} size={socialMediaSize} circular color='facebook' icon='facebook f' />
                    <Button href={lang.twitter} size={socialMediaSize} circular color='twitter' icon='twitter' />
                    <Button href={lang.instagram} size={socialMediaSize} circular color='instagram' icon='instagram' />
                </div>
            </div>
            {/* <CategoryTileTable categoryList={categoryList} language={language}/>
            <EvenTileTable eventList={eventList} language={language}/> */}
        </div>
    )
}

export default Home;
