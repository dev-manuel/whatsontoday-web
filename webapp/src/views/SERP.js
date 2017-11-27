// Import modules
import React from 'react';

// Import resources
import './SERP.less'
import FilterPanel from '../components/filterPanel';
import EventTileTableBig from '../components/eventTileTableBig';

const SERP = () => (
        <div className="pageContent">
            <FilterPanel/>
            <div className="tileTable">
                <EventTileTableBig/>
            </div>
        </div>
)

export default SERP;