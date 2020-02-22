var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
    devtool: '#inline-source-map',
})

// test specific setups
if (process.env.NODE_ENV === 'test') {
    module.exports.externals = [require('webpack-node-externals')()]
    module.exports.devtool = 'eval'
  }


module.exports = webpackConfig
