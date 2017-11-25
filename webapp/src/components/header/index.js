// Import modules
import React from 'react';
import {Menu, Search, Icon, Dropdown} from 'semantic-ui-react';

// Import resources
import logo from '../../img/logo1.jpg';
import PopupMenu from './PopupMenu';

const Header = () => (
        <Menu>
            <Menu.Item>
                <img src={logo} />
            </Menu.Item>

            <Menu.Item>
                <Search 
                loading
                />
            </Menu.Item>

            <Menu.Item position='right'>
                 <a>
                    <Icon name='newspaper' />
                    Blog
                </a>

                <a>
                    <Icon name='plus' />
                    Add Event
                </a>

                <a>
                    <Icon name='sign in' />
                    Sign In
                </a>

                <a>
                    <Icon name='signup' />
                    Sign Up
                </a>
            </Menu.Item>

            <Menu.Item>
                <PopupMenu/>
            </Menu.Item>  
        </Menu>
)



export default Header;