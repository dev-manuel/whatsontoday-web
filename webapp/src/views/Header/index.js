// Import modules
import React from 'react';
import {Menu, Search, Icon, Button, Dropdown} from 'semantic-ui-react';

// Import resources
import logo from '../../img/logo1.jpg';
import './menu.less';
import ModalError from '../../components/modal';


const LoggedOutButtons = ({LANG}) => {
    return [(
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='#signin'
            key={1}
        >
            <Icon name='sign in' /> {LANG.signIn}
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
            <Icon name='signup' /> {LANG.signUp}
        </Button>
    )]
}

const LoggedInButtons = ({LANG, onSignOut}) => {

    return (
        <Button 
            className='headerButtonStyle'
            basic
            color='teal'
            href='#'
            onClick={onSignOut}
        >
            <Icon name='sign out' /> {LANG.signOut}
        </Button>
    )
}

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModalError: false,
            searchValue: '',
        }
    }

    onSignOut(){
        if(this.props.global.loggedIn){
            this.props.global.axios.get('/login/signOut',{
                headers: {
                    'x-auth-token': this.props.global.token,
                }
            }).then( res => {
                this.props.global.update({
                    loggedIn: false,
                    token: null,
                });
            }).catch( err => {
                this.setState({showModalError:true})
            })
        }
    }

    // This method will be invoked if the user presses enter while focusing the search bar
    onEnter(){
        this.props.global.history.push(`search?search=${this.state.searchValue}`);
    }

    // Simply updating the `value``of the search bar
    handleSearchChange(e, {value}){
        this.setState({searchValue: value})
    }

    render() {
        const LANG = this.props.global.LANG.header;

        const conditionalButtons = this.props.global.loggedIn ?
            <LoggedInButtons LANG={LANG} onSignOut={this.onSignOut.bind(this)}/> :
            <LoggedOutButtons LANG={LANG}/>;

        return (
            <div>
                <ModalError
                    global={this.props.global}
                    show={this.state.showModalError}
                    onClose={()=>{this.setState({showModalError:false})}}
                />
                <Menu borderless className='headerMenu' size='large'>
                    <Menu.Item className='headerSpacer'/>

                    <Menu.Item className='headerLogo'>
                        <img src={logo} />
                    </Menu.Item>

                    <Menu.Item className='headerSearch'>
                        {/*  */}
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
                                <Icon name='newspaper' /> {LANG.blog}
                            </Button>

                            <Button 
                                className='headerButtonStyle'
                                basic
                                color='teal'
                            >
                                <Icon name='plus' /> {LANG.addEvent}
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