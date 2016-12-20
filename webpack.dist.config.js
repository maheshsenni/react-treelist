var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/js/TreeList.js',
  output: {
    path         : DIST_DIR,
    libraryTarget: 'umd',
    library      : 'TreeList',
    filename     : 'react-treelist.js'
  },
  module: {
    loaders: [
      {
        test : /\.js?/,
        include : SRC_DIR,
        loaders : ['babel']
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'shorthands': true
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin
  ]
};
