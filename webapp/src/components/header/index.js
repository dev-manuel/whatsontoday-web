// Import modules
import React from 'react';
import {Menu, Search, Icon, Button, Dropdown} from 'semantic-ui-react';

// Import resources
import logo from '../../img/logo1.jpg';
import './menu.less'

const Header = ({global}) => {

    const conditionalButtons = global.loggedIn ? [(
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='#'
        >
            <Icon name='sign out' /> Sign Out
        </Button>
    )] : [(
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='#signin'
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
        >
            <Icon name='signup' /> Sign Up
        </Button>
    )]

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

                    {conditionalButtons}
                    
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


export default Header;