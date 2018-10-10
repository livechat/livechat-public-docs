// @flow
import createAuth, { validateConfig } from '@livechat/customer-auth'
import mitt from '@livechat/mitt'
import $$observable from 'symbol-observable'
import createStore from './createStore'
import { isChatActive, isConnected, isLogging } from './reducer'
import chatHistory from './chatHistory'
import socketWrapper from './socket'
import socketListener from './socketListener'
import _sendRequestAction from './sendRequestAction'
import sendFile from './sendFile'
import * as actions from './actions'
import * as clientDataParsers from './clientDataParsers'
import { isObject, last, noop } from '@livechat/data-utils'
export { default as debug } from './debug'
import type {
	ChatId,
	CustomerPage,
	Env,
	EventId,
	EventOptionalProps,
	LicenseId,
	Timestamp,
	ThreadId,
	EventServerBase,
	Message,
	Event,
	Rating,
	Customer,
	ThreadSummary,
	Thread,
	ChatSummary,
	Chat,
	Postback,
	RNFile,
	RoutingScope,
	Success,
	SDKEvents,
	Pagination,
} from './types'

const CHATS_PAGINATION_MAX_LIMIT = 25
const THREADS_PAGINATION_MAX_LIMIT = 1000

export const init = (
	config: {
		autoConnect?: boolean,
		customer?: {
			name?: $ElementType<Customer, 'name'>,
			email?: $ElementType<Customer, 'email'>,
			fields?: $ElementType<Customer, 'fields'>,
		},
		license: LicenseId,
		group?: number,
		region?: string,
		clientId: string,
		page: CustomerPage,
		referrer?: string,
		uniqueGroups?: boolean,
	},
	env: Env = 'production',
) => {
	validateConfig(config)
	const { autoConnect = true, license, group, customer, region, page: initialPage, referrer, uniqueGroups } = config
	const envPart = (() => {
		if (license === 1520) {
			return '.staging'
		}
		if (env === 'production') {
			return ''
		}
		return `.${ env }`
	})()
	const regionPart = region ? `-${ region }` : ''
	const serverUrl = `https://api${ regionPart }${ envPart }.livechatinc.com/v3.0/customer`

	const emitter = mitt()
	const socket = socketWrapper.create(`${ serverUrl }/rtm/sjs`, license)
	const auth = createAuth(config, env)

	const store = createStore(
		{ license, group, customer, env, page: initialPage, referrer, uniqueGroups },
		emitter,
		socket,
		auth,
	)

	if (process.env.NODE_ENV !== 'production') {
		window.customerSocket = socket
	}

	socketListener(store, socket)

	const sendRequestAction = _sendRequestAction.bind(null, store)
	const startConnection = () => {
		store.dispatch({ type: 'start_connection' })
	}

	const api = Object.freeze({
		auth,
		closeThread(chat: ChatId): Promise<Success> {
			return sendRequestAction(actions.sendRequest('close_thread', { chat_id: chat }))
		},
		connect: startConnection,
		destroy() {
			store.dispatch({ type: 'destroy' })
		},
		disconnect() {
			store.dispatch({ type: 'stop_connection' })
		},
		getChatHistory(chat: ChatId): $AsyncIterator<Event[], Event[], void> {
			return chatHistory(store, api, chat)
		},
		getChatsSummary(pagination: Pagination = {}): Promise<{ chatsSummary: ChatSummary[], totalChats: number }> {
			const { offset = 0, limit = 10 } = pagination

			if (limit > CHATS_PAGINATION_MAX_LIMIT) {
				return Promise.reject(new Error(`Specified limit is too high (max ${ CHATS_PAGINATION_MAX_LIMIT }).`))
			}

			return sendRequestAction(actions.sendRequest('get_chats_summary', { offset, limit }))
		},
		getChatThreads(chat: ChatId, threads: ThreadId[]): Promise<Thread[]> {
			return sendRequestAction(
				actions.sendRequest('get_chat_threads', {
					chat_id: chat,
					thread_ids: threads,
				}),
			)
		},
		getChatThreadsSummary(
			chat: ChatId,
			pagination: Pagination = {},
		): Promise<{ threadsSummary: ThreadSummary[], totalThreads: number }> {
			const { offset = 0, limit = 25 } = pagination

			if (limit > THREADS_PAGINATION_MAX_LIMIT) {
				return Promise.reject(new Error(`Specified limit is too high (max ${ THREADS_PAGINATION_MAX_LIMIT }).`))
			}

			return sendRequestAction(
				actions.sendRequest('get_chat_threads_summary', {
					chat_id: chat,
					offset,
					limit,
				}),
			)
		},
		getPredictedAgent() {
			return sendRequestAction(actions.sendRequest('get_predicted_agent'))
		},
		getUrlDetails(url: string) {
			return sendRequestAction(actions.sendRequest('get_url_details', { url }))
		},
		on: (emitter.on: SDKEvents),
		once: (emitter.once: SDKEvents),
		off: (emitter.off: SDKEvents),
		rateChat(chat: ChatId, rating: $Diff<Rating, { ...EventServerBase, type: 'rating' }>): Promise<{ id: string }> {
			const event = { ...rating, type: 'rating' }

			// $FlowFixMe
			return Promise.all([api.sendEvent(chat, event).catch(() => ({})), api.getChatThreadsSummary(chat)])
				.then(([eventResponse, { threadsSummary }]) =>
					Promise.all([
						eventResponse,
						api.updateChatThreadProperties(
							chat,
							last(threadsSummary).id,
							clientDataParsers.parseRatingProperties(event),
						),
					]),
				)
				.then(([{ id }]) => ({ id }))
		},
		sendEvent<T: Event>(chat: ChatId, event: $Diff<T, EventServerBase>, meta): Promise<T> {
			return sendRequestAction(actions.sendEvent(chat, event, meta))
		},
		sendFile(
			chat: ChatId,
			data: {
				...EventOptionalProps,
				file: Blob | RNFile,
			},
			spec: {
				onProgress: number => mixed,
			},
		) {
			return sendFile({ auth, chat, license, serverUrl, data, spec })
		},
		sendPostback(chat: ChatId, thread: ThreadId, event: EventId, { id, toggled = true }: Postback): Promise<Postback> {
			return sendRequestAction(
				actions.sendRequest('send_rich_message_postback', {
					chat_id: chat,
					event_id: event,
					thread_id: thread,
					postback: {
						id,
						toggled,
					},
				}),
			)
		},
		setSneakPeek: (chat: ChatId, text: string) => {
			if (!isChatActive(store.getState(), chat)) {
				return
			}
			sendRequestAction(
				actions.sendRequest('send_sneak_peek', {
					chat_id: chat,
					sneak_peek_text: text,
				}),
			)
		},
		startChat(
			data: {
				scope?: RoutingScope,
				events?: Array<$Diff<Event, EventServerBase>>,
				// TODO: uncomment when configuration API is done
				// properties?: Properties,
			} = {},
		): Promise<Chat> {
			return sendRequestAction(actions.sendRequest('start_chat', clientDataParsers.parseStartChatData(data)))
		},
		updateChatProperties(chat: ChatId, properties: Properties): Promise<Success> {
			return sendRequestAction(
				actions.sendRequest('update_chat_properties', {
					chat_id: chat,
					properties,
				}),
			)
		},
		updateChatThreadProperties(chat: ChatId, thread: ThreadId, properties: Properties): Promise<Success> {
			return sendRequestAction(
				actions.sendRequest('update_chat_thread_properties', {
					chat_id: chat,
					thread_id: thread,
					properties,
				}),
			)
		},
		updateCustomer(properties: {
			name?: $ElementType<Customer, 'name'>,
			email?: $ElementType<Customer, 'email'>,
			fields?: $ElementType<Customer, 'fields'>,
		}): void {
			store.dispatch({ type: 'update_customer', payload: properties })

			const state = store.getState()

			if (isConnected(state)) {
				sendRequestAction(actions.sendRequest('update_customer', properties)).catch(noop)
			} else if (isLogging(state)) {
				store.dispatch(actions.storeUpdate('update_customer', properties))
			}
		},
		updateCustomerPage(page: CustomerPage): void {
			store.dispatch({ type: 'update_customer_page', payload: page })

			const state = store.getState()

			if (isConnected(state)) {
				sendRequestAction(actions.sendRequest('update_customer_page', page)).catch(noop)
			} else if (isLogging(state)) {
				store.dispatch(actions.storeUpdate('update_customer_page', page))
			}
		},
		updateEventProperties(chat: ChatId, thread: ThreadId, event: EventId, properties: Properties): Promise<Success> {
			return sendRequestAction(
				actions.sendRequest('update_event_properties', {
					chat_id: chat,
					event_id: event,
					thread_id: thread,
					properties,
				}),
			)
		},
		updateLastSeenTimestamp(chat: ChatId, timestamp?: Timestamp): Promise<{ timestamp: Timestamp }> {
			return sendRequestAction(
				actions.sendRequest(
					'update_last_seen_timestamp',
					clientDataParsers.parseUpdateLastSeenTimestampData({ chat, timestamp }),
				),
			)
		},
		[$$observable]() {
			return {
				subscribe(observer) {
					if (!isObject(observer)) {
						throw new TypeError('Expected the observer to be an object.')
					}
					const subscriber = (type, event) => {
						if (typeof observer.next !== 'function') {
							return
						}
						observer.next([type, event])
					}
					emitter.on('*', subscriber)
					return () => emitter.off('*', subscriber)
				},
			}
		},
	})

	if (autoConnect) {
		startConnection()
	}

	return api
}
