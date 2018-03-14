const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        include: path.join(__dirname, 'src'),
        loader: "babel-loader" 
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
};