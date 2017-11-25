// Import modules
import React from 'react';

// Import resources
import Header from '../components/header';
import Slider from '../components/slider';
import CategoryTileTable from '../components/categoryTileTable';
import EvenTileTable from '../components/eventTileTable';

const Home = () => (
        <div>
            <Slider title='Education'/>
            <CategoryTileTable/>
            <EvenTileTable/>
        </div>
)

export default Home;