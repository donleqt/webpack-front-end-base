const {common, getCssProcessor} = require('./wp-common');
const cssProcess = getCssProcessor('style.css');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  ...common,
  module: {
    loaders: common.module.loaders.concat([cssProcess.loader]
    )
  },
  plugins: common.plugins.concat([
    cssProcess.plugin,
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]),
  devtool: false
};
