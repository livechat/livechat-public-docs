// @flow
import { createStore, applyMiddleware } from 'redux'
import sideEffectsMiddleware from '@livechat/side-effects-middleware'
import reducer, { createInitialState } from './reducer'
import sideEffects from './sideEffects'
import { identity } from '@livechat/data-utils'

import type { Store } from 'redux'
import type { Action, CustomerPage, Env, LicenseId, SDKEvents, Socket } from './types'

export default function finalCreateStore(
	initialStateData: {
		license: LicenseId,
		group?: number,
		env: Env,
		page?: CustomerPage,
		referrer?: string,
		uniqueGroups?: boolean,
	},
	emitter,
	socket: Socket,
	auth,
): Store<*, Action> {
	const compose =
		process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: '@livechat/customer-sdk' })
			: identity

	return createStore(
		reducer,
		createInitialState(initialStateData),
		compose(applyMiddleware(sideEffectsMiddleware(sideEffects(emitter, socket, auth)))),
	)
}
