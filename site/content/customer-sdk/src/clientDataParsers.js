// @flow
import { isObject, pickOwn } from '@livechat/data-utils'
import type { ChatId, EventOptionalProps, RNFile } from './types'

export const parseRatingProperties = event => ({ rating: pickOwn(['score', 'comment'], event) })

// TODO: we could validate and throw here
// but should we? maybe only in DEV mode?
export const parseEvent = event => {
	let parsed = {}
	parsed.type = event.type
	switch (event.type) {
	case 'message':
		parsed.text = event.text
		break
	case 'rating':
		parsed.type = 'annotation'
		parsed.annotation_type = 'rating'
		parsed.properties = parseRatingProperties(event)
		break
	default:
		parsed = event
		break
	}

	if (typeof event.customId === 'string') {
		parsed.custom_id = event.customId
	}

	if (event.postback) {
		parsed.postback = event.postback
	}

	if (isObject(event.properties)) {
		parsed.properties = event.properties
	}

	return parsed
}

export const parseFileData = (
	chat: ChatId,
	data: {
		...EventOptionalProps,
		file: Blob | RNFile,
	},
) => {
	const payload = {}
	payload['payload.chat_id'] = chat
	payload['payload.file'] = data.file
	if (data.customId) {
		payload['payload.custom_id'] = data.customId
	}
	return payload
}

export const parseStartChatData = ({ scope = { type: 'license' }, events, properties }) => {
	const data = {}
	data.chat = {}
	data.routing_scope = scope

	if (events !== undefined) {
		data.chat.thread = { events: events.map(parseEvent) }
	}

	if (properties !== undefined) {
		data.chat.properties = properties
	}

	return data
}

export const parseUpdateLastSeenTimestampData = data => {
	const parsed = {}
	parsed.chat_id = data.chat

	if (typeof data.timestamp === 'number') {
		parsed.timestamp = Math.floor(data.timestamp / 1000)
	}

	return parsed
}
