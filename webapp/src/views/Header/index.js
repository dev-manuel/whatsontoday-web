// Import modules
import React from 'react';
import log from 'loglevel'
import {Menu, Search, Icon, Button, Dropdown, Image} from 'semantic-ui-react';
import {withRouter} from 'react-router'

// Import resources
import logo from '../../img/logo.png';
import './menu.less';
import ModalError from '../../components/modal';
import {signOut} from '../../common/api/requests/login'
import { axios } from '../../common/api';


const LoggedOutButtons = ({language}) => {
    return [(
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='signin'
            key={1}
        >
            <Icon name='sign in' /> {language.signIn}
        </Button>
    ),
    (
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='signup'
            key={2}
        >
            <Icon name='signup' /> {language.signUp}
        </Button>
    )]
}

const LoggedInButtons = ({language, onSignOut}) => {

    return (
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='#'
            onClick={onSignOut}
        >
            <Icon name='sign out' /> {language.signOut}
        </Button>
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
                <Menu borderless className='headerMenu' size='large'>
                    <Menu.Item className='headerSpacer'/>

                    <Menu.Item className='headerLogo'>
                        <Image src={logo} href='/'/>
                    </Menu.Item>

                    <Menu.Item className='headerSearch'>
                        <Search
                            className='headerSearchBar'
                            value={this.state.searchValue} 
                            input={{ fluid: true}} // About the input property: https://github.com/Semantic-Org/Semantic-UI-React/issues/1846
                            showNoResults={false}
                            onKeyPress={(e)=>{if(e.key === 'Enter') this.onEnter()}} // when enter key is pressed
                            onSearchChange={this.handleSearchChange.bind(this)}
                        />
                    </Menu.Item>

                    <Menu.Item className='headerButtons'>

                            <Button 
                                className='headerButtonStyle'
                                basic
                                color='teal'                    
                            >
                                <Icon name='newspaper' /> {language.blog}
                            </Button>

                            <Button 
                                className='headerButtonStyle'
                                basic
                                color='teal'
                            >
                                <Icon name='plus' /> {language.addEvent}
                            </Button>

                            {conditionalButtons}
                            
                            <Dropdown icon='sidebar' pointing className='item headerDropdownButton'>
                                <Dropdown.Menu>
                                    {/* Todo */}
                                    <Dropdown.Item>Lorem</Dropdown.Item>
                                    <Dropdown.Item>Ipsum</Dropdown.Item>
                                    <Dropdown.Item>Dolor</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    </Menu.Item>  

                    <Menu.Item className='headerSpacer'/>
                </Menu>
            </div>
        )
        
    }
}

export default withRouter(Header);