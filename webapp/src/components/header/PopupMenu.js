// Import modules
import React from 'react';
import {Popup, Menu, Icon} from 'semantic-ui-react';

// Todo: Embed in menu item

const PopupMenu = () => (
        <Popup
            trigger={<Icon name='sidebar' />}
            content='Lorem Ipsum!'
            position='bottom right'
            hoverable
            basic
        />
)


export default PopupMenu;