import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import Global from '../../common/Global'

import SignInView, {AlreadyLoggedInState, SignInState} from '../SignIn'

Enzyme.configure({ adapter: new Adapter() });

describe('Correct state behavior', () => {
    it('should be in AlreadyLoggedInState if the user is already logged in', () => {
        const global = new Global({loggedIn: true});
        const signIn = <SignInView global={global}/>
        const wrapper = shallow(signIn);
        expect(wrapper.state().viewState instanceof AlreadyLoggedInState).toBe(true);
    })

    it('should be in SignInState if the user is not logged in', () => {
        const global = new Global({loggedIn: false});
        const signIn = <SignInView global={global}/>
        const wrapper = shallow(signIn);
        expect(wrapper.state().viewState instanceof SignInState).toBe(true);
    })
})