// Lode webpack base configuration
const baseConfig = require('./base.config.js');

// Load webpack-plugins here!
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Lode node modules
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    output: {
        publicPath: 'assets/', // Define a base path. (Play server provide resource file on /assets/* route) 
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin(),

        // Configure extract-text-plugin
        // This plugin will extract the style data into a seperate css file
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            //options: { minimize: true }
        })
    ]
});
