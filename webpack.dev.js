const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
	// devtool: 'inline-source-map',
	plugins: common.plugins.concat([
 		new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin()
 	]),
	devServer: {
	    contentBase: path.join(__dirname, "dist"),
	    compress: true,
	    port: 9000,
	    hot: true
	},
	mode: 'development'
})