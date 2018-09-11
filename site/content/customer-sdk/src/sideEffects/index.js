// @flow
import storage from '@livechat/isomorphic-storage'
import { noop, splitAt } from '@livechat/data-utils'
import createError from '../createError'
import { isChatActive, isConnected, isDestroyed } from '../reducer'
import * as actions from '../actions'
import * as serverDataParser from '../serverDataParser'
import sendRequestAction from '../sendRequestAction'
import createLoginTask from './login'
import * as connectionStatuses from '../constants/connectionStatuses'
import { getSideStorageKey } from './utils'

import type { Action, SDKEvents, Socket, Store } from '../types'

const hasActivatedNewThread = response => !!(response.users && response.thread)

const updateStateIfNeeded = (store, action) => {
	const state = store.getState()
	const type = action.payload.action
	const data = action.type === 'push_received' ? action.payload.push : action.payload.response

	switch (type) {
	case 'close_thread':
		store.dispatch(actions.setChatActive(action.payload.data.chat_id, false))
		break
	case 'get_chats_summary':
		data.chatsSummary.filter(({ id, active }) => isChatActive(state, id) !== active).forEach(({ id, active }) => {
			store.dispatch(actions.setChatActive(id, active))
		})
		break
	case 'incoming_chat_thread':
		store.dispatch(actions.setChatActive(data.thread.chat, true))
		break
	case 'send_event':
		if (hasActivatedNewThread(data)) {
			store.dispatch(actions.setChatActive(action.payload.data.chat_id, true))
		}
		break
	case 'start_chat':
		store.dispatch(actions.setChatActive(data.chat.id, true))
		break
	case 'thread_closed':
		store.dispatch(actions.setChatActive(data.chat, false))
		break
	default:
		break
	}
}

const sendRequest = (store, socket, { payload: { id, action, data: payload } }) => {
	const frame = {}
	frame.request_id = id
	frame.action = action
	if (payload !== null) {
		frame.payload = payload
	}
	socket.emit(frame)
}

const emitUsers = (emit, users) => {
	users.forEach(user => {
		emit('user_data', user)
	})
}

const emitNewThreadData = (emit, data) => {
	const threadSummary = serverDataParser.parseThreadSummary(data.thread)

	emitUsers(emit, data.users)
	emit('thread_summary', threadSummary)
	data.thread.users.forEach(user => {
		emit('user_joined_chat', { chat: threadSummary.chat, user })
	})
}

const failureReasons = {
	NO_CONNECTION: 'No connection.',
	SDK_DESTROYED: 'SDK destroyed.',
}

const failRequest = (store, requestAction, code) => {
	const { requests } = store.getState()
	const requestId = requestAction.payload.id
	store.dispatch({
		type: 'request_failed',
		payload: {
			id: requestId,
			reject: requests[requestId].reject,
			error: {
				message: failureReasons[code],
				code,
			},
		},
	})
}

const handlePush = ({ emit, store }, { payload: { action, push } }) => {
	switch (action) {
	case 'chat_properties_updated':
	case 'chat_thread_properties_updated':
	case 'last_seen_timestamp_updated':
	case 'thread_closed':
		emit(action, push)
		return
	case 'customer_side_storage_updated':
		storage.setItem(getSideStorageKey(store), JSON.stringify(push.customer_side_storage)).catch(noop)
		return
	case 'chat_user_added':
		emitUsers(emit, [push.user])
		emit('user_joined_chat', { chat: push.chat, user: push.user.id })
		return
	case 'chat_user_removed':
		emit('user_left_chat', push)
		return
	case 'customer_disconnected':
		emit('disconnected', push)

		switch (push.reason) {
		case 'customer_banned':
		case 'license_not_found':
		case 'unsupported_version':
		case 'license_version_changed':
			store.dispatch({ type: 'destroy' })
			break
		default:
			break
		}

		return
	case 'incoming_chat_thread':
		emitNewThreadData(emit, push)
		push.events.forEach(event => {
			emit('new_event', {
				chat: push.thread.chat,
				event,
			})
		})
		return
	case 'incoming_event':
		emit('new_event', push)
		return
	case 'incoming_typing_indicator':
		emit(push.isTyping ? 'user_is_typing' : 'user_stopped_typing', { chat: push.chat, user: push.user })
		return
	case 'customer_updated':
		store.dispatch({ type: 'update_customer', payload: push })
		emit(action, push)
		return
	default:
		emit(action, push)
		return
	}
}

