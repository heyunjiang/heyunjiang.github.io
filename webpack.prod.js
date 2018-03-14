const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'cheap-module-source-map',
	plugins: common.plugins.concat([
 		new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production') //在生产环境中使用此条，可以有效减少react打包后的体积
	    })
 	]),
 	mode: 'production'
});