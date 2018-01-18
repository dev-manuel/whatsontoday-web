import SignUpView, {AlreadyLoggedInState, SignUpState} from '../SignUp'
import Global from '../../common/Global'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('Correct state behavior', () => {
    it('should be in AlreadyLoggedInState if the user is already logged in', () => {
        const global = new Global({loggedIn: true});
        const signUp = <SignUpView global={global}/>
        const wrapper = shallow(signUp);
        expect(wrapper.state().viewState instanceof AlreadyLoggedInState).toBe(true);
    })

    it('should be in in SignUpState if the user is not logged in', () => {
        const global = new Global({loggedIn: false});
        const signUp = <SignUpView global={global}/>
        const wrapper = shallow(signUp);
        expect(wrapper.state().viewState instanceof SignUpState).toBe(true);
    })
})