import { isObject } from '@livechat/data-utils'
import * as clientDataParsers from './clientDataParsers'

export const sendRequest = (action, data = null, meta = {}) => ({
	type: 'send_request',
	payload: {
		action,
		data,
	},
	meta,
})

export const sendEvent = (chat, data, meta) => {
	const event = clientDataParsers.parseEvent(data)
	const payload = {
		chat_id: chat,
		event,
	}
	if (isObject(meta)) {
		if (meta.attachToLastThread) {
			payload.attach_to_last_thread = true
		}
	}
	const action = sendRequest('send_event', payload)

	return action
}

export const setChatActive = (id, active) => ({ type: 'set_chat_active', payload: { id, active } })

export const storeUpdate = (updateAction, data) => ({
	type: 'store_update',
	payload: {
		updateAction,
		data,
	},
})
