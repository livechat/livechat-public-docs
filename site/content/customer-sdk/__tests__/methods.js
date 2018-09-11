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

describe('CustomerSDK - other methods', () => {
	beforeEach(() => {
		socketModule.server.clearHistory()
	})

	// TODO: this test should test if update_customer was sent to server
	// or that it wasnt (when sdk is disconnected)
	test("updateCustomer should set customer's name", done => {
		socketModule.server.addChats(['2_threads_active'])
		const sdk = initSDK()
		sdk.on('connected', () => {
			sdk.updateCustomer({
				name: 'Test name',
			})

			done()
		})
	})
})
