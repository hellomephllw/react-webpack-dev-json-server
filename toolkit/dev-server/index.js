/**
 * Created by liliwen on 2017/4/8.
 */
'use strict';
global.rootPath = require('path').resolve('./');
const
    webpack = require('webpack'),
    webpackConfig = require(`${rootPath}/toolkit/webpack/dev-config`),
    jsonServer = require(`${rootPath}/toolkit/json-server`),
    express = require('express'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require("webpack-hot-middleware");

/**参数配置*/
const port = 3030;

//构建应用服务器
const app = express();

/**
 * 在入口js注入HMR
 * HMR detail disc address: https://www.npmjs.com/package/webpack-hot-middleware
 * note:有一个坑，必须加入reload=true这对参数
 */
webpackConfig.entry.index.unshift('webpack-hot-middleware/client?reload=true&noInfo=true');

/**
 * 加入webpack开发服务器中间件
 * devServer detail disc address: https://github.com/webpack/webpack-dev-middleware
 */
//构建webpack编译器
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
}));

/**加入HMR中间件*/
app.use(webpackHotMiddleware(compiler));

jsonServer();

/**开启服务*/
app.listen(port);
console.log(`dev server is starting up on port ${port}！`);