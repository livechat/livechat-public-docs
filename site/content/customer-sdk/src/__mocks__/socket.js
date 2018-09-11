import mitt from '@livechat/mitt'
import fs from 'fs'
import path from 'path'
import cloneDeep from 'lodash/fp/cloneDeep'
import compose from 'lodash/fp/compose'
import find from 'lodash/fp/find'
import flatMap from 'lodash/fp/flatMap'
import get from 'lodash/fp/get'
import groupBy from 'lodash/fp/groupBy'
import keyBy from 'lodash/fp/keyBy'
import last from 'lodash/fp/last'
import map from 'lodash/fp/map'
import mapValues from 'lodash/fp/mapValues'
import merge from 'lodash/fp/merge'
import omit from 'lodash/fp/omit'
import pick from 'lodash/fp/pick'
import unionBy from 'lodash/fp/unionBy'

const unionById = unionBy(get('id'))

const FIXTURE_PATH = path.join(__dirname, '../../fixtures')
const fixturesCache = {}

const loadFixture = fixturePath => {
	if (fixturesCache[fixturePath]) {
		return fixturesCache[fixturePath]
	}
	return (fixturesCache[fixturePath] = fs.readFileSync(fixturePath, { encoding: 'utf8' }))
}

const TEST_CUSTOMER_ID = JSON.parse(loadFixture(path.join(FIXTURE_PATH, 'users/customer1.json'))).id

let serverState

const getChatsSummary = pagination => {
	return {
		chats_summary: map(chat => {
			return {
				...pick(['id', 'order', 'users'], chat),
				last_event_per_type: compose(
					mapValues(
						compose(event => {
							const { id: threadId, order: threadOrder } = find(
								thread => thread.events.some(({ id }) => event.id === id),
								chat.threads,
							)
							return {
								event: cloneDeep(event),
								thread_id: threadId,
								thread_order: threadOrder,
							}
						}, last),
					),
					groupBy(get('type')),
					flatMap(get('events')),
				)(chat.threads),
			}
		}, serverState.chats),
		total_chats: Object.keys(serverState.chats).length,
	}
}

// should consider 2 scenarios - with active and inactive thread
const getSentEvent = ({ chat_id: chat, event }) => {
	const lastThread = last(serverState.chats[chat].threads)

	const sentEvent = {
		type: event.type,
		id: `sent_event_${ ++serverState.sentEventsCounter }`,
		author_id: TEST_CUSTOMER_ID,
		order: lastThread.active ? last(lastThread.events).order + 1 : 1,
		timestamp: Math.floor(Date.now() / 1000),
	}

	if (typeof event.custom_id === 'string') {
		sentEvent.custom_id = event.custom_id
	}

	switch (event.type) {
	case 'message':
		if (typeof event.text !== 'string') {
			throw new Error(
				JSON.stringify({
					message: '`event.text` is required',
					type: 'validation',
				}),
			)
		}
		sentEvent.text = event.text
		break
	default:
		Object.assign(sentEvent, omit(['type', 'custom_id'], event))
		break
	}

	return {
		thread_id: lastThread.active ? lastThread.id : `created_thread_${ ++serverState.createdThreadsCounter }`,
		event: sentEvent,
	}
}

const createResponse = ({ request_id: id, action }, payload) => ({
	type: 'response',
	success: true,
	request_id: id,
	action,
	payload,
})

const createServerError = ({ request_id: id, action }, payload) => ({
	type: 'response',
	success: false,
	request_id: id,
	action,
	payload: { error: JSON.parse(payload) },
})

