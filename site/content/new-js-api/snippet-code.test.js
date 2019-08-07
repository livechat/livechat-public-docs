const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const snippetCode = fs
	.readFileSync(path.resolve(__dirname, 'snippet-code.html'), 'utf8')
	.replace("'https://cdn.livechatinc.com/tracking.js'", "''")

let LiveChatWidget = null
const setup = () => {
	const { window } = new JSDOM(snippetCode, { runScripts: 'dangerously' })
	LiveChatWidget = window.LiveChatWidget
}

describe('JS API Snippet code', () => {
	beforeEach(setup)

	const handlerMock = jest.fn()
	const callbackMock = jest.fn()

	it('should register events', () => {
		LiveChatWidget.on('availability_changed', callbackMock)

		const [[type, [event, callback]]] = LiveChatWidget._q

		expect(type).toBe('on')
		expect(event).toBe('availability_changed')
		expect(callback).toBe(callbackMock)
	})

	it('should unregister events', () => {
		LiveChatWidget.off('availability_changed', callbackMock)

		const [[type, [event, callback]]] = LiveChatWidget._q

		expect(type).toBe('off')
		expect(event).toBe('availability_changed')
		expect(callback).toBe(callbackMock)
	})

	it('should call methods', () => {
		LiveChatWidget.call('maximize')

		const [[type, [method]]] = LiveChatWidget._q

		expect(type).toBe('call')
		expect(method).toBe('maximize')
	})

	it('should handle method args', () => {
		const payload = { cart_value: '450' }

		LiveChatWidget.call('set_session_variables', payload)

		const [[type, [method, args]]] = LiveChatWidget._q

		expect(type).toBe('call')
		expect(method).toBe('set_session_variables')
		expect(args).toBe(payload)
	})

	it('should throw when getter is used', () => {
		expect(() => LiveChatWidget.get('state')).toThrow()
	})

	it('should call assigned handler', () => {
		LiveChatWidget._h = handlerMock

		LiveChatWidget.on('availability_changed', callbackMock)
		expect(handlerMock).toHaveBeenCalledWith('on', ['availability_changed', callbackMock])

		LiveChatWidget.off('availability_changed', callbackMock)
		expect(handlerMock).toHaveBeenCalledWith('off', ['availability_changed', callbackMock])

		handlerMock.mockReturnValue('online')
		const state = LiveChatWidget.get('state')
		expect(state).toBe('online')
		expect(handlerMock).toHaveBeenCalledWith('get', ['state'])

		LiveChatWidget.call('hide')
		expect(handlerMock).toHaveBeenCalledWith('call', ['hide'])
	})
})
