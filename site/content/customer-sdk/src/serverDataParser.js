// @flow
import { SUCCESS } from './completionValues'
import type {
	Agent,
	ChatId,
	Customer,
	Event,
	EventCommonProps,
	FileEvent,
	FileEventImage,
	Message,
	Push,
	ServerEvent,
	ServerFileEvent,
	ServerFileEventImage,
	ServerMessage,
	ServerResponseAction,
	ServerResponseError,
	ServerThread,
	ServerTimestamp,
	ServerUser,
	Thread,
	ThreadId,
	ThreadSummary,
	User,
} from './types'

import {
	cloneDeep,
	compose,
	flatMap,
	keyBy,
	last,
	mapValues,
	numericSortBy,
	omit,
	pickOwn,
	uniqBy,
} from '@livechat/data-utils'

const parseServerTimestamp = (timestamp?: ServerTimestamp): ?number =>
	typeof timestamp === 'number' ? timestamp * 1000 : null

const parseUsersLastSeenTimestamps = users =>
	mapValues(user => parseServerTimestamp(user.last_seen_timestamp), keyBy('id', users))

const parseProperties = properties =>
	mapValues(propNamespace => mapValues(({ value }) => value, propNamespace), properties)

const parseCommonEventProps = (thread, event) => {
	const parsed: EventCommonProps = {
		id: event.id,
		author: event.author_id,
		// $FlowFixMe flow doesnt understand refinements other than inline
		timestamp: parseServerTimestamp(event.timestamp),
		thread: thread,
		properties: event.properties !== undefined ? parseProperties(event.properties) : {},
	}

	if (event.custom_id !== undefined) {
		parsed.customId = event.custom_id
	}

	return parsed
}

const downsizeWithRatio = (max, dimensions) => {
	const [biggerProp, smallerProp] = dimensions.height > dimensions.width ? ['height', 'width'] : ['width', 'height']

	const { [biggerProp]: bigger, [smallerProp]: smaller } = dimensions

	const ratio = max / bigger

	return {
		[biggerProp]: Math.min(bigger, max),
		[smallerProp]: Math.min(ratio * smaller, smaller),
	}
}

const parseImage = (thread: ThreadId, image: ServerFileEventImage): FileEventImage => {
	// $FlowFixMe - spread is making the type to lose exactness - facebook/flow#2405
	const parsed = {
		...parseCommonEventProps(thread, image),
		type: 'file',
		contentType: image.content_type,
		url: image.url,
		width: image.width,
		height: image.height,
	}
	if (image.thumbnail_url) {
		parsed.thumbnails = {
			default: {
				url: image.thumbnail_url,
				...mapValues(Math.ceil, downsizeWithRatio(300, image)),
			},
			high: {
				url: image.thumbnail2x_url,
				...mapValues(Math.ceil, downsizeWithRatio(600, image)),
			},
		}
	}
	// $FlowFixMe
	return parsed
}

const parseFile = (thread: ThreadId, file: ServerFileEvent): FileEvent => {
	if (file.width !== undefined && file.height !== undefined) {
		return parseImage(thread, file)
	}

	// $FlowFixMe - spread is making the type to lose exactness - facebook/flow#2405
	return {
		...parseCommonEventProps(thread, file),
		type: 'file',
		contentType: file.content_type,
		url: file.url,
	}
}

const parseMessage = (thread: ThreadId, message: ServerMessage): Message => {
	// $FlowFixMe - spread is making the type to lose exactness - facebook/flow#2405
	return {
		...parseCommonEventProps(thread, message),
		type: 'message',
		text: message.text,
	}
}

const parseRichMessageElement = element => {
	const parsed = pickOwn(['title', 'subtitle'], element)

	if (element.image) {
		// TODO: we should reuse parseImage here
		parsed.image = { url: element.image.url }
	}

	if (element.buttons) {
		parsed.buttons = element.buttons.map(({ text, postback_id: postback, user_ids: users, type, value }) => {
			const button = {
				text,
				postback,
				users,
			}

			if (type) {
				// $FlowFixMe
				button.type = type
				// $FlowFixMe
				button.value = value
			}

			return button
		})
	}
	return parsed
}

const parseRichMessage = (thread: ThreadId, richMessage) => {
	// $FlowFixMe - spread is making the type to lose exactness - facebook/flow#2405
	return {
		...parseCommonEventProps(thread, richMessage),
		type: 'rich_message',
		template: richMessage.template_id,
		elements: richMessage.elements.map(parseRichMessageElement),
	}
}

const parseRating = (thread: ThreadId, rating) => {
	return {
		...parseCommonEventProps(thread, rating),
		type: 'rating',
		...mapValues(({ value }) => value, rating.properties.rating),
	}
}

const parseSystemMessage = (thread: ThreadId, systemMessage) => ({
	...parseCommonEventProps(thread, { ...systemMessage, author_id: 'system' }),
	type: 'system_message',
	text: systemMessage.text,
	systemMessageType: systemMessage.system_message_type,
})

