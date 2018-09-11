export default file => (typeof file.uri === 'string' ? true : { error: 'You need to specify uri of the file.' })
