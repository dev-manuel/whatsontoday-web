import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, mount } from 'enzyme'
import React from 'react'
import Global from '../../common/Global'
import MockAdapter from 'axios-mock-adapter'
import Axios from 'axios'
import GER from '../../common/dictionary/GER'

import SignInView, {AlreadyLoggedInState, SignInState, WrongCredentialsState} from '../SignIn'

Enzyme.configure({ adapter: new Adapter() });

describe('SignInView viewState', () => {
    it('should be AlreadyLoggedInState if the user is already logged in', () => {
        const global = new Global({loggedIn: true});
        const signIn = <SignInView global={global}/>
        const wrapper = shallow(signIn);
        expect(wrapper.state().viewState instanceof AlreadyLoggedInState).toBe(true);
    })

    it('should be SignInState if the user is not logged in', () => {
        const global = new Global({loggedIn: false});
        const signIn = <SignInView global={global}/>
        const wrapper = shallow(signIn);
        expect(wrapper.state().viewState instanceof SignInState).toBe(true);
    })

    it('should be WrongCredentialsState if REST responded that credentials are wrong ', ()=>{
        const mock = new MockAdapter(Axios);
        mock.onPost('/user/signUp').reply(404, {
            "email": "string",
            "password": "string",
            "rememberMe": true
        })

        const global = new Global({loggedIn: false, axios: Axios, LANG: GER});
        const signIn = <SignInView global={global}/>
        const wrapper = mount(signIn);
        console.log('Found submit button:', wrapper.find('button').debug());
        wrapper.find('button').simulate('click');
        
        setTimeout(() => {
            expect(wrapper.state().viewState instanceof WrongCredentialsState ).toBe(true);
        }, 1000) // Todo: better async handling
        
    })
})