const createPushResponse = (request, response) => {
	switch (request.action) {
	case 'send_event':
		const chatId = request.payload.chat_id
		const serverChat = serverState.chats[chatId]
		const lastThread = last(serverChat.threads)

		if (lastThread.id !== response.payload.thread_id) {
			const createdThread = {
				active: true,
				order: lastThread.order + 1,
				id: response.payload.thread_id,
				users: [find(user => user.id === TEST_CUSTOMER_ID, serverChat.users)].map(cloneDeep),
				events: [cloneDeep(response.payload.event)],
			}
			serverState.chats[chatId].threads.push(createdThread)
			return {
				...response,
				type: 'push',
				action: 'incoming_chat_thread',
				payload: {
					chat: {
						id: chatId,
						users: serverChat.users.map(cloneDeep),
						thread: cloneDeep({
							...omit(['users'], createdThread),
							user_ids: createdThread.users.map(get('id')),
						}),
					},
				},
			}
		}

		lastThread.events.push(cloneDeep(response.payload.event))
		return merge(response, {
			type: 'push',
			action: 'incoming_event',
			payload: {
				chat_id: chatId,
			},
		})
	case 'update_customer':
		return merge(response, {
			type: 'push',
			action: 'customer_updated',
		})
	default:
		throw new Error('Unknown request.action')
	}
}

const handleRequest = (emitter, request) => {
	switch (request.action) {
	case 'get_chats_summary':
		Promise.resolve().then(() => {
			const response = createResponse(request, getChatsSummary(request.payload))
			emitter.emit('message', response)
		})
		return
	case 'login':
		Promise.resolve().then(() => {
			emitter.emit(
				'message',
				createResponse(request, {
					customer_id: TEST_CUSTOMER_ID,
					static_config_path: 'https://some.url.com',
				}),
			)
		})
		return
	case 'send_event':
		Promise.resolve()
			.then(() => {
				const response = createResponse(request, getSentEvent(request.payload))
				emitter.emit('message', response)
				return response
			})
			.then(response => {
				const pushResponse = createPushResponse(request, response)
				emitter.emit('message', pushResponse)
			})
			.catch(err => {
				emitter.emit('message', createServerError(request, err.message))
			})
		return
	case 'update_customer':
		Promise.resolve()
			.then(() => {
				// this flow need some serious work
				// 1. response data needs to be merged: sentData+serverData
				// 2. returned name should default to Customer
				// 3. payload shape need to be validated
				const response = createResponse(request, { customer: merge({}, request.payload) })
				emitter.emit('message', response)
				return response
			})
			.then(response => {
				const pushResponse = createPushResponse(request, response)
				emitter.emit('message', pushResponse)
			})
		return
	default:
		throw new Error('Unknown request.action')
	}
}

const emptyServerState = {
	chats: {},
	customer: TEST_CUSTOMER_ID,
	sentEventsCounter: 0,
	createdThreadsCounter: 0,
}

export const server = {
	addChats(fixtureNames) {
		const chats = fixtureNames.map(fixtureName => {
			const chat = JSON.parse(loadFixture(path.join(FIXTURE_PATH, 'chats', `${ fixtureName }.json`)))
			const lastThread = last(chat.threads)
			const threads = chat.threads.map(thread => {
				return {
					...thread,
					active: thread === lastThread ? thread.active === true : false,
					users: thread.users.map(user => {
						return JSON.parse(loadFixture(path.join(FIXTURE_PATH, 'users', `${ user.replace('fixture_', '') }.json`)))
					}),
				}
			})

			return {
				...chat,
				threads,
				users: threads.map(({ users }) => users).reduce((accUsers, users) => unionById(accUsers, users), []),
			}
		})
		serverState.chats = keyBy('id', chats)
	},
	clearHistory() {
		server.setHistory(emptyServerState)
	},
	setHistory(state) {
		serverState = cloneDeep(state)
	},
}

export default {
	create() {
		const emitter = mitt()
		let connected = false
		const connect = () => {
			Promise.resolve().then(() => {
				connected = true
				emitter.emit('connect')
			})
		}
		return {
			connect,
			disconnect: () => (connected = false),
			emit(request) {
				handleRequest(emitter, request)
			},
			on: emitter.on,
			off: emitter.off,
		}
	},
}
