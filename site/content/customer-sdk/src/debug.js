/* eslint-disable no-console */
import { generateUniqueId } from '@livechat/data-utils'

const LISTENER_IDENTITY = 'LISTENER_IDENTITY'
const listenersMap = {}

const createDebuggedMethods = (methods, prefix = '') => {
	const methodNames = Object.keys(methods)
	return methodNames
		.map(methodName => {
			const method = methods[methodName]
			return (...args) => {
				console.info(`${ prefix }.${ methodName }() ===>`, ...args)
				const result = method(...args)
				if (result && typeof result.then === 'function') {
					result
						.then(data => {
							console.info(`${ prefix }.${ methodName }() <===`, data)
						})
						.catch(err => {
							console.error(`${ prefix }.${ methodName }() <===`, err)
						})
				}
				return result
			}
		})
		.reduce((acc, method, index) => {
			acc[methodNames[index]] = method
			return acc
		}, {})
}

const createEnhancedListener = (label, event, listener) => {
	if (listener[LISTENER_IDENTITY] === undefined) {
		Object.defineProperty(listener, LISTENER_IDENTITY, { value: {} })
	}

	if (listener[LISTENER_IDENTITY][event]) {
		const enhancedListenerId = listener[LISTENER_IDENTITY][event]
		return listenersMap[enhancedListenerId]
	}

	const enhancedListener = data => {
		console.info(`.${ label }("${ event }") <===`, data)
		listener(data)
	}
	const uniqueId = generateUniqueId(listenersMap)
	listener[LISTENER_IDENTITY][event] = uniqueId
	listenersMap[uniqueId] = enhancedListener

	return enhancedListener
}

export default sdk => {
	if (process.env.NODE_ENV === 'production') {
		console.warn('You probably do not want to use debug(customerSDK) in your production environment.')
	}
	const { on, once, off, getChatHistory, auth, ...rest } = sdk
	const methods = createDebuggedMethods(rest)

	return Object.freeze({
		auth: Object.freeze(createDebuggedMethods(auth, '.auth')),
		...methods,
		getChatHistory(...args) {
			console.info(`.getChatHistory(${ String(args) })`)
			const history = getChatHistory(...args)
			const logLabel = 'history.next()'
			return {
				next() {
					console.info(`${ logLabel } ===>`, ...args)
					const result = history.next()
					result
						.then(data => {
							console.info(`${ logLabel } <===`, ...args, data)
						})
						.catch(err => {
							console.error(`${ logLabel } <===`, ...args, err)
						})
					return result
				},
			}
		},
		off(event, listener) {
			console.info(`.off("${ event }", ${ listener.name || 'anonymous' })`)
			let enhancedListener = listener

			if (listener[LISTENER_IDENTITY] !== undefined) {
				const enhancedListenerId = listener[LISTENER_IDENTITY][event]
				enhancedListener = listenersMap[enhancedListenerId]
			}

			off(event, enhancedListener)
		},
		on(event, listener) {
			on(event, createEnhancedListener('on', event, listener))
		},
		once(event, listener) {
			once(event, createEnhancedListener('once', event, listener))
		},
	})
}
