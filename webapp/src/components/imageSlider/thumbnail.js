// Import modules
import React from 'react';

// Import resources
import './thumbnail.less';
const activeStyle = {
    border: "5px solid red;"
}

const inactiveStyle = {

}

const Thumbnail = ({imageURI, isActive, onClick}) => {
    return (
        <img src={imageURI} className='activeThumbnail'/>
    )
}

export default Thumbnail;