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

describe('CustomerSDK - using history', () => {
	beforeEach(() => {
		socketModule.server.clearHistory()
	})

	test('history object should have only a next method', done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', data => {
			const chat = data.chatsSummary[0].id
			const history = sdk.getChatHistory(chat)
			expect(Object.keys(history).length).toBe(1)
			expect(typeof history.next === 'function').toBe(true)
			done()
		})
	})
})
