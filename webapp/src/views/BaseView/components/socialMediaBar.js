import React from 'react'
import {Button} from 'semantic-ui-react'

import './socialMediaBar.less'

export default class SocialMediaBar extends React.Component {
    render(){
        const lang = this.props.language.externalLinks;
        const socialMediaSize = 'huge';
        return (
            <div className="BaseView_socialMediaBar">
                <div className="BaseView_buttonContainer">
                    <Button target="_blank" href={lang.facebook} size={socialMediaSize} circular color='facebook' icon='facebook f' />
                    <Button target="_blank" href={lang.twitter} size={socialMediaSize} circular color='twitter' icon='twitter' />
                    <Button target="_blank" href={lang.instagram} size={socialMediaSize} circular color='instagram' icon='instagram' />
                </div>
            </div>
        )
    }
}