const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}

module.exports = {
    entry: PATHS.source + '/js/index.js',
    output: {
        path: PATHS.build,
        filename: 'js/index.js'
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug',
            filename: 'index.html',
            title: 'Webpack App',
            favicon: PATHS.source + '/favicon.ico',
            inject: true
        }),
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([
            {from:'src/img',to: 'img'},
            {from:'src/fonts',to: 'fonts'}  
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
