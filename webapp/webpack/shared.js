// Load node modules
const path = require('path');

module.exports = {

    // Directory-constants
    ROOT_DIR: path.resolve(__dirname, '../'),
    SRC_DIR: path.resolve(__dirname, '../src'),
    BUILD_DIR : path.resolve(__dirname, '../../public'),
    NODE_MODULES_DIR: path.resolve(__dirname, '../node_modules')
}
