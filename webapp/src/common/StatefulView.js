import React from 'react'

/**
 * This class provides a default implementation of the react component class
 * it semantically connects a component with its role as an stateful view.
 * (A view that holds a AbstractViewState)
 */
export default class StatefulView extends React.Component{
    
    /**
     * This is a default implementation of the react component render method
     */
    render(){
        return this.state.viewState.render();
    }

}