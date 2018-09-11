const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const promisify = (callbackMethod, ...args) => {
	return new Promise((resolve, reject) => {
		callbackMethod(...args, (err, res) => {
			if (err) {
				reject(err)
				return
			}
			resolve(res)
		})
	})
}

const websiteDocsDir = './website-docs'

promisify(fs.readdir, websiteDocsDir)
	.then(fileNames => {
		return Promise.all(
			fileNames.map(fileName => {
				return promisify(fs.readFile, path.join(websiteDocsDir, fileName), 'utf8').then(content => [fileName, content])
			})
		)
	})
	.then(files => {
		const concatenatedReadme = files
			.map(([fileName, content]) => {
				const parsed = fm(content)

				if (fileName.indexOf('index') !== -1) {
					parsed.attributes.weight = 0
				}

				return parsed
			})
			.sort((fileA, fileB) => fileA.attributes.weight - fileB.attributes.weight)
			.map(file => file.body)
			.join('')
		return promisify(fs.writeFile, './README.md', concatenatedReadme)
	})
	.then(() => {
		// eslint-disable-next-line no-console
		console.log('Docs has been concatenated and saved!')
	})
	.catch(err => {
		console.error('Docs concatenation task has failed.', err)
		process.exit(1)
	})
