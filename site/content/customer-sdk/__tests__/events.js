jest.mock('@livechat/customer-auth', () => ({
	__esModule: true,
	validateConfig: ({ license, clientId }) => {
		if (typeof license !== 'number' || typeof clientId !== 'string') {
			throw new Error('You need to pass valid configuration object: { license, clientId }.')
		}
	},
	default: license => ({
		getToken() {
			return Promise.resolve({
				accessToken: String(Math.random()),
				entityId: 'test_customer_id',
				expiresIn: 28800000,
				tokenType: 'Bearer',
				creationDate: Date.now(),
				license,
			})
		},
	}),
}))

jest.mock('../src/socket')

import { last } from '@livechat/data-utils'
import * as CustomerSDK from '../src'
import * as socketModule from '../src/socket'

const KILOBYTE = 1024
const MEGABYTE = 1024 * KILOBYTE

const initSDK = () => CustomerSDK.init({ license: 123, clientId: 'test_client_id' })

describe('CustomerSDK - events sending', () => {
	const originalNow = Date.now
	beforeAll(() => {
		const now = Date.now()
		let counter = 0
		Date.now = () => now + ++counter * 60 * 1000
		Date.now.getTime = () => now + counter * 60 * 1000
	})
	beforeEach(() => {
		socketModule.server.clearHistory()
	})
	afterAll(() => {
		Date.now = originalNow
	})

	test('should send event to active chat', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id
			const lastThread = data.chatsSummary[0].lastEvent.thread

			sdk
				.sendEvent(chat, {
					type: 'message',
					text: 'test msg',
				})
				.then(message => {
					expect(message).toEqual({
						type: 'message',
						text: 'test msg',
						id: 'sent_event_1',
						author: 'test_customer_id',
						timestamp: Math.floor(Date.now.getTime() / 1000) * 1000,
						thread: lastThread,
						properties: {},
					})
					done()
				})
		})
	})

	test('should send message to inactive chat', done => {
		const actual = []
		const expected = [
			{ fields: {}, id: 'test_customer_id', type: 'customer' },
			{
				avatar: 'https://cdn.livechat-static.com/avatars/1.png',
				id: 'fixture_agent_1',
				name: 'John Doe',
				type: 'agent',
			},
			{
				active: true,
				chat: 'fixture_chat_2',
				id: 'created_thread_1',
				order: 3,
				totalEvents: 1,
				properties: {},
			},
			{
				type: 'message',
				text: 'test msg',
				id: 'sent_event_1',
				author: 'test_customer_id',
				timestamp: null,
				thread: 'created_thread_1',
				properties: {},
			},
		]
		socketModule.server.addChats(['2_threads_inactive'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id

			sdk.on('user_data', threadSummary => {
				actual.push(threadSummary)
			})
			sdk.on('thread_summary', threadSummary => {
				actual.push(threadSummary)
			})

			sdk
				.sendEvent(chat, {
					type: 'message',
					text: 'test msg',
				})
				.then(message => {
					actual.push(message)
					// ugly as hell, need to figure out timestamp assertions
					last(expected).timestamp = Math.floor(Date.now.getTime() / 1000) * 1000
					expect(actual).toEqual(expected)
					done()
				})
		})
	})

	test('should send event with customId', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id
			const lastThread = data.chatsSummary[0].lastEvent.thread

			sdk
				.sendEvent(chat, {
					type: 'message',
					text: 'test msg',
					customId: 'test_custom_id',
				})
				.then(message => {
					expect(message).toEqual({
						type: 'message',
						text: 'test msg',
						id: 'sent_event_1',
						author: 'test_customer_id',
						timestamp: Math.floor(Date.now.getTime() / 1000) * 1000,
						thread: lastThread,
						customId: 'test_custom_id',
						properties: {},
					})
					done()
				})
		})
	})

	test('should fail when sending message without text', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id

			sdk.sendEvent(chat, { type: 'message' }).catch(err => {
				expect(err.code).toEqual('REQUEST_FAILED')
				done()
			})
		})
	})

	test('should send unknown event types in passthrough manner', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id
			const lastThread = data.chatsSummary[0].lastEvent.thread

			sdk
				.sendEvent(chat, {
					type: 'unknown_type',
					customId: 'test_custom_id',
					unknown_prop: 1,
					unknown_prop2: 'test',
					unknown_prop3: {
						whatever: true,
					},
				})
				.then(message => {
					expect(message).toEqual({
						type: 'unknown_type',
						id: 'sent_event_1',
						author: 'test_customer_id',
						timestamp: Math.floor(Date.now.getTime() / 1000) * 1000,
						thread: lastThread,
						customId: 'test_custom_id',
						unknown_prop: 1,
						unknown_prop2: 'test',
						unknown_prop3: {
							whatever: true,
						},
						properties: {},
					})
					done()
				})
		})
	})

	test.skip('should send file and receive the event as push', done => {
		done()
	})

	test.skip('should send file with max size', done => {
		done()
	})

	test('should not send too big file', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id
			expect(sdk.sendFile(chat, { file: { size: 10 * MEGABYTE + 1 } }))
				.rejects.toThrowErrorMatchingSnapshot()
				.then(done)
		})
	})

	test.skip('should send file and be notified about the progress', done => {
		done()
	})

	test.skip('should be able to cancel file upload', done => {
		done()
	})
})
