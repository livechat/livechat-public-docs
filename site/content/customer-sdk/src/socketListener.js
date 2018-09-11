// @flow

import { getAllRequests, getConnectionStatus, getRequest, getSelfData } from './reducer'
import * as serverDataParser from './serverDataParser'

import type { Socket, Store } from './types'

const handleResponseError = ({ dispatch, getState }, response) => {
	const { request_id: requestId, payload } = response
	const { reject, action } = getRequest(getState(), requestId)

	dispatch({
		type: 'request_failed',
		payload: {
			id: requestId,
			reject,
			error: serverDataParser.parseServerError(action, payload.error),
		},
	})
}

const handleResponse = ({ dispatch, getState }, response) => {
	const { request_id: requestId, payload } = response
	const { promise, resolve, action, data } = getRequest(getState(), requestId)

	dispatch({
		type: 'response_received',
		payload: {
			id: requestId,
			action,
			data,
			promise,
			resolve,
			response: serverDataParser.parseResponse(action, payload),
		},
	})
}

const handlePush = (store, push) => {
	store.dispatch({
		type: 'push_received',
		payload: { action: push.action, push: serverDataParser.parsePush(push) },
	})
}

const handlePushResponse = (store, push) => {
	// TODO: check if this still happens
	// filter out extraneous pushes, atm there is only a single situation that need to be handled here:
	// - login is also generating `customer_page_updated` push
	if (getRequest(store.getState(), push.request_id) === undefined) {
		return
	}
	handleResponse(store, push)
}

export default (store: Store, socket: Socket) => {
	const { dispatch, getState } = store

	const METHODS_WITH_DIRECT_RESPONSE = {
		login: true,
		send_sneak_peek: true,
		get_chats_summary: true,
		get_chat_threads: true,
		get_chat_threads_summary: true,
		get_predicted_agent: true,
		get_url_details: true,
		send_rich_message_postback: true,
	}

	const messageHandler = message => {
		if (message.type === 'response') {
			if (!message.success) {
				handleResponseError(store, message)
				return
			}
			if (METHODS_WITH_DIRECT_RESPONSE[message.action]) {
				handleResponse(store, message)
			}
			return
		}

		// some extra refining happens here to satisfy flow
		if (typeof message.request_id === 'string') {
			handlePushResponse(store, message)
		} else if (message.request_id === undefined && message.type === 'push') {
			handlePush(store, message)
		}
	}

	const connectHandler = () => {
		dispatch({ type: 'socket_connected' })
	}

	const disconnectHandler = () => {
		const requests = getAllRequests(getState())
		dispatch({
			type: 'socket_disconnected',
			payload: {
				previousStatus: getConnectionStatus(getState()),
				rejects: Object.keys(requests).map(requestId => requests[requestId].reject),
			},
		})
	}

	socket.on('connect', connectHandler)
	socket.on('message', messageHandler)
	socket.on('disconnect', disconnectHandler)

	return () => {
		socket.off('connect', connectHandler)
		socket.off('message', messageHandler)
		socket.off('disconnect', disconnectHandler)
	}
}
