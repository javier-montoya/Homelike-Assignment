const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

    return {
        mode: argv.mode !== 'production' ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        resolve: {
            extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json"]
        },
        module: {
            rules: [
                {   
                    // Babel so we can transpile to es5
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/, 
                    loader: "babel-loader" 
                },
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    // Bundle static html resources
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    // workaround for some node_modules that required it
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto",
                }
            ]
        },
        devServer: {
            // this is cause we're using react-router in a single page app
            // we need to always fallback to "/"
            historyApiFallback: true
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': 
                argv.mode === 'production' ? '"production"' : '"development"'
            }),
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html'
            }),
            // This is just so we have the same base structure than the "public" folder and not have to worry much about imports and paths
            // we could have done something more graceful with css loaders but i dont see much of a problem with this approach
            new CopyWebpackPlugin([
                { from: './public/bootstrap.min.css', to: './bootstrap.min.css' },
                { from: './public/manifest.json', to: './manifest.json' },
                { from: './public/favicon.ico', to: './favicon.ico' },
                { from: './public/css', to: './css' }
            ]),
        ],
        // better error source logging, a personal preference
        devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map'
    };
}