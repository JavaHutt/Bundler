import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}

const productionConfig = {
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
                use: [
                    'style-loader',
                    'css-loader'
                ]
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