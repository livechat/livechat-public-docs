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

describe('CustomerSDK - init', () => {
	beforeEach(() => {
		socketModule.server.clearHistory()
	})

	test('should throw on invalid config', () => {
		expect(() => CustomerSDK.init()).toThrow()
		expect(() => CustomerSDK.init({ license: 123 })).toThrow()
		expect(() => CustomerSDK.init({ clientId: 'test_client_id' })).toThrow()
		expect(() => CustomerSDK.init({ license: '123', clientId: 'test_client_id' })).toThrow()
		expect(() => CustomerSDK.init({ license: '123', clientId: 423424 })).toThrow()
	})

	test('should connect right away', done => {
		const sdk = initSDK()
		sdk.on('connected', () => {
			done()
		})
	})

	test('customer_id should be the first event', done => {
		const sdk = initSDK()
		sdk.once('*', (eventName, eventData) => {
			expect([eventName, eventData]).toEqual(['customer_id', 'test_customer_id'])
			done()
		})
	})
})
