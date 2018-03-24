import React from 'react'
import log from 'loglevel'
import { Menu, Search, Icon, Button, Dropdown, Image, Container} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'

import logo from '../../img/logo.png'
import './header.less'
import ModalError from '../../components/modal'
import {signOut} from '../../common/api/requests/login'
import { axios } from '../../common/api'


const LoggedOutButtons = ({language}) => {
    return (
        <React.Fragment>
            <Menu.Item>
                <Link to='/signIn'>
                {language.signIn}
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/signUp'>        
                    {language.signUp}
                </Link>
            </Menu.Item>
        </React.Fragment>
    )
}

const LoggedInButtons = ({language, onSignOut}) => {

    return (
        <React.Fragment>
            <Menu.Item>
                <a onClick={onSignOut}>
                    {language.signOut}
                </a>
            </Menu.Item>
            <Menu.Item>
                <Link to='/options'>
                    {language.options}
                </Link>
            </Menu.Item>
        </React.Fragment>
    )
}

class Header extends React.Component{
    
    state = {
        showModalError: false,
        searchValue: '',
        redirect: false,
    }

    onSignOut(){
        if(this.props.loginData.loggedIn){
            signOut()
                .then(data => {
                    this.props.handleSignOut();
                })
                .catch( error => {
                    log.debug('signOut#catch', error);
                    this.setState({showModalError: true})
                })
        }
    }

    // This method will be invoked if the user presses enter while focusing the search bar
    onEnter(){
        this.props.history.push(`/search?search=${this.state.searchValue}`);
    }

    // Simply updating the `value``of the search bar
    handleSearchChange(e, {value}){
        this.setState({searchValue: value})
    }

    render() {
        const language = this.props.language.header;

        const conditionalButtons = this.props.loginData.loggedIn ?
            <LoggedInButtons language={language} onSignOut={this.onSignOut.bind(this)}/> :
            <LoggedOutButtons language={language}/>;

        return (
            <div>
                <ModalError
                    language={this.props.language}
                    show={this.state.showModalError}
                    onClose={()=>{this.setState({showModalError:false})}}
                />
                <Menu 
                    size='huge'
                    borderless
                    className="Header_menu"
                >
                    <Container>

                        <Menu.Item>
                            <Link to='/'>
                                <Image src={logo}/>
                            </Link>
                        </Menu.Item>

                        <Menu.Item 
                            header
                            className="Header_header"
                        >
                            <Link to='/'>
                                What's On Today
                            </Link>
                        </Menu.Item>

                        {/* <Menu.Item className='headerSearch'>
                            <Search
                                className='headerSearchBar'
                                value={this.state.searchValue} 
                                input={{ fluid: true}} // About the input property: https://github.com/Semantic-Org/Semantic-UI-React/issues/1846
                                showNoResults={false}
                                onKeyPress={(e)=>{if(e.key === 'Enter') this.onEnter()}} // when enter key is pressed
                                onSearchChange={this.handleSearchChange.bind(this)}
                            />
                        </Menu.Item> */}

                        <Menu.Menu position='right'>
                            {/* <Menu.Item>
                                <Link to='/'>
                                    {language.blog}
                                </Link>
                            </Menu.Item> */}
                            <Menu.Item>
                                <Link to='/event_tool/create'>                            
                                    {language.addEvent}
                                </Link>
                            </Menu.Item>
                            {conditionalButtons}
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
        
    }
}

export default withRouter(Header);