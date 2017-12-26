// Import modules
import React from 'react';
import {Menu, Search, Icon, Dropdown, Container} from 'semantic-ui-react';

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
                <Search/>
            </Menu.Item>

            <Menu.Item className='headerButtons'>
                 <a 
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
                </a>
            </Menu.Item>

            <Menu.Item className='headerPopup'>
                <PopupMenu/>
            </Menu.Item>  
            
            <Menu.Item className='headerSpacer'/>
        </Menu>
)



export default Header;