const webpack = require('webpack');
const path = require('path');

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
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = config;