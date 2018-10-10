// @flow
import type {
	Chat,
	ChatId,
	Customer,
	Pagination,
	Properties,
	ServerCustomer,
	ServerEvent,
	ServerThread,
	ServerTimestamp,
	ServerUser,
	Thread,
	ThreadId,
	UserId,
} from '.'

type CustomerUpdateData = {| name?: string, email?: string, fields?: $ElementType<Customer, 'fields'> |}

export type RequestId = string

type RequestCommonProps = {|
	id: RequestId,
|}

export type Request =
	| $ReadOnly<{| ...RequestCommonProps, action: 'close_thread', payload: {| chat_id: ChatId |} |}>
	| $ReadOnly<{| ...RequestCommonProps, action: 'get_chats_summary', payload: $Shape<Pagination> |}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'get_chat_threads',
			payload: {| chat_id: ChatId, thread_ids: ThreadId[] |},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'get_chat_threads_summary',
			payload: {| chat_id: ChatId, ...$Shape<Pagination> |},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'login',
			payload: {|
				token: string,
				customer?: CustomerUpdateData,
			|},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'start_chat',
			payload: {|
				chat: {|
					// not yet implemented
					// scopes?: Scopes,
					properties?: Properties,
					thread?: {|
						events?: ServerEvent[],
						properties?: Properties,
					|},
				|},
			|},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'send_event',
			payload: {
				chat_id: ChatId,
				event: ServerEvent,
			},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'send_sneak_peek',
			payload: {| chat_id: ChatId, sneak_peek_text: string |},
		|}>
	| $ReadOnly<{| ...RequestCommonProps, action: 'update_customer', payload: {| customer: CustomerUpdateData |} |}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'update_chat_properties',
			payload: {| chat_id: ChatId, properties: Properties |},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'update_chat_thread_properties',
			payload: {| chat_id: ChatId, thread_id: ThreadId, properties: Properties |},
		|}>
	| $ReadOnly<{|
			...RequestCommonProps,
			action: 'update_last_seen_timestamp',
			payload: {| timestamp?: ServerTimestamp |},
		|}>

type PushCommonProps = {| type: 'push', request_id?: void |}

export type Push =
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'chat_properties_updated',
			payload: {|
				chat_id: ChatId,
				properties: $ElementType<Chat, 'properties'>,
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'chat_thread_properties_updated',
			payload: {|
				chat_id: ChatId,
				thread_id: ThreadId,
				properties: $ElementType<Thread, 'properties'>,
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'chat_users_updated',
			payload: {|
				chat_id: ChatId,
				updated_users: {|
					added: ServerUser[],
					removed_ids: UserId[],
				|},
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'customer_disconnected',
			payload: {|
				reason: 'customer_banned' | 'too_many_connections' | 'license_not_found' | 'internal_error',
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'incoming_chat_thread',
			payload: {|
				chat: {|
					id: ChatId,
					users: ServerUser[],
					properties: $ElementType<Chat, 'properties'>,
					// scopes, not yet implemented in the SDK
					thread: ServerThread,
				|},
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'incoming_event',
			payload: {|
				chat_id: ChatId,
				thread_id: ThreadId,
				event: ServerEvent,
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'incoming_typing_indicator',
			payload: {|
				chat_id: ChatId,
				typing_indicator: {|
					author_id: UserId,
					timestamp: ServerTimestamp,
					is_typing: boolean,
				|},
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'last_seen_timestamp_updated',
			payload: {|
				user_id: UserId,
				chat_id: ChatId,
				timestamp: ServerTimestamp,
			|},
		|}>
	| $ReadOnly<{|
			...PushCommonProps,
			action: 'thread_closed',
			payload: {|
				chat_id: ChatId,
				thread_id: ThreadId,
				user_id: UserId,
			|},
		|}>

type CloseThreadResponse = {||}

type StartChatResponse = {|
	chat: {|
		id: ChatId,
		users: ServerUser[],
		// not yet implemented
		// scopes?: Scopes,
		properties?: Properties,
		thread: ServerThread,
	|},
|}

type SendEventResponse = {|
	chat_id: ChatId,
	event: ServerEvent,
|}

type UpdateCustomerResponse = {| customer: ServerCustomer |}

type UpdateLastSeenTimestampResponse = {| timestamp: ServerTimestamp |}

type ResponseCommonProps = {|
	type: 'response',
	request_id: RequestId,
	success: true,
|}

export type Response =
	| $ReadOnly<{| ...ResponseCommonProps, action: 'close_thread', payload: CloseThreadResponse |}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'get_chats_summary',
			payload: {|
				// should get narrowed down
				chats_summary: any[],
				total_chats: number,
			|},
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'get_chat_threads',
			payload: {| chat: {| id: ChatId, users: ServerUser[], properties: Properties, threads: ServerThread[] |} |},
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'get_chat_threads_summary',
			payload: {|
				// should get narrowed down
				threads_summary: any,
				total_threads: number,
			|},
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'login',
			payload: {|
				customer_id: UserId,
				static_config_path: string,
			|},
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'start_chat',
			payload: StartChatResponse,
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'send_event',
			payload: SendEventResponse,
		|}>
	| $ReadOnly<{| ...ResponseCommonProps, action: 'send_sneak_peek', payload: {||} |}>
	| $ReadOnly<{| ...ResponseCommonProps, action: 'update_customer', payload: UpdateCustomerResponse |}>
	| $ReadOnly<{| ...ResponseCommonProps, action: 'update_chat_properties', payload: {||} |}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'update_chat_thread_properties',
			payload: {||},
		|}>
	| $ReadOnly<{|
			...ResponseCommonProps,
			action: 'update_last_seen_timestamp',
			payload: UpdateLastSeenTimestampResponse,
		|}>

type ResponseErrorCommonProps = {|
	type: 'response',
	request_id: RequestId,
	success: false,
|}

export type ServerResponseError = $ReadOnly<{|
	type: | 'authentication'
		| 'authorization'
		| 'customer_banned'
		| 'internal'
		| 'license_expired'
		| 'request_timeout'
		| 'validation',
	message: 'string',
	data?: Object,
|}>

export type ResponseError = $ReadOnly<{|
	...ResponseErrorCommonProps,
	payload: {|
		error: ServerResponseError,
	|},
|}>

type PushResponseCommonProps = {| type: 'push', request_id: RequestId |}

export type PushResponse =
	| $ReadOnly<{|
			...PushResponseCommonProps,
			action: 'customer_updated',
			payload: {| ...UpdateCustomerResponse, chat_id: ChatId |},
		|}>
	| $ReadOnly<{| ...PushResponseCommonProps, action: 'incoming_chat_thread', payload: StartChatResponse |}>
	| $ReadOnly<{|
			...PushResponseCommonProps,
			action: 'incoming_event',
			payload: {| ...SendEventResponse, chat_id: ChatId |},
		|}>
	| $ReadOnly<{|
			...PushResponseCommonProps,
			action: 'last_seen_timestamp_updated',
			payload: UpdateLastSeenTimestampResponse,
		|}>
	| $ReadOnly<{|
			...PushResponseCommonProps,
			action: 'thread_closed',
			payload: {| ...CloseThreadResponse, chat_id: ChatId, thread_id: ThreadId, user_id: UserId |},
		|}>

export type SocketMessage = Push | Response | ResponseError | PushResponse

import type { ExtractReturn } from '.'
import socket from '../socket'
export type Socket = ExtractReturn<$ElementType<typeof socket, 'create'>>
