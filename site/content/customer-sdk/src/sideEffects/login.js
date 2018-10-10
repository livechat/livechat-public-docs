import storage from '@livechat/isomorphic-storage'
import { generateRandomId, noop } from '@livechat/data-utils'
import Backo from 'backo2'
import { getConnectionStatus, getSelfData, getSelfId } from '../reducer'
import createError from '../createError'
import * as actions from '../actions'
import sendRequestAction from '../sendRequestAction'
import { getSideStorageKey } from './utils'

const delay = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms)
	})

export default function createLoginTask(socket, auth) {
	let store
	let currentTaskId

	const backoff = new Backo({
		min: 300,
		max: 60000,
		jitter: 0.3,
	})

	const dispatchLoginAttempt = () => {
		store.dispatch({ type: 'login_attempt' })
	}

	const getTokenAndSideStorage = () =>
		Promise.all([auth.getToken(), storage.getItem(getSideStorageKey(store)).catch(noop)])

	const dispatchSelfId = ([token, sideStorage]) => {
		if (getSelfId(store.getState()) === null) {
			const { entityId } = token
			store.dispatch({
				type: 'set_self_id',
				payload: entityId,
			})
		}
		return [token, sideStorage]
	}

	const sendLogin = ([token, sideStorage]) => {
		const state = store.getState()
		const customer = getSelfData(state)
		const { group, page, referrer } = state
		const payload = {
			token: `${ token.tokenType } ${ token.accessToken }`,
			customer,
			customer_side_storage: JSON.parse(sideStorage || '{}'),
		}
		if (typeof group === 'number') {
			payload.group_id = group
		}
		if (page !== null) {
			payload.customer_page = page
		}
		if (referrer !== null) {
			payload.referrer = referrer
		}

		return Promise.race([
			sendRequestAction(store, actions.sendRequest('login', payload, { source: 'login' })),
			delay(15 * 1000).then(() =>
				Promise.reject(createError({ message: 'Request timed out.', code: 'REQUEST_TIMEOUT' })),
			),
		])
	}
	const getChatsSummary = loginResponse => {
		return Promise.all([
			loginResponse,
			sendRequestAction(store, actions.sendRequest('get_chats_summary', null, { source: 'login' })),
		])
	}
	const dispatchLoginSuccess = ([loginResponse, { chatsSummary, totalChats }]) => {
		store.dispatch({
			type: 'login_success',
			payload: {
				previousStatus: getConnectionStatus(store.getState()),
				chatsSummary,
				totalChats,
				dynamicConfig: loginResponse.__priv_dynamic_config,
			},
		})
		backoff.reset()
	}

	const reconnect = () => {
		store.dispatch({ type: 'reconnect', payload: { delay: backoff.duration() } })
	}

	const startNewTask = () => {
		const id = generateRandomId()
		currentTaskId = id
		;[dispatchLoginAttempt, getTokenAndSideStorage, dispatchSelfId, sendLogin, getChatsSummary]
			.reduce(
				(prevStep, nextStep) =>
					prevStep.then(result => {
						if (id !== currentTaskId) {
							throw new Error('Cancelled.')
						}
						return nextStep(result)
					}),
				Promise.resolve(),
			)
			.then(dispatchLoginSuccess, error => {
				// errors (i.e. request ones) thrown by steps from previous tasks goes into this branch
				// CANCELLED errors will go into this branch automatically too
				if (id !== currentTaskId) {
					return
				}
				switch (error.code) {
				case 'AUTHENTICATION':
					auth.getFreshToken()
					reconnect()
					return
				case 'CONNECTION_LOST':
					// this is connectivity problem, not a server error
					// and is taken care of in socket module
					// as it has its own backoff implementation
					return
				case 'SSO_IDENTITY_EXCEPTION':
				case 'SSO_OAUTH_EXCEPTION':
					if (error.message === 'server_error' || error.message === 'temporarily_unavailable') {
						reconnect()
						return
					}
					store.dispatch({ type: 'destroy' })
					return
				default:
					reconnect()
					return
				}
			})
	}

	return _store => {
		// after switching to callbags, we should be able to use smth similar to redux-observable
		// and thus just use store given to epic
		store = _store
		startNewTask()
	}
}
