// Import modules
import React from 'react';

// Import resources
import Header from '../components/header/Header';
import Slider from '../components/slider/Slider';
import CategoryTileTable from '../components/categoryTileTable/CategoryTileTable';
import CategoryTile from '../components/categoryTile/CategoryTile'

const Home = () => (
        <div>
            <Slider title='Education'/>
            <CategoryTileTable/>
        </div>
)

export default Home;