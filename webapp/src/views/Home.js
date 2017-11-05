// Import modules
import React from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

// Import rescources
import Heading from '../components/sample/Heading';
import Foo from '../components/sample/Foo';

const Sample = () => {

    return(
        <div>
            <Heading text='HalloWelt!'/>
            <Link to="lorem"> <Button>Click Here!</Button> </Link>
            <Foo/>
        </div>
    )
}

export default Sample;