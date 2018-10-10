const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

const lernaAliases = require('lerna-alias')

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
	throw new Error('Production builds must have NODE_ENV=production.')
}

const cssFilename = 'static/css/[name].[contenthash:8].css'

const extractTextPluginOptions = shouldUseRelativeAssetPaths
	? { publicPath: Array(cssFilename.split('/').length).join('../') }
	: {}

module.exports = {
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: [paths.polyfill, paths.appIndexJs],
	output: {
		path: paths.appBuild,
		filename: 'static/js/[name].[chunkhash:8].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
		publicPath: publicPath,
		devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
	},
	resolve: {
		modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
		alias: lernaAliases(),
		extensions: ['.js', '.json', '.jsx'],
		plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson, ...Object.values(lernaAliases())])],
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				oneOf: [
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						loader: require.resolve('babel-loader'),
						options: {
							compact: true,
						},
					},
					{
						test: /\.css$/,
						loader: ExtractTextPlugin.extract(
							Object.assign(
								{
									fallback: require.resolve('style-loader'),
									use: [
										{
											loader: require.resolve('css-loader'),
											options: {
												importLoaders: 1,
												minimize: true,
												sourceMap: shouldUseSourceMap,
											},
										},
										{
											loader: require.resolve('postcss-loader'),
											options: {
												ident: 'postcss',
												plugins: () => [
													require('postcss-flexbugs-fixes'),
													autoprefixer({
														browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
														flexbox: 'no-2009',
													}),
												],
											},
										},
									],
								},
								extractTextPluginOptions
							)
						),
					},
					{
						loader: require.resolve('file-loader'),
						exclude: [/\.js$/, /\.html$/, /\.json$/],
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new InterpolateHtmlPlugin(env.raw),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		new webpack.DefinePlugin(env.stringified),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				comparisons: false,
			},
			output: {
				comments: false,
				ascii_only: true,
			},
			sourceMap: shouldUseSourceMap,
		}),
		new ExtractTextPlugin({
			filename: cssFilename,
		}),
	],
	node: false,
}
