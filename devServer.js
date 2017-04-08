/**
 * Created by liliwen on 2017/4/8.
 */
'use strict';
const
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config'),
    compiler = webpack(webpackConfig),
    express = require('express'),
    app = express(),
    webpackDevMiddleware = require('webpack-dev-middleware');

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: 'assets/index.html'
}));

app.listen(3030);