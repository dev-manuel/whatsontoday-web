import React from 'react'

import backgroundImage from '../../../img/blurred.jpeg'

const divStyle = {
    background: `url(${backgroundImage}) no-repeat center`,
    height: '100%',
    width: '100%',
}


const headingStyle = {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgb(41, 47, 50)',
    fontSize: 44,
}

const pStyle= {
    fontSize: 34,
}

export default class Example extends React.Component {

    render(){
        return (
            <a href='https://www.facebook.com/findyournextevent/' target='_blank'>
                <div
                    style={divStyle}
                >
                    <h2
                        style={headingStyle}
                    >
                        What's On Today <br/>
                        <span style={pStyle}>Folgt uns auf Facebook!</span>
                    </h2>
                </div>
            </a>
        )
    }
}