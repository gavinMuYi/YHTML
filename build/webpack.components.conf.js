'use strict'
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const compWebpackConfig = merge(baseWebpackConfig, {
  entry: './src/ycomponents.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'YComponents.js',
    library: 'YUI',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});
// webpack(compWebpackConfig, function (err, status) {
//     console.log(err);
// });

module.exports = compWebpackConfig;
