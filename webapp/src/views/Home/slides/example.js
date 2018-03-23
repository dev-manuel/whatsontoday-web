import React from 'react'

import backgroundImage from '../../../img/blurred.jpeg'

const divStyle = {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    height: '100%',
    width: '100%',
}

const headingStyle = {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgb(41, 47, 50)',
    fontSize: 33,
}

export default class Example extends React.Component {

    render(){
        return (
            <div
                style={divStyle}
            >
                <h2
                    style={headingStyle}
                >
                    Lorem ipsum Dolor
                </h2>
            </div>
        )
    }
}