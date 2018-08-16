const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        overlay: true
    },
    module: {
        rules: [
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
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                    'file-loader'
                ]
            }
        ]
    }
});
