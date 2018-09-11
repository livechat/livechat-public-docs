const cjs = process.env.BABEL_ENV === 'cjs' || process.env.NODE_ENV === 'test'

const presets = [['es2015', { loose: true, modules: false }], 'stage-2']

const plugins = ['transform-flow-strip-types', cjs && 'transform-es2015-modules-commonjs'].filter(Boolean)

module.exports = { presets, plugins, comments: false }
