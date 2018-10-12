'use strict';

// const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: __dirname + '/dev',

    entry: './js/index.js',

    output: {
        path: path.join(__dirname, 'prod'),
        filename: 'bundle.js',
        library: 'index',
        publicPath: "/prod"
    },

    devServer: {
        //contentBase: path.join(__dirname, "prod"),
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
        hot: true,
        inline: true,
        publicPath: '/prod'
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'dev'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }, {
                test:  /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        modules: [
            './node_modules/',
            './_HTML/src/js'
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"),
    ]
};

