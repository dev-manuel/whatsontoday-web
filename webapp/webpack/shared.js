// Load node modules
const path = require('path');

// Load webpack-plugins here!
const RewriteImportPlugin = require("less-plugin-rewrite-import");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const shared = {

    // Directory-constants
    ROOT_DIR: path.resolve(__dirname, '../'),
    SRC_DIR: path.resolve(__dirname, '../src'),
    BUILD_DIR : path.resolve(__dirname, '../../public'),
    NODE_MODULES_DIR: path.resolve(__dirname, '../node_modules'),
    
    createLessLoader: (minimized, publicPath = './') => (
    // Loading less-files
    {
        test: /\.(css|less|config)/, // Loading .less or .config files
        use: ExtractTextPlugin.extract({ // Instructs webpack to store the style data in a seperate css-file (see plugins!)
            
            // Here we need to update the public path for css files to avoid double publicPath usage (>...>/<publicPath>/<publicPath>/<...>)
            // see https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/246#issuecomment-281253248
            publicPath,
            use: [
                { 
                    loader: "css-loader",
                    options: {minimize: minimized}
                },
                {
                    loader: "less-loader",
                    options: {
                        paths: [shared.ROOT_DIR, shared.NODE_MODULES_DIR], // Instructs less-loader not to use the webpack resolver
                        plugins: [

                            // (Ugly) workaround to configurate semantic-ui-less with files in the 
                            // SRC_DIR/semantic-ui directory
                            new RewriteImportPlugin({
                                paths: {
                                    '../../theme.config': `${shared.SRC_DIR}/semantic-ui/theme.config`,
                                },
                            }),
                        ],
                    },
                }
            ],
        }),
    })
}

module.exports = shared;
