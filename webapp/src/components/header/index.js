// Import modules
import React from 'react';
import {Menu, Search, Icon, Button} from 'semantic-ui-react';

// Import resources
import logo from '../../img/logo1.jpg';
import PopupMenu from './PopupMenu';
import './menu.less'

const Header = () => (
        <Menu borderless className='headerMenu'>
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

                <Button 
                    className='headerButtonStyle'
                    basic
                    color='teal'
                >
                    <Icon name='sign in' /> Sign In
                </Button>

                <Button 
                    className='headerButtonStyle'
                    basic
                    color='teal'
                >
                    <Icon name='signup' /> Sign Up
                </Button>


                 {/* <a 
                    className='headerButtonStyle'
                    href='#'
                 >
                    <Icon name='newspaper' />
                    Blog
                </a>

                <a 
                    className='headerButtonStyle'
                    href='#'
                 >
                    <Icon name='plus' />
                    Add Event
                </a>

                <a 
                    className='headerButtonStyle'
                    href='#'
                 >
                    <Icon name='sign in' />
                    Sign In
                </a>

                <a 
                    className='headerButtonStyle'
                    href='#'
                 >
                    <Icon name='signup' />
                    Sign Up
                </a> */}
            </Menu.Item>

            <Menu.Item className='headerPopup'>
                <PopupMenu/>
            </Menu.Item>  
            
            <Menu.Item className='headerSpacer'/>
        </Menu>
)



export default Header;