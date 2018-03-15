const webpack = require('webpack');

// Lode webpack base configuration
const baseConfig = require('./base.config.js');

// Lode node modules
const merge = require('webpack-merge');
const log = require('loglevel');

// Load webpack-plugins here!
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load shared configuration
const shared = require('./shared');

module.exports = (env = {}) => { 
    console.log('Webpack env settings:', env);

    const definitions = {
        DISABLE_PRIVATE_ROUTES: JSON.stringify( env.DISABLE_PRIVATE_ROUTES || false),
        LOG_LEVEL: JSON.stringify(env.LOG_LEVEL || log.levels.TRACE),
        API_BASE_URL: JSON.stringify(env.API_BASE_URL || 'http://localhost:9000/api/v1'),             
    }
    console.log('Webpack definitions:', definitions);

    return merge(baseConfig, {
        // This option provides a source-map after the project was built, so you can see
        // errors in their original files rather than in the bundled js-file (client.js)
        devtool: 'source-map',

        // Configuration for the wepack-dev-server node module
        devServer: {
            compress: true,
            contentBase: shared.BUILD_DIR,
            port:8000,
            historyApiFallback: true,
        },

        module: {
            loaders: [shared.createLessLoader(false, './')],
        },

        plugins: [
            // Configure extract-text-plugin
            // This plugin will extract the style data into a separate css file
            new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
            }),

            new webpack.DefinePlugin(definitions),
        ],
    })
}
