const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = [
	{
		target: 'node',
		entry: './src/app-server.js',
		output: {
			path: path.join(__dirname, 'dist/server'),
			filename: 'main.js',
		},
		module: {
			rules: [
				{
					test: /\.vue$/i,
					use: 'vue-loader',
				},
			]
		},
		optimization: {
			chunkIds: 'named',
			moduleIds: 'deterministic',
			concatenateModules: false,
			splitChunks: false,
			minimizer: [],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new VueLoaderPlugin(),
		],
		externals: [nodeExternals()],
	},
	{
		target: 'web',
		entry: './src/app-browser.js',
		output: {
			path: path.join(__dirname, 'dist/browser'),
			filename: 'main.js',
		},
		module: {
			rules: [
				{
					test: /\.vue$/i,
					use: 'vue-loader',
				},
			]
		},
		optimization: {
			chunkIds: 'named',
			moduleIds: 'deterministic',
			concatenateModules: false,
			splitChunks: false,
			minimizer: [],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new VueLoaderPlugin(),
		],
	}
];

