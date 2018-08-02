const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}

const config = {
    entry: PATHS.source + '/js/index.js',
    output: {
        path: PATHS.build + '/js',
        filename: 'index.js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.html',
            filename: 'index.html',
            title: 'Webpack App'
        }),
        new CleanWebpackPlugin([
            'dist' 
        ],
        {
             root: __dirname,
             watch: false 
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = config;