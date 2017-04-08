/**
 * Created by liliwen on 2017/4/8.
 */
'use strict';
global.rootPath = require('path').resolve('./');
const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * webpack配置
 */
const config = {
    /**入口配置*/
    entry: {
        index: [`${rootPath}/src/index.js`]
    },
    /**输出路径配置*/
    output: {
        path: `${rootPath}/assets/`,
        filename: '[name].[hash:5].js',
        publicPath: "/assets/",
        chunkFilename: '[name].[chunkhash:5].js'
    },
    /**模块加载器配置*/
    module: {
        rules: [
            //scripts
            {
                test: /\.js[x]?/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            //css
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            //sass
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            //images
            {
                test: /\.(png|jp[e]?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10240',
                            name: '/images/[name].[hash:5].[ext]'
                        }
                    }
                ]
            },
            //fonts
            {
                test: /\.(woff[2]?|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10240',
                            name: '/fonts/[name].[hash:5].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    /**插件配置*/
    plugins: [
        //编译html
        new HtmlWebpackPlugin({
            template: `${rootPath}/src/index.html`,//指定视图
            filename: `${rootPath}/assets/index.html`,//指定输出位置
            hash: true,
            chunks: ['index']//为视图指定js和css，名字在entry中选一个或多个
        })
    ],
    /**import/require引入文件方式配置*/
    resolve: {
        extensions: ['.js', '.jsx']
    },
};

module.exports = config;