const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let pugExtractor = new ExtractTextPlugin('[name].html');
const HtmlPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlPlugin({
  template: './src/views/index.pug',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  common: {
    entry: './src/index.js',
    output: {
      path: path.resolve('public'),
      filename: 'index.js',
      publicPath: "/"
    },
    resolve: {
      extensions: ['.js', '.jsx', 'json']
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.pug$/,
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                doctype: 'html',
                pretty: true,
                data: {}
              }
            }]
        }
      ]
    },
    plugins: [
      htmlPlugin
    ],
    node: {
      fs: 'empty'
    }
  },
  getCssProcessor: (name, {noPrefixer, minify} = {}) => {
    let extractor = new ExtractTextPlugin(name);
    let loaderList = {
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: !!minify,
          sourceMap: true,
          url: false
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: function () {
            return [autoprefixer]
          }
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    };

    if (noPrefixer) {
      loaderList.use.splice(1, 1);
    }
    return {
      loader: {
        test: /\.(css|scss)$/,
        use: extractor.extract(loaderList)
      },
      plugin: extractor
    }
  }
};