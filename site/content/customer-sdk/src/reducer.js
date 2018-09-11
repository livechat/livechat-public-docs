// @flow

import { merge, isObject } from '@livechat/data-utils'
import * as connectionStatuses from './constants/connectionStatuses'
import type { ChatId, Customer, CustomerPage, Env, LicenseId, User, UserId } from './types'

// TODO: could it be replaced with $Values<connectionStatuses> ?
type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'stopped' | 'destroyed'

type StoredRequest = {|
	promise: any,
	resolve(any): void,
	reject(any): void,
	action: string,
	data: any,
|}

type StoredRequestsMap = {
	[id: string]: StoredRequest,
}

type State = {|
	license: LicenseId,
	group: ?number,
	env: Env,
	chats: {
		[id: ChatId]: {|
			active: boolean,
		|},
	},
	connection: {|
		status: ConnectionStatus,
		logging: boolean,
	|},
	page: ?CustomerPage,
	queuedPushes: any[],
	referrer: ?string,
	requests: StoredRequestsMap,
	storedUpdates: {
		[action: string]: Object,
	},
	users: {
		self: Customer,
		others: {
			[id: UserId]: User,
		},
	},
	uniqueGroups: boolean,
|}

export const getAllRequests = (state: State): StoredRequestsMap => state.requests

export const getConnectionStatus = (state: State): ConnectionStatus => state.connection.status

export const getRequest = (state: State, id: string): StoredRequest => state.requests[id]

export const getSelfData = (state: State) => {
	const data = {}
	const { self } = state.users
	if (self.name) {
		data.name = self.name
	}
	if (self.email) {
		data.email = self.email
	}
	data.fields = self.fields
	return data
}

export const getSelfId = (state: State) => state.users.self.id

export const isChatActive = (state: State, id: ChatId): boolean => {
	const chat = state.chats[id]
	return !!chat && chat.active
}

export const isConnected = (state: State): boolean => getConnectionStatus(state) === connectionStatuses.CONNECTED
export const isDestroyed = (state: State): boolean => getConnectionStatus(state) === connectionStatuses.DESTROYED
export const isLogging = (state: State): boolean => state.connection.logging

export const createInitialState = ({
	license,
	group = null,
	customer = {},
	env,
	page = null,
	referrer = null,
	uniqueGroups = false,
}) => ({
	license,
	env,
	group,
	chats: {},
	connection: {
		status: connectionStatuses.DISCONNECTED,
		logging: false,
	},
	page,
	queuedPushes: [],
	referrer,
	requests: {},
	storedUpdates: {},
	users: {
		self: {
			id: null,
			type: 'customer',
			name: customer.name || null,
			email: customer.email || null,
			fields: customer.fields || {},
		},
		others: {},
	},
	uniqueGroups,
})

export default (state: State, action) => {
	switch (action.type) {
	case 'clear_push_queue':
		state.queuedPushes.length = 0
		break
	case 'clear_stored_updates':
		state.storedUpdates = {}
		break
	case 'destroy':
		state.connection.status = connectionStatuses.DESTROYED
		break
	case 'login_attempt':
		state.connection.logging = true
		break
	case 'login_success':
		state.connection.logging = false
		state.connection.status = connectionStatuses.CONNECTED
		break
	case 'queue_push':
		state.queuedPushes.push(action.payload)
		break
	case 'request_failed':
	case 'response_received':
		delete state.requests[action.payload.id]
		break
	case 'send_request':
		const { action: requestAction, promise, resolve, reject, id, data: requestData } = action.payload
		state.requests[id] = {
			promise,
			resolve,
			reject,
			action: requestAction,
			data: requestData,
		}
		break
	case 'set_chat_active':
		state.chats[action.payload.id] = state.chats[action.payload.id] || {}
		state.chats[action.payload.id].active = action.payload.active
		break
	case 'set_self_id':
		state.users.self.id = action.payload
		break
	case 'socket_disconnected':
		const previousStatus = getConnectionStatus(state)
		if (
			process.env.NODE_ENV !== 'production' &&
				(previousStatus === connectionStatuses.STOPPED || previousStatus === connectionStatuses.DESTROYED)
		) {
			throw new Error(
				`Got 'socket_disconnected' action when in ${ previousStatus } state. This should be an impossible state.`,
			)
		}

		state.connection.logging = false
		state.connection.status =
				previousStatus === connectionStatuses.DISCONNECTED
					? connectionStatuses.DISCONNECTED
					: connectionStatuses.RECONNECTING
		state.queuedPushes.length = 0
		state.storedUpdates = {}
		state.requests = {}
		break
	case 'stop_connection':
		state.connection.status = connectionStatuses.STOPPED
		break
	case 'store_update':
		const { updateAction, data } = action.payload
		state.storedUpdates = merge(state.storedUpdates, { [updateAction]: data })
		break
	case 'update_customer':
		const { name, email, fields } = action.payload
		if (typeof name === 'string') {
			state.users.self.name = name
		}

		if (typeof email === 'string') {
			state.users.self.email = email
		}

		if (isObject(fields)) {
			state.users.self.fields = {
				...state.users.self.fields,
				...fields,
			}
		}

		break
	case 'update_customer_page':
		state.page = { ...action.payload }
		break
	default:
		break
	}
	return state
}