const handleResponse = ({ emit, store }, { payload: { action, promise, resolve, response } }) => {
	switch (action) {
	case 'get_chat_threads':
		emitUsers(emit, response.users)
		resolve(response.threads)
		return
	case 'get_chats_summary':
		const { chatsSummary, totalChats, users } = response
		emitUsers(emit, users)
		resolve({ chatsSummary, totalChats })
		return
	case 'send_event':
		if (hasActivatedNewThread(response)) {
			emitNewThreadData(emit, response)

			const emitEvents = events => {
				events.forEach(event => {
					emit('new_event', {
						chat: response.thread.chat,
						event,
					})
				})
			}

			if (response.events[0].author === store.getState().users.self.id) {
				const [event, ...events] = response.events
				resolve(event)
				promise.then(() => {
					emitEvents(events)
				})
			} else {
				const [events, [event]] = splitAt(-1, response.events)
				emitEvents(events)
				resolve(event)
			}
		}

		resolve(response.event)
		return
	case 'start_chat':
		emitNewThreadData(emit, response)
		resolve(response.chat)
		return
	default:
		resolve(response)
		return
	}
}

export default (emitter, socket: Socket, auth) => {
	const login = createLoginTask(socket, auth)

	return (action: Action, store: Store) => {
		const { emit } = emitter
		const { type, payload } = action
		switch (type) {
		case 'destroy':
			socket.off()
			emitter.off()
			socket.disconnect()
			return
		case 'emit_events':
			action.payload.forEach(([eventName, eventData]) => {
				emit(eventName, eventData)
			})
			return
		case 'login_success':
			const eventData = {
				chatsSummary: payload.chatsSummary,
				totalChats: payload.totalChats,
			}
			// $FlowFixMe
			Object.defineProperty(eventData, '__unsafeDynamicConfig', { value: payload.dynamicConfig })
			emit(
				payload.previousStatus === connectionStatuses.DISCONNECTED ? 'connected' : 'connection_restored',
				eventData,
			)

			const { queuedPushes, storedUpdates } = store.getState()

			const storedUpdateActions = Object.keys(storedUpdates)

			if (storedUpdateActions.length !== 0) {
				storedUpdateActions.forEach(updateAction => {
					sendRequestAction(store, actions.sendRequest(updateAction, storedUpdates[updateAction])).catch(noop)
				})

				store.dispatch({ type: 'clear_stored_updates' })
			}

			if (queuedPushes.length !== 0) {
				queuedPushes.forEach(queuedPush => {
					handlePush({ emit, store }, queuedPush)
				})
				store.dispatch({ type: 'clear_push_queue' })
			}
			return
		case 'prefetch_token':
			auth.getToken().catch(noop)
			return
		case 'push_received':
			updateStateIfNeeded(store, action)
			if (!isConnected(store.getState())) {
				store.dispatch({ type: 'queue_push', payload: action })
				return
			}
			handlePush({ emit, store }, action)
			return
		case 'reconnect':
			socket.reconnect(action.payload.delay)
			return
		case 'request_failed':
			payload.reject(createError(payload.error))
			return
		case 'response_received':
			updateStateIfNeeded(store, action)
			handleResponse({ emit, store }, action)
			return
		case 'send_request':
			const state = store.getState()

			if (isDestroyed(state)) {
				failRequest(store, action, 'SDK_DESTROYED')
				return
			}

			if (!isConnected(state) && action.meta.source !== 'login') {
				failRequest(store, action, 'NO_CONNECTION')
				return
			}
			sendRequest(store, socket, action)
			return
		case 'set_self_id':
			emit('customer_id', payload)
			return
		case 'socket_connected':
			login(store)
			return
		case 'socket_disconnected':
			if (payload.previousStatus === connectionStatuses.CONNECTED) {
				emit('connection_lost')
			}

			payload.rejects.forEach(reject => {
				reject(createError({ message: 'Connection lost.', code: 'CONNECTION_LOST' }))
			})
			return
		case 'stop_connection':
			socket.disconnect()
			return
		case 'start_connection':
			socket.connect()
			store.dispatch({ type: 'prefetch_token' })
			return
		default:
			return
		}
	}
}