const parseUknownEvent = (thread: ThreadId, event: ServerEvent) => ({
	...parseCommonEventProps(thread, event),
	...omit(['id', 'author_id', 'timestamp', 'custom_id', 'order'], event),
})

const parseEvent = (thread: ThreadId, event: ServerEvent): Event => {
	switch (event.type) {
	case 'annotation':
		return event.annotation_type === 'rating' ? parseRating(thread, event) : parseUknownEvent(thread, event)
	case 'file':
		return parseFile(thread, event)
	case 'message':
		return parseMessage(thread, event)
	case 'rich_message':
		return parseRichMessage(thread, event)
	case 'system_message':
		return parseSystemMessage(thread, event)
	default:
		// $FlowFixMe - omit cannot be expressed acurately
		return parseUknownEvent(thread, event)
	}
}

const parseThread = (chat: ChatId, users: ServerUser[], thread: ServerThread): Thread => {
	return {
		id: thread.id,
		chat,
		active: thread.active,
		order: thread.order,
		users: thread.user_ids,
		// TODO: is this relevant for anyone?
		lastSeenTimestamps: parseUsersLastSeenTimestamps(users),
		events: numericSortBy('order', thread.events).map(event => parseEvent(thread.id, event)),
		properties: parseProperties(thread.properties || {}),
	}
}

export const parseThreadSummary = (thread: Thread): ThreadSummary => ({
	...omit(['events', 'users', 'lastSeenTimestamps'], thread),
	totalEvents: thread.events.length,
})

const parseAgent = (agent): Agent => {
	return {
		id: agent.id,
		type: agent.type,
		name: agent.name,
		avatar: agent.avatar,
	}
}

const parseCustomer = (customer): Customer => {
	const parsed: Customer = {
		id: customer.id,
		type: customer.type,
		fields: customer.fields || {},
	}

	if (customer.name) {
		parsed.name = customer.name
	}

	if (customer.email) {
		parsed.email = customer.email
	}

	return parsed
}

const parseUser = (user: ServerUser): User => (user.type === 'agent' ? parseAgent(user) : parseCustomer(user))

const parseNewThreadData = chat => {
	const { id, thread, users } = chat

	return {
		events: thread.events.map(event => parseEvent(thread.id, event)),
		users: users.map(parseUser),
		thread: parseThread(id, users, thread),
	}
}

const parseChatPropertiesUpdatedPush = payload => {
	return {
		chat: payload.chat_id,
		properties: parseProperties(payload.properties),
	}
}

const parseChatThreadPropertiesUpdatedPush = payload => {
	return {
		chat: payload.chat_id,
		thread: payload.thread_id,
		properties: parseProperties(payload.properties),
	}
}

const parseChatUserAddedPush = payload => {
	const { chat_id: chat, user } = payload

	return {
		chat,
		user: parseUser(user),
	}
}

const parseChatUserRemovedPush = payload => {
	const { chat_id: chat, user_id: user } = payload

	return { chat, user }
}

const parseCustomerPageUpdatedPush = payload => ({
	url: payload.url,
	title: payload.title,
	timestamp: parseServerTimestamp(payload.timestamp),
})

const parseCustomerUpdatedPush = payload => parseCustomer(payload.customer)

const parseGetChatThreadsResponse = payload => {
	const { threads, users, id } = payload.chat
	const sortedThreads = numericSortBy('order', threads)

	return {
		threads: sortedThreads.map(thread => parseThread(id, users, thread)),
		users: users.map(parseUser),
	}
}

const parseGetChatThreadsSummaryResponse = payload => {
	const { threads_summary: chatThreadsSummary, total_threads: totalThreads } = payload

	const threadsSummary = numericSortBy(
		'order',
		chatThreadsSummary.map(({ total_events: totalEvents, id, active, order }) => ({ id, active, order, totalEvents })),
	)

	return { threadsSummary, totalThreads }
}

const parseIncomingChatThreadPush = payload => parseNewThreadData(payload.chat)

const parseIncomingEventPush = payload => ({
	chat: payload.chat_id,
	event: parseEvent(payload.thread_id, payload.event),
})

const parseIncomingTypingIndicatorPush = payload => {
	const { chat_id: chat, typing_indicator: data } = payload
	return { chat, user: data.author_id, isTyping: data.is_typing }
}

const parseLastSeenTimestampUpdatedPush = payload => {
	return {
		chat: payload.chat_id,
		user: payload.user_id,
		// $FlowFixMe flow doesnt understand refinements other than inline
		timestamp: parseServerTimestamp(payload.timestamp),
	}
}

const parseGetChatsSummaryResponse = payload => {
	const chatsSummary = payload.chats_summary.map(
		({
			id,
			active,
			order,
			last_thread_id: lastThreadId,
			last_event_per_type: lastEventsPerType,
			properties = {},
			users,
		}) => {
			const chatSummary = {}
			chatSummary.id = id
			chatSummary.active = active
			chatSummary.order = parseServerTimestamp(order)
			chatSummary.properties = parseProperties(properties)
			chatSummary.users = users.map(({ id: user }) => user)
			chatSummary.lastThread = lastThreadId
			chatSummary.lastSeenTimestamps = parseUsersLastSeenTimestamps(users)

			if (!lastEventsPerType) {
				return chatSummary
			}

			chatSummary.lastEventsPerType = mapValues(
				({ thread_id: thread, event }) => parseEvent(thread, event),
				lastEventsPerType,
			)

			const lastEventsArray = Object.keys(lastEventsPerType).map(eventType => lastEventsPerType[eventType])
			const lastEvent = last(
				lastEventsArray.sort((eventA, eventB) => {
					if (eventA.thread_id === eventB.thread_id) {
						return eventA.event.order - eventB.event.order
					}

					return eventA.thread_order - eventB.thread_order
				}),
			)

			if (lastEvent) {
				chatSummary.lastEvent = cloneDeep(chatSummary.lastEventsPerType[lastEvent.event.type])
			}

			return chatSummary
		},
	)
	return {
		chatsSummary: numericSortBy(
			({ lastEvent, order }) => -1 * (lastEvent !== undefined ? lastEvent.timestamp : order),
			chatsSummary,
		),
		totalChats: payload.total_chats,
		users: compose(
			users => users.map(parseUser),
			users => uniqBy(user => user.id, users),
			summary => flatMap(({ users }) => users, summary),
		)(payload.chats_summary),
	}
}

const parseGetUrlDetailsResponse = payload => {
	// $FlowFixMe
	const { title, description, url, image_url: imageUrl, image_width: width, image_height: height } = payload
	return {
		title,
		description,
		url,
		image: {
			url: `https://${ imageUrl }`,
			width,
			height,
		},
	}
}

const parseSendEventResponse = payload => {
	if (payload.chat) {
		return parseNewThreadData(payload.chat)
	}

	return { event: parseEvent(payload.thread_id, payload.event) }
}

const parseStartChatResponse = payload => {
	const {
		chat: { id, thread, users, properties },
	} = payload

	const chat = {
		id,
		users: users.map(({ id: userId }) => userId),
		thread: thread.id,
		events: thread.events.map(event => parseEvent(thread.id, event)),
		properties: parseProperties(properties || {}),
	}

	return { chat, thread: parseThread(id, users, thread), users: users.map(parseUser) }
}

export const parsePush = (push: Push) => {
	switch (push.action) {
	case 'chat_properties_updated':
		return parseChatPropertiesUpdatedPush(push.payload)
	case 'chat_thread_properties_updated':
		return parseChatThreadPropertiesUpdatedPush(push.payload)
	case 'chat_user_added':
		return parseChatUserAddedPush(push.payload)
	case 'chat_user_removed':
		return parseChatUserRemovedPush(push.payload)
	case 'customer_page_updated':
		return parseCustomerPageUpdatedPush(push.payload)
	case 'customer_updated':
		return parseCustomerUpdatedPush(push.payload)
	case 'incoming_chat_thread':
		return parseIncomingChatThreadPush(push.payload)
	case 'incoming_event':
		return parseIncomingEventPush(push.payload)
	case 'incoming_typing_indicator':
		return parseIncomingTypingIndicatorPush(push.payload)
	case 'last_seen_timestamp_updated':
		return parseLastSeenTimestampUpdatedPush(push.payload)
	case 'thread_closed':
		return { chat: push.payload.chat_id }
	default:
		// $FlowFixMe
		return push.payload
	}
}

export const parseResponse = (action: ServerResponseAction, payload: *): * => {
	switch (action) {
	case 'close_thread':
		return SUCCESS
	case 'get_chat_threads':
		return parseGetChatThreadsResponse(payload)
	case 'get_chat_threads_summary':
		return parseGetChatThreadsSummaryResponse(payload)
	case 'get_chats_summary':
		return parseGetChatsSummaryResponse(payload)
	case 'get_url_details':
		return parseGetUrlDetailsResponse(payload)
	case 'send_event':
		return parseSendEventResponse(payload)
	case 'send_sneak_peek':
		return SUCCESS
	case 'start_chat':
		return parseStartChatResponse(payload)
	case 'update_chat_properties':
		return SUCCESS
	case 'update_chat_thread_properties':
		return SUCCESS
	case 'update_customer':
		return SUCCESS
	case 'update_customer_page':
		return parseCustomerPageUpdatedPush(payload)
	case 'update_last_seen_timestamp':
		return { timestamp: parseServerTimestamp(payload.timestamp) }
	default:
		return payload
	}
}

export const parseServerError = (action: ServerResponseAction, error: ServerResponseError) => {
	switch (error.type) {
	case 'authentication':
		return { code: 'AUTHENTICATION', message: error.message }
	case 'request_timeout':
		return { code: 'REQUEST_TIMEOUT', message: error.message }
	default:
		return { code: 'REQUEST_FAILED', ...error }
	}
}
