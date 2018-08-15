const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}

const productionConfig = {
    entry: PATHS.source + '/js/index.js',
    output: {
        path: PATHS.build,
        filename: 'js/index.js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../', 
                    fallback: 'style-loader',
                    use: [
                        'css-loader?url=false'
                    ]
                })
            },
            {
                test: /\.sc?a?ss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../', 
                    fallback: 'style-loader',
                    use: [
                        'css-loader?url=false',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif)$|(img\.svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
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
        new ExtractTextPlugin("css/styles.css"),
        new CopyWebpackPlugin([
            {from:'src/img',to:'img'} 
        ]),
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

const developmentConfig = {
    entry: PATHS.source + '/js/index.js',
    output: {
        path: PATHS.build,
        filename: 'js/index.js',
        publicPath:'/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../', 
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.sc?a?ss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../', 
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif)$|(img\.svg)$/,
                use: {
                    loader: 'file-loader',
                    options: { 
                        name: 'img/[name].[ext]'
                    }
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
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = function(env) {
    if (env === 'production') {
        return productionConfig
    }
    if (env === 'development') {
        return developmentConfig
    }
};