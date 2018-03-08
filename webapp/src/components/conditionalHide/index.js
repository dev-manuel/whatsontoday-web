import React from 'react'

/**
 * This component renders the children only if the hide property is set to false
 */
export default ({children, hide}) => {
    return hide ? null : children;
}