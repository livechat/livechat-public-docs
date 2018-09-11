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

import * as CustomerSDK from '../src'
import * as socketModule from '../src/socket'

const initSDK = () => CustomerSDK.init({ license: 123, clientId: 'test_client_id' })

describe('CustomerSDK - connection handling', () => {
	beforeEach(() => {
		socketModule.server.clearHistory()
	})

	test('should receive empty chatsSummary for new customer', done => {
		const sdk = initSDK()
		sdk.on('connected', data => {
			expect(data).toEqual({
				chatsSummary: [],
				totalChats: 0,
			})
			done()
		})
	})

	test('should receive chatsSummary data for returning customer', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const lastEvent = {
				id: 'chat1_thread2_event3',
				author: 'fixture_customer1',
				timestamp: 1511455691000,
				thread: 'chat1_thread2',
				type: 'file',
				url: 'https://cdnx.livechatinc.com/website/media/img/logo_small@2x.png?v=3',
				width: 192,
				height: 106,
				properties: {},
			}

			expect(data).toEqual({
				chatsSummary: [
					{
						id: 'fixture_chat_1',
						order: 1000,
						users: ['test_customer_id', 'fixture_agent_1'],
						lastSeenTimestamps: {
							test_customer_id: null,
							fixture_agent_1: null,
						},
						lastEvent,
						lastEventsPerType: {
							message: {
								id: 'chat1_thread2_event2',
								author: 'fixture_customer1',
								timestamp: 1511455587000,
								thread: 'chat1_thread2',
								type: 'message',
								text: 'is it livechat? livechat support?',
								properties: {},
							},
							file: lastEvent,
						},
						properties: {},
					},
				],
				totalChats: 1,
			})
			done()
		})
	})

	test.skip("doesn't throw if connection is lost during login", done => {
		// process.on('unhandledRejection', (reason, p) => {})
		done()
	})

	test.skip('tries to reconnect until it succeeds', done => {
		done()
	})

	test.skip('emit connection_restored on subsequent connections', done => {
		done()
	})

	test.skip('connection handlers are given same data', done => {
		done()
		// api.on('connected' | 'connection_restored', payload => {
		//     const {  } = payload
		//     done()
		// })
	})
})
