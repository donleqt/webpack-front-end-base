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
      NODE_ENV: 'development'
    })
  ]),
  devtool: 'inline-source-map',
  devServer: {
    // historyApiFallback: {
    //   rewrites: [
    //     {from: /^.*\.html$/, to: '/_index.html'},
        // {from: /.*/, to: '/_index.html'},
    //   ],
    // },
    host: 'localhost',
    disableHostCheck: true,
    port: 5100,
    contentBase: path.resolve('public')
  }
};
