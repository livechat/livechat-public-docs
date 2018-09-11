// @flow

export * from './entities'
import type {
	ChatId,
	ChatSummary,
	Event,
	Properties,
	Thread,
	ThreadSummary,
	Timestamp,
	TypingIndicator,
	User,
	UserId,
} from './entities'
export * from './serverEntities'
export * from './socket'
export * from './store'

export type Action = { type: string, payload: any, meta?: any }

export type Env = 'production' | 'staging' | 'labs'

export type Pagination = { offset?: number, limit?: number }

export type Success = {| +success: true |}

export type CustomerPage = {| url: string, title: string |}

export type RNFile = { uri: string, type?: string, name?: string }

export type ServerPushAction =
	| 'chat_properties_updated'
	| 'chat_thread_properties_updated'
	| 'chat_users_updated'
	| 'incoming_chat_thread'
	| 'incoming_event'
	| 'incoming_typing_indicator'
	| 'last_seen_timestamp_updated'
	| 'thread_closed'

export type ServerResponseAction =
	| 'close_thread'
	| 'get_chat_threads'
	| 'get_chat_threads_summary'
	| 'get_chats_summary'
	| 'login'
	| 'send_event'
	| 'send_sneak_peek'
	| 'start_chat'
	| 'update_chat_properties'
	| 'update_chat_thread_properties'
	| 'update_customer'
	| 'update_last_seen_timestamp'

export type ServerAction = ServerPushAction | ServerResponseAction

export type SDKEvents = {
	('connected', ({| chatsSummary: ChatSummary[], totalChats: number |}) => void): mixed,
	('connection_lost', (void) => void): mixed,
	('connection_restored', ({| chatsSummary: ChatSummary[], totalChats: number |}) => void): mixed,
	('customer_id', (UserId) => void): mixed,
	('disconnected', (reason?: string) => void): mixed,
	('chat_properties_updated', ({ chat: ChatId, properties: Properties }) => void): mixed,
	('chat_thread_properties_updated', ({ chat: ChatId, thread: Thread, properties: Properties }) => void): mixed,
	('last_seen_timestamp_updated', ({ chat: ChatId, user: UserId, timestamp: Timestamp }) => void): mixed,
	('new_event', ({ chat: ChatId, event: Event }) => void): mixed,
	// TODO: we do not handle customer_updated, i guess it need to be served through user_data? 😱
	('user_data', (User) => void): mixed,
	('user_is_typing', (TypingIndicator) => void): mixed,
	('user_joined_chat', ({ chat: ChatId, user: UserId }) => void): mixed,
	('user_left_chat', ({ chat: ChatId, user: UserId }) => void): mixed,
	('user_stopped_typing', (TypingIndicator) => void): mixed,
	('thread_closed', ({ chat: ChatId }) => void): mixed,
	('thread_summary', (ThreadSummary) => void): mixed,
}

type ExtractReturnType = <R>((...Iterable<*>) => R) => R
export type ExtractReturn<F> = $Call<ExtractReturnType, F>

import { init } from '..'
export type CustomerSDK = ExtractReturn<typeof init>
