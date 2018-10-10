// @flow
import SockJS from 'sockjs-client'
import mitt from '@livechat/mitt'
import Backo from 'backo2'
import { buildQueryString } from '@livechat/url-utils'
import { debounce, generateRandomId } from '@livechat/data-utils'

import type { LicenseId, Request, SocketMessage } from './types'

type SocketEventCallback<Incoming> = {
	('connect', () => void): void,
	('message', (Incoming) => void): void,
	('disconnect', () => void): void,
}

type Socket<Outgoing, Incoming> = $ReadOnly<{|
	connect: () => void,
	disconnect: () => void,
	reconnect: () => void,
	emit: Outgoing => void,
	on: SocketEventCallback<Incoming>,
	off: SocketEventCallback<Incoming>,
|}>

export default {
	create(url: string, license: LicenseId): Socket<Request, SocketMessage> {
		const socketUrl = `${ url }?${ buildQueryString({
			license_id: license,
			bh: generateRandomId(),
		}) }`

		const emitter = mitt()
		const backoff = new Backo({
			min: 1000,
			max: 5000,
			jitter: 0.5,
		})

		let opened = false
		let connected = false
		let reconnectTimer = null
		let socket = null

		const ping = () => {
			// $FlowFixMe we know that that socket is defined when this gets called
			socket.send('{"action": "ping"}')
		}

		const schedulePing = debounce(30 * 1000, () => {
			if (!opened) {
				return
			}

			if (connected) {
				ping()
			}

			schedulePing()
		})

		const openHandler = () => {
			connected = true
			backoff.reset()
			emitter.emit('connect')
			schedulePing()
		}

		const closeHandler = () => {
			connected = false
			socket = null

			emitter.emit('disconnect')
			// eslint-disable-next-line no-use-before-define
			reconnect()
		}

		const messageHandler = ({ data }) => {
			const message = JSON.parse(data)

			if (message.action === 'ping') {
				return
			}

			emitter.emit('message', message)
		}

		const heartbeatListener = () => {
			ping()
			schedulePing()
		}

		const addEventListeners = instance => {
			instance.addEventListener('open', openHandler)
			instance.addEventListener('close', closeHandler)
			instance.addEventListener('message', messageHandler)
			instance.addEventListener('heartbeat', heartbeatListener)
		}

		const removeEventListeners = instance => {
			// $FlowFixMe
			instance.removeEventListener('open', openHandler)
			// $FlowFixMe
			instance.removeEventListener('close', closeHandler)
			// $FlowFixMe
			instance.removeEventListener('message', messageHandler)
			// $FlowFixMe
			instance.removeEventListener('heartbeat', heartbeatListener)
		}

		const close = () => {
			// $FlowFixMe we know that socket is defined at this point
			removeEventListeners(socket)
			connected = false
			// $FlowFixMe we know that socket is defined at this point
			socket.close()
			socket = null
		}

		const connect = () => {
			opened = true
			socket = new SockJS(socketUrl, undefined, { transports: ['websocket', 'xhr-polling'] })

			if (process.env.NODE_ENV !== 'production') {
				window.sockJS = socket
			}
			addEventListeners(socket)
		}

		const reconnect = (delay = backoff.duration()) => {
			clearTimeout(reconnectTimer)
			reconnectTimer = setTimeout(connect, delay)
		}

		return {
			connect: () => {
				if (opened) {
					throw new Error('Socket is already connected or opening.')
				}
				connect()
			},
			disconnect() {
				opened = false
				clearTimeout(reconnectTimer)

				if (socket === null) {
					return
				}

				close()
			},
			reconnect: delay => {
				if (!opened) {
					throw new Error('Socket is not opened.')
				}

				if (socket !== null) {
					close()
				}

				reconnect(delay)
			},
			emit: frame => {
				if (!connected) {
					throw new Error('Socket is not connected.')
				}

				// $FlowFixMe connected state means there is a defined socket
				socket.send(JSON.stringify(frame))
				schedulePing()
			},
			on: emitter.on,
			off: emitter.off,
		}
	},
}
