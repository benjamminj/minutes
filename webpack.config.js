let path = require('path');

let webpack = require('webpack');

module.exports = {
	entry: {
		'public/login/app': './build/login/bundle',
		'public/dashboard/app': './build/dashboard/bundle' 
	},
	output: {
		path: './',
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};