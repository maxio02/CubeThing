"use strict";
var path = require('path');
var { merge } = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: [{
            directory: path.resolve(__dirname, 'dist'),
        },
        ],
        compress: true,
        port: 9000,
        hot: true,
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
});