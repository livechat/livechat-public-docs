// @flow
import { generateUniqueId } from '@livechat/data-utils'
import deferred from '@livechat/deferred'

import type { Store } from './types'

export default (store: Store, action) => {
	action.payload.id = generateUniqueId(store.getState().requests)

	const { resolve, reject, promise } = deferred()
	action.payload.promise = promise
	action.payload.resolve = resolve
	action.payload.reject = reject

	store.dispatch(action)
	return promise
}
