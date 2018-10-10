// @flow

import type { Customer, Properties, ThreadId, UserId } from '.'

export type ServerTimestamp = number

export type ServerEventBase = {|
	id: string,
	author_id: string,
	timestamp: ServerTimestamp,
	order: number,
|}

export type ServerEventOptionalProps = {|
	custom_id?: string,
|}

export type ServerEventCommonProps = {|
	...ServerEventBase,
	...ServerEventOptionalProps,
|}

export type ServerFileEventAny = {|
	...ServerEventCommonProps,
	type: 'file',
	name: string,
	url: string,
	size: number,
	content_type: string,
	width?: void,
	height?: void,
|}

export type ServerFileEventImage = {|
	...ServerFileEventAny,
	content_type: 'image/gif' | 'image/png' | 'image/jpeg' | 'image/bmp' | 'image/webp',
	width: number,
	height: number,
|}

export type ServerFileEvent = ServerFileEventAny | ServerFileEventImage

export type ServerMessage = {|
	...ServerEventCommonProps,
	type: 'message',
	text: string,
|}

export type ServerEvent = ServerFileEvent | ServerMessage /* | */

export type ServerThread = {|
	id: ThreadId,
	active: boolean,
	order: number,
	user_ids: UserId[],
	events: ServerEvent[],
	properties?: Properties,
|}

export type ServerAgent = {|
	type: 'agent',
	id: UserId,
	name: string,
	email: string,
	avatar: string,
	present: boolean,
	last_seen_timestamp: ServerTimestamp,
|}

export type ServerCustomer = {|
	type: 'customer',
	id: UserId,
	name?: string,
	email?: string,
	fields?: $ElementType<Customer, 'fields'>,
	last_seen_timestamp: ServerTimestamp,
|}

export type ServerUser = ServerAgent | ServerCustomer
