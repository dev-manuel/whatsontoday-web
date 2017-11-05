const path = require('path');

// Load webpack-plugins here!
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RewriteImportPlugin = require("less-plugin-rewrite-import");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); <-- Maby use ...

// Directory-constants
const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, '../public');
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

// Configure extract-text-plugin
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {

    entry: `${SRC_DIR}/index.js`,

    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js',
    },
    
    module: {
        loaders: [

            // Loading less-files
            {
                test: /\.(less|config)/, // Loading .less or .config files
                use: extractLess.extract({ // Instructs webpack to store the style data in a seperate css-file (see plugins!)
                    use: [
                        { loader: "css-loader" },
                        {
                            loader: "less-loader",
                            options: {
                                paths: [ROOT_DIR, NODE_MODULES_DIR], // Instructs less-loader not to use the webpack resolver
                                plugins: [

                                    // (Ugly) workaround to configurate semantic-ui-less with files in the 
                                    // SRC_DIR/semantic-ui directory
                                    new RewriteImportPlugin({
                                        paths: {
                                            '../../theme.config': `${SRC_DIR}/semantic-ui/theme.config`,
                                        },
                                    }),
                                ],
                            },
                        }
                    ],
                }),
            },

            // Loading image- and font-files
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
                use: [
                  { loader: 'file-loader' },
                ],
            },

            // Down-compile JS(ES6)/JSX-files
            {
                test: /\.jsx?$/, // Include all files which are ending with ".js" or ".jsx"
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: { 
                    presets: ['es2015', 'react'] 
                },
            },
        ]
    },

    // This option provides a source-map after the project was built, so you can see
    // errors in their original files rather than in the bundled js-file (client.js)
    devtool: 'source-map', 
    
    // Include plugins
    plugins: [

        // This setup will ...
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'WhatsOn',
            template: `${SRC_DIR}/template.html`,
            
        }),

        // This plugin will extract the style data into a seperate css file
        extractLess,

       // new UglifyJsPlugin(),
    ],

    // Configuration of webpack-dev-server
    devServer: {
        compress: true,
        contentBase: BUILD_DIR,
        port:9000
    }
};
