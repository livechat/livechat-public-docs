import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import uglify from 'rollup-plugin-uglify'
import lernaAliases from 'lerna-alias'
import pkg from './package.json'

const ensureArray = maybeArr => (Array.isArray(maybeArr) ? maybeArr : [maybeArr])

const makeExternalPredicate = externalsArr => {
	if (externalsArr.length === 0) {
		return () => false
	}
	const externalPattern = new RegExp(`^(${ externalsArr.join('|') })($|/)`)
	return id => externalPattern.test(id)
}

const createConfig = ({ input = 'src/index.js', output, external = 'all', env, min = false } = {}) => ({
	input,
	output: ensureArray(output).map(format =>
		Object.assign({}, format, {
			name: 'CustomerSDK',
			exports: 'named',
		}),
	),
	external: makeExternalPredicate(
		external === 'all'
			? [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
			: Object.keys(pkg.peerDependencies || {}),
	),
	plugins: [
		alias(lernaAliases()),
		nodeResolve({ jsnext: true, browser: true }),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
		}),
		commonjs(),
		env &&
			replace({
				'process.env.NODE_ENV': JSON.stringify(env),
			}),
		min &&
			uglify({
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					warnings: false,
				},
			}),
	].filter(Boolean),
})

export default [
	createConfig({
		output: [
			{
				file: pkg.module,
				format: 'esm',
			},
			{
				file: pkg.main,
				format: 'cjs',
			},
		],
	}),
	createConfig({
		external: 'peers',
		env: 'development',
		output: {
			file: `dist/${ pkg.name.replace(/@.*\//, '') }.js`,
			format: 'umd',
		},
	}),
	createConfig({
		external: 'peers',
		env: 'production',
		min: true,
		output: {
			file: `dist/${ pkg.name.replace(/@.*\//, '') }.min.js`,
			format: 'umd',
		},
	}),
]
