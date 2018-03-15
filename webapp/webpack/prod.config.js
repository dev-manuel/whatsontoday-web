// Lode webpack base configuration
const baseConfig = require('./base.config.js');

// Load shared configuration
const shared = require('./shared');

// Load webpack-plugins here!
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Lode node modules
const merge = require('webpack-merge');
const webpack = require('webpack');
const log = require('loglevel');

module.exports = (env = {}) => { 
    console.log('Webpack env settings:', env);

    const definitions = {
        'process.env.NODE_ENV': JSON.stringify('production'), 
        DISABLE_PRIVATE_ROUTES: JSON.stringify(false), // To ensure this property is set to false
        LOG_LEVEL: JSON.stringify(log.levels.SILENT),        
    }
    console.log('Webpack definitions:', definitions);

    return merge(baseConfig, {
        output: {
            publicPath: '/assets/', // Define a base path. (Play server provide resource file on /assets/* route) 
        },

        module: {
            loaders: [shared.createLessLoader(true)]
        },

        plugins: [
            new webpack.DefinePlugin(definitions),

            new webpack.optimize.UglifyJsPlugin(),

            // Configure extract-text-plugin
            // This plugin will extract the style data into a seperate css file
            new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
                //options: { minimize: true }
            })
        ],
    })
}
