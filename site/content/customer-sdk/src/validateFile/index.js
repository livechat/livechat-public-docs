const KILOBYTE = 1024
const MEGABYTE = 1024 * KILOBYTE
const GIGABYTE = 1024 * MEGABYTE

const SIZE_LIMIT = 10 * MEGABYTE

const formatBytes = (bytes, precision = 2) => {
	if (bytes < KILOBYTE) {
		return `${ bytes } b`
	}

	const kilobytes = bytes / 1024

	if (bytes < MEGABYTE) {
		return `${ kilobytes.toFixed(precision) } kb`
	}

	const megabytes = kilobytes / 1024

	if (bytes < GIGABYTE) {
		return `${ megabytes.toFixed(precision) } MB`
	}

	const gigabytes = megabytes / 1024

	return `${ gigabytes.toFixed(precision) } GB`
}

export default file =>
	file.size <= SIZE_LIMIT ? true : { error: `The file is too big (max size is ${ formatBytes(SIZE_LIMIT) }).` }
