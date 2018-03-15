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

    if(!env.API_BASE_URL){
        throw new Error(`API_BASE_URL environment variable is not defined but needed! Please specify your API base path with npm run build -- --env.API_BASE_URL=<...>`);
    }

    const definitions = {
        'process.env.NODE_ENV': JSON.stringify('production'), 
        DISABLE_PRIVATE_ROUTES: JSON.stringify(env.DISABLE_PRIVATE_ROUTES || false),
        LOG_LEVEL: JSON.stringify(env.LOG_LEVEL || log.levels.SILENT), 
        API_BASE_URL: JSON.stringify(env.API_BASE_URL),
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
