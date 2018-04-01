import React from 'react'

import backgroundImage from '../../../img/slider/decompiledBg.jpg'

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
    fontSize: 44,
}

export default class Example extends React.Component {

    render(){
        return (
            <div
                style={divStyle}
            >
                <h2 style={headingStyle}>  
                    DecompileD Conference <br/>
                    06. April 2018, Dresden
                </h2>
            </div>
        )
    }
}