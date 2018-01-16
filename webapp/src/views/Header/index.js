// Import modules
import React from 'react';
import {Menu, Search, Icon, Button, Dropdown} from 'semantic-ui-react';

// Import resources
import logo from '../../img/logo1.jpg';
import './menu.less'
import StatefulView from '../../common/StatefulView';
import AbstractViewState from '../../common/AbstractViewState';

export default class Header extends StatefulView {

    constructor(props){
        super(props);

        this.state = {
            viewState: this.props.global.loggedIn ?
                new LoggedInState(this):
                new LoggedOutState(this),
        }
    }

    onSignOut(){
        if(this.props.global.loggedIn){
            this.props.global.axios.get('/user/signOut',{
                headers: {
                    'x-auth-token': this.props.global.token,
                }
            }).then( res => {
                this.props.global.update({
                    loggedIn: false,
                    token: null,
                });
            }).catch( err => {
                //console.log(err);
                // Todo...
            })
        }
    }
}

//
// ─── VIEW-STATES ────────────────────────────────────────────────────────────────
//

/**
 * A base template for the header/navbar
 */
class BaseHeader extends React.Component{
    render(){
        return (
            <Menu borderless className='headerMenu' size='large'>
                <Menu.Item className='headerSpacer'/>

                <Menu.Item className='headerLogo'>
                    <img src={logo} />
                </Menu.Item>

                <Menu.Item className='headerSearch'>
                    {/* About the input property: https://github.com/Semantic-Org/Semantic-UI-React/issues/1846 */}
                    <Search className='headerSearchBar' input={{ fluid: true }} showNoResults={false}/>
                </Menu.Item>

                <Menu.Item className='headerButtons'>

                        <Button 
                            className='headerButtonStyle'
                            basic
                            color='teal'                    
                        >
                            <Icon name='newspaper' /> Blog
                        </Button>

                        <Button 
                            className='headerButtonStyle'
                            basic
                            color='teal'
                        >
                            <Icon name='plus' /> Add Event
                        </Button>

                        {this.props.conditionalButtons}
                        
                        <Dropdown icon='sidebar' pointing className='item headerDropdownButton'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Lorem</Dropdown.Item>
                                <Dropdown.Item>Ipsum</Dropdown.Item>
                                <Dropdown.Item>Dolor</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </Menu.Item>  

                <Menu.Item className='headerSpacer'/>
            </Menu>
        )
    }
}


class LoggedOutState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        const buttons = [(
            <Button 
                className='headerButtonStyle'
                basic
                color='teal'
                href='#signin'
                key={1}
            >
                <Icon name='sign in' /> Sign In
            </Button>
        ),
        (
            <Button 
                className='headerButtonStyle'
                basic
                color='teal'
                href='#signup'
                key={2}
            >
                <Icon name='signup' /> Sign Up
            </Button>
        )]

        return <BaseHeader conditionalButtons={buttons}/>
    }
}

class LoggedInState extends AbstractViewState{

    /**
     * @override
     */
    render(){
        const logoutButton = (
            <Button 
                className='headerButtonStyle'
                basic
                color='teal'
                href='#'
                onClick={this.context.onSignOut.bind(this.context)}
            >
                <Icon name='sign out' /> Sign Out
            </Button>
        )

        return <BaseHeader conditionalButtons={logoutButton} />;
    }
}