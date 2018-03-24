// Import modules
import React from 'react';

// Import resources
import './thumbnail.less';
const activeStyle = {
    border: "5px solid red;"
}

const inactiveStyle = {

}

const Thumbnail = ({imageURI, isActive = false, onClick, global}) => {
    return (
        <div className={isActive ? 'activeThumbnail' : 'inactiveThumbnail'} onClick={onClick}>
            <img src={imageURI} className='thumbnailImage'/>
        </div>
    )
}

export default Thumbnail;