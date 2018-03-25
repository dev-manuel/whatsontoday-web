import React from 'react'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import ConditionalHide from '../conditionalHide'

export default ({hideBack, hideNext, onBackClicked, nextText, backText}) => {
    return (
        <React.Fragment>
            <ConditionalHide hide={hideBack}>
                <Button
                    floated='left'
                    content={backText}
                    color='gray'
                    onClick={onBackClicked}
                />
            </ConditionalHide>

            <ConditionalHide hide={hideNext}>
                <Button
                    type='submit'
                    floated='right'
                    content={nextText}
                    color='green'
                />
            </ConditionalHide>
        </React.Fragment>
    )
}