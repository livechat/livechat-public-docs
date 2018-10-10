// @flow
export type ChatId = string
export type EventId = string
export type LicenseId = number
export type UserId = string
export type Timestamp = number
export type ThreadId = string
export type PostbackId = string

export type EventServerBase = {|
	id: EventId,
	author: UserId,
	timestamp: Timestamp,
	thread: ThreadId,
|}

export type EventOptionalProps = {|
	customId?: string,
|}

export type EventCommonProps = {|
	...EventServerBase,
	...EventOptionalProps,
|}

export type FileEventAny = {|
	...EventCommonProps,
	type: 'file',
	name: string,
	url: string,
	size: number,
	contentType: string,
	width?: void,
	height?: void,
|}

export type FileEventImage = {|
	...FileEventAny,
	contentType: 'image/gif' | 'image/png' | 'image/jpeg' | 'image/bmp' | 'image/webp',
	width: number,
	height: number,
|}

export type FileEvent = FileEventAny | FileEventImage

export type Message = {|
	...EventCommonProps,
	type: 'message',
	text: string,
|}

export type Rating = {|
	...EventCommonProps,
	type: 'rating',
	score?: 0 | 1,
	comment?: string,
|}

// TODO: forms are not implemented fully on the server
// implementing them in the client side library should wait server implementation
// export type Field = {||}
// export type FilledForm = {
//  ...EventCommonProps
// 	type: 'filled_form',
// 	fields: Field[],
// }

export type Event = FileEvent | Message /* | Rating | FilledForm  */

export type Agent = {|
	id: UserId,
	type: 'agent',
	name: string,
	avatar: string,
|}

export type Customer = {|
	id?: UserId,
	type: 'customer',
	name?: string,
	email?: string,
	fields: {
		[key: string]: string,
		// what about monitoring?
	},
|}

export type User = Agent | Customer

// something set in stone - like rating could be specified here, along the general map
export type Properties = {
	[namespace: string]: {
		[property: string]: string | number, // no idea what types should be here
	},
}

export type ThreadSummary = {|
	id: ThreadId,
	chat: ChatId,
	order: number,
	totalEvents: number,
	active: boolean,
|}

export type Thread = {|
	id: ThreadId,
	chat: ChatId,
	active: boolean,
	order: number,
	users: UserId[],
	lastSeenTimestamps: {
		[UserId]: ?Timestamp,
	},
	events: Event[],
	// TODO: should be hidden from the user for now?
	properties: Properties,
|}

export type ChatSummary = {|
	id: ChatId,
	active: boolean,
	properties: Properties,
	users: UserId[],
	lastEventsPerType?: {
		// TODO: could we narrow it down with a generic mapping?
		[type: string]: Event,
	},
	lastEvent?: Event,
	lastThread: ThreadId,
	order: Timestamp,
	lastSeenTimestamps: {
		[UserId]: ?Timestamp,
	},
|}

export type Chat = {|
	id: ChatId,
	users: UserId[],
	threads: ThreadId[],
	// TODO: should be hidden from the user for now?
	properties: Properties,
|}

export type LicenseScope = { +type: 'license' }
export type TeamScope = { +type: 'team', +id: number }
export type RoutingScope = LicenseScope | TeamScope

export type TypingIndicator = {| chat: ChatId, user: UserId |}
export type Postback = {|
	id: PostbackId,
	toggled: boolean,
|}
