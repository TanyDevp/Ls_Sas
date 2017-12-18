'use strict';
const webpack = require("webpack");  //css单独打包
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //提取公共模块
const path = require('path');

module.exports = {
    entry: {
        main: __dirname + '/src/app.js',
        vendor: ['react', 'react-dom']   //这里是依赖的库文件配置，和CommonsChunkPlugin配合使用可以单独打包
    }, //入口
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, "./node_modules"),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]

    },

    plugins: [
        new ExtractTextPlugin('css/main.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer]; //调用autoprefixer插件,css3自动补全
                },
                devServer: {
                    contentBase: "./public", //本地服务器所加载的页面所在的目录
                    colors: true, //终端中输出结果为彩色
                    historyApiFallback: true, //不跳转
                    inline: true, //实时刷新
                },
                babel: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', ['import', {
                        libraryName: 'antd',
                        style: 'css'
                    }]]
                },
            }
        })

    ]

}; 