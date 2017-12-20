// Lode webpack base configuration
const baseConfig = require('./base.config.js');

// Lode node modules
const merge = require('webpack-merge');

// Load webpack-plugins here!
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load shared configuration
const shared = require('./shared');

module.exports = merge(baseConfig, {
    
    // This option provides a source-map after the project was built, so you can see
    // errors in their original files rather than in the bundled js-file (client.js)
    devtool: 'source-map',

    // Configuration for the wepack-dev-server node module
    devServer: {
        compress: true,
        contentBase: shared.BUILD_DIR,
        port:9000
    },

    module: {
        loaders: [shared.createLessLoader(false)]
    },

    plugins: [
        // Configure extract-text-plugin
        // This plugin will extract the style data into a seperate css file
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
        })
    ]

});
