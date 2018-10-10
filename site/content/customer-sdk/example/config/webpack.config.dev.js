const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

const publicPath = '/'
const publicUrl = ''
const env = getClientEnvironment(publicUrl)

const lernaAliases = require('lerna-alias')

module.exports = {
	// devtool: 'cheap-module-source-map',
	entry: [
		paths.polyfill,
		require.resolve('webpack-dev-server/client') + '?/',
		require.resolve('webpack/hot/dev-server'),
		paths.appIndexJs,
	],
	output: {
		path: paths.appBuild,
		pathinfo: true,
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
		publicPath: publicPath,
		// devtoolModuleFilenameTemplate: info =>
		//   path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
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
							cacheDirectory: true,
						},
					},
					{
						test: /\.css$/,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
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
					{
						exclude: [/\.js$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
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
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin(env.stringified),
		new webpack.HotModuleReplacementPlugin(),
		new CaseSensitivePathsPlugin(),
		new WatchMissingNodeModulesPlugin(paths.appNodeModules),
	],
	node: false,
	performance: {
		hints: false,
	},
}
