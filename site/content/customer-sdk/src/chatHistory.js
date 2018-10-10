// @flow
import * as serverDataParser from './serverDataParser'
import { flatMap, splitRightWhenAccum } from '@livechat/data-utils'
import type { ChatId, CustomerSDK, Store, ThreadId, ThreadSummary } from './types'

type QueuedTask = {|
	resolve: any => void,
	reject: any => void,
|}

type HistoryState = {|
	done: boolean,
	idle: boolean,
	leftToFetch: number,
	queuedTasks: QueuedTask[],
	totalThreads: number,
	threadsSummary: ?(ThreadSummary[]),
	threadsToFetch: ThreadId[],
|}

const HISTORY_EVENT_COUNT_TARGET = 50

const splitSummary = threadsSummary => {
	const [leftover, targeted] = splitRightWhenAccum(
		({ totalEvents }, acc) => {
			const sum = acc + totalEvents
			return [sum >= HISTORY_EVENT_COUNT_TARGET, sum]
		},
		0,
		threadsSummary,
	)

	return [leftover, targeted.map(threadSummary => threadSummary.id)]
}

const distributeSummary = (state, threadsSummary) => {
	const result = splitSummary(threadsSummary)
	state.threadsSummary = result[0]
	state.threadsToFetch = result[1]
}

const createState = (): HistoryState => ({
	done: false,
	idle: true,
	leftToFetch: Infinity,
	queuedTasks: [],
	totalThreads: Infinity,
	threadsSummary: null,
	threadsToFetch: [],
})

const loadThreads = (api, chat, threadsToFetch) => {
	return api.getChatThreads(chat, threadsToFetch)
}

const loadLatest = (api, chat) =>
	api.getChatThreadsSummary(chat, { offset: 0 }).then(({ threadsSummary, totalThreads }) => {
		const [threadsSummaryLeftover, threadsToFetch] = splitSummary(threadsSummary)

		return Promise.all([
			{ threadsSummary: threadsSummaryLeftover, totalThreads },
			loadThreads(api, chat, threadsToFetch),
		])
	})

const loadNextSummaryBatch = (api, chat, state) =>
	api.getChatThreadsSummary(chat, { offset: 0 }).then(({ totalThreads }) => {
		const offset = totalThreads - state.leftToFetch
		return api.getChatThreadsSummary(chat, { offset })
	})

const onLoadedThreads = (store, state, threads) => {
	state.idle = true
	state.threadsToFetch = []
	state.leftToFetch -= threads.length

	const events = flatMap(thread => thread.events, threads)

	store.dispatch({
		type: 'emit_events',
		payload: threads.map(thread => ['thread_summary', serverDataParser.parseThreadSummary(thread)]),
	})

	if (state.leftToFetch === 0) {
		state.done = true
		return { value: events, done: true }
	}

	return { value: events, done: false }
}

const onFailedLoad = (state, err) => {
	state.idle = true
	state.queuedTasks.forEach(({ reject }) => reject(err))
	return err
}

export default (store: Store, api: CustomerSDK, chat: ChatId) => {
	const historyState = createState()

	const next = (resolve, reject) => {
		if (historyState.done) {
			resolve({ done: true })
			return
		}
		if (!historyState.idle) {
			historyState.queuedTasks.push({ resolve, reject })
			return
		}

		let task
		historyState.idle = false

		if (!historyState.threadsSummary) {
			task = loadLatest(api, chat).then(([{ threadsSummary, totalThreads }, threads]) => {
				historyState.threadsSummary = threadsSummary
				historyState.totalThreads = historyState.leftToFetch = totalThreads
				return threads
			})
		} else if (historyState.threadsToFetch.length > 0) {
			task = loadThreads(api, chat, historyState.threadsToFetch)
		} else if (historyState.threadsSummary.length > 0) {
			distributeSummary(historyState, historyState.threadsSummary)
			task = loadThreads(api, chat, historyState.threadsToFetch)
		} else {
			task = loadNextSummaryBatch(api, chat, historyState).then(({ threadsSummary }) => {
				distributeSummary(historyState, threadsSummary)
				return loadThreads(api, chat, historyState.threadsToFetch)
			})
		}

		task
			.then(threads => {
				resolve(onLoadedThreads(store, historyState, threads))

				const queuedTask = historyState.queuedTasks.shift()

				if (!queuedTask) {
					return
				}

				next(queuedTask.resolve, queuedTask.reject)
			})
			.catch(err => reject(onFailedLoad(historyState, err)))
	}

	return {
		next() {
			return new Promise(next)
		},
	}
}
