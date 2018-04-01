import React from 'react'

import backgroundImage from '../../../img/slider/fliptheflop.jpg'

const divStyle = {
    background: `url(${backgroundImage}) no-repeat center center`,
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
}

const headingStyle = {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgb(255, 255, 255)',
    fontSize: 33,
}

export default class Example extends React.Component {

    render(){
        return (
            <div
                style={divStyle}
            >
                {/* <h2 style={headingStyle}>  
                    
                </h2> */}
            </div>
        )
    }
}