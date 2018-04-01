/*
Copyright 2017 Theun de Bruijn

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
      main: ['./main/Main.js'],
  },

  output: {
    publicPath: '/',
    filename: 'static/js/[name]_[hash].js',
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: false,
    stats: {
      errors: true,
      errorDetails: true,
      warnings: true,
    },
  },

  devtool: 'cheap-eval-source-map',

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.config': { // debug env
        environment: JSON.stringify('development'),
      },
      'process.env': { // prod env
        NODE_ENV: '"development"',
      },
    }),

    // scrubs through the src and pulls out all css
    // a contenthash is added so we can cache separately from other assets
    // new ExtractTextPlugin({
    //   filename: 'static/css/styles_[contenthash:16].css',
    //   allChunks: true,
    // }),

    // generates the single .html file from scratch
    // don't hash here as we're baking the hashes already
    new HtmlWebpackPlugin({
      title: 'zoetrope',
      template: './main/assets/templates/Main.ejs',
      filename: 'index.html',
      inject: false,
      minify: false,
      hash: false,
      devServer: 'http://0.0.0.0:8000',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.es6?$|\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {importLoaders: 1}},
          {loader: 'postcss-loader'},
        ],
      },
      {
        test: /\.jpg?$|\.png?$|\.gif?$|\.ico/,
        use: [
          {loader: 'file-loader?name=static/img/[name]_[hash].[ext]'},
        ],
      },
    ],
  },
};
