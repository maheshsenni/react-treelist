var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

var config = {
  // devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    SRC_DIR + '/index'
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : SRC_DIR,
        loaders : ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;