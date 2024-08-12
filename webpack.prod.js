"use strict";
var path = require('path');
var { merge } = require('webpack-merge');
var TerserPlugin = require('terser-webpack-plugin');
var common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    mangle: {
                    properties: {
                        regex: /^_/
                    }
                }
                },
            }),
        ],
    },
});