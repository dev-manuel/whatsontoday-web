// Load node modules
const webpack = require('webpack');

// Load webpack-plugins here!
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RewriteImportPlugin = require("less-plugin-rewrite-import");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load shared configuration
const shared = require('./shared');

module.exports = {

    entry: `${shared.SRC_DIR}/index.js`,

    output: {
        path: shared.BUILD_DIR,
        filename: '[name].[hash].js',
        publicPath: '/', // See: https://github.com/jantimon/html-webpack-plugin/issues/156#issuecomment-169331745
    },
    
    module: {
        loaders: [
            // Loading image- and font-files
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/,
                use: [
                  { loader: 'file-loader' },
                ],
            },

            // Down-compile JS(ES6)/JSX-files
            {
                test: /\.jsx?$/, // Include all files which are ending with ".js" or ".jsx"
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    
    // Include plugins
    plugins: [

        // This setup will ...
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'WhatsOn',
            favicon: 'src/img/favicon.ico',
            template: `${shared.SRC_DIR}/template.html`,
            
        }),
        
    ]
};
