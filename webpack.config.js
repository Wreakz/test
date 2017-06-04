var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		'app': './src/main.ts',
		'polyfills': [
			'core-js/es6',
			'core-js/es7/reflect',
			'zone.js/dist/zone'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.component.ts$/,
				loader: 'ts!angular2-template'
			},
			{
				test: /\.ts$/,
				exclude: /\.component.ts$/,
				loader: 'ts'
			},
			{
				test: /\.html$/,
				loader: 'raw'
			},
			{
				test: /\.css|scss$/,
				exclude: /node_modules/,
				loaders: ['raw-loader', 'sass-loader']
			},
			{
				test: /\.(woff2?|ttf|eot|svg)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /bootstrap-sass\/assets\/javascripts\//,
				loader: 'imports?jQuery=jquery'
			}
		]
	},
	resolve: {
		modulesDirectories: ['node_modules', 'src'],
		extensions: ['', '.js', '.ts', '.html', '.scss']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
			app: {
				environment: JSON.stringify(process.env.ENV || 'development')
			}
		})
	]
};