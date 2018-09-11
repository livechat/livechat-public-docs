// @flow
import uploadFile from '@livechat/file-upload'
import { buildQueryString } from '@livechat/url-utils'
import validateFile from './validateFile'
import * as clientDataParsers from './clientDataParsers'

import type { ChatId, EventOptionalProps, LicenseId, RNFile } from './types'

export default ({
	auth,
	chat,
	license,
	serverUrl,
	data,
	spec,
}: {
	auth: any,
	license: LicenseId,
	chat: ChatId,
	serverUrl: string,
	data: {
		...EventOptionalProps,
		file: Blob | RNFile,
	},
	spec: {
		onProgress: number => mixed,
	},
}) => {
	let upload
	let cancelled = false

	const send = new Promise((resolve, reject) => {
		const validation = validateFile(data.file)

		if (validation !== true) {
			reject(new Error(validation.error))
			return
		}

		const query = buildQueryString({
			license_id: license,
		})
		const url = `${ serverUrl }/action/send_file?${ query }`
		const payload = clientDataParsers.parseFileData(chat, data)

		auth.getToken().then(token => {
			if (cancelled) {
				reject(new Error('Upload cancelled.'))
				return
			}

			upload = uploadFile(url, payload, {
				...spec,
				headers: {
					Authorization: `${ token.tokenType } ${ token.accessToken }`,
				},
			})

			upload.then(response => resolve(response.payload), reject)
		})
	})

	return {
		// $FlowFixMe - extending builtins is hard
		then: (onResolve, onReject) => send.then(onResolve, onReject),
		// $FlowFixMe - extending builtins is hard
		catch: onReject => send.catch(onReject),
		cancel() {
			if (cancelled) {
				return
			}

			cancelled = true

			if (upload) {
				upload.cancel()
			}
		},
	}
}
