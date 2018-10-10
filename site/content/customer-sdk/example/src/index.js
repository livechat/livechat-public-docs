import './index.css'
import './polyfill'
import { init, debug } from '@livechat/customer-sdk'
import * as DOMElements from './DOMElements'
import * as DOMOperations from './DOMOperations'

const loader = document.getElementById('livechat-loader')
loader.innerHTML = DOMElements.logoLoader

const historyStates = {
	DONE: 'DONE',
	INACTIVE: 'INACTIVE',
	LOADING: 'LOADING',
}

const noop = () => {}

// const sdk = debug(init({ license: 8928139, clientId: '2a9ba819a9df5b26eeeceb2e5a3b9101' }))
const sdk = debug(init({ license: 100004225, clientId: 'a1edcced92a9cc710339bcf18710b923' }, 'labs'))
window.sdk = sdk

const state = {
	chats: {},
	users: {},
	pendingMessages: [],
	currentChat: null,
	customerId: null,
}

const isAgent = user => user.id !== state.customerId

sdk.on('connected', ({ chatsSummary, totalChats }) => {
	loader.parentElement.removeChild(loader)
	DOMOperations.enableInput()
	DOMOperations.enableSendButton()
	if (totalChats === 0) {
		return
	}
	chatsSummary.forEach(({ id, lastEvent }) => {
		if (state.chats[id]) {
			return
		}
		state.chats[id] = {}
		DOMOperations.appendChatItem(DOMOperations.createChatItem(state, id, lastEvent))
		DOMOperations.appendChat(id)
	})
})

sdk.on('connection_restored', noop)
sdk.on('thread_summary', noop)
sdk.on('user_is_typing', noop)
sdk.on('user_stopped_typing', noop)
sdk.on('user_joined_chat', noop)
sdk.on('user_left_chat', noop)

sdk.on('customer_id', id => {
	state.customerId = id
})

const onConnectionLost = () => {
	DOMOperations.disableInput('Disconnected')
	DOMOperations.disableSendButton()
}

sdk.on('connection_lost', () => {
	onConnectionLost()
})

sdk.on('diconnected', reason => {
	onConnectionLost()
})

sdk.on('user_data', user => {
	state.users[user.id] = user
})

sdk.on('new_event', ({ chat, event }) => {
	if (!state.chats[chat] || event.type !== 'message') {
		return
	}
	const author = state.users[event.author]
	DOMOperations.appendMessage(
		chat,
		DOMOperations.createMessage(event.id, event.text, isAgent(author) ? 'agent' : 'customer', author.avatar),
	)
})

const sendMessage = (chat, id, text) => {
	const message = { type: 'message', customId: id, text }

	sdk
		.sendEvent(chat, message)
		.then(confirmedMessage => {
			DOMOperations.confirmMessageAsSent(id)
		})
		.catch(() => {
			DOMOperations.markAsFailedMessage(id)
		})
}

const startChat = () => {
	DOMOperations.appendChat('temp')
	DOMOperations.showChat('temp')

	sdk
		.startChat()
		.then(({ id: chatId }) => {
			DOMOperations.appendChatItem(DOMOperations.createChatItem(state, chatId))
			DOMOperations.getMessageList('temp').dataset.id = chatId
			state.currentChat = chatId
			state.chats[chatId] = {
				historyStatus: historyStates.DONE,
			}
			state.pendingMessages.forEach(({ messageId: customId, text: message }) => sendMessage(chatId, customId, message))
			state.pendingMessages = []
		})
		.catch(() => {
			state.pendingMessages.forEach(({ messageId: id }) => DOMOperations.markAsFailedMessage(id))
			state.pendingMessages = []
		})
}

const handleMessage = () => {
	const text = DOMElements.input.value
	DOMElements.input.value = ''

	if (!text) {
		return
	}

	const messageId = Math.random()
		.toString(36)
		.substring(2)

	if (state.currentChat) {
		sendMessage(state.currentChat, messageId, text)
	} else {
		state.pendingMessages.push({ messageId, text })
	}

	const chat = state.currentChat || 'temp'
	DOMOperations.appendMessage(chat, DOMOperations.createMessage(messageId, text, 'customer'))
	DOMOperations.scrollToBottom(chat)
}

DOMElements.startChatButton.onclick = startChat

DOMElements.sendButton.onclick = handleMessage

DOMElements.minimizeButton.onclick = DOMOperations.toggleMinimized

DOMElements.lcWindowMinimized.onclick = DOMOperations.toggleMinimized

DOMElements.input.onkeydown = event => {
	if (event.which !== 13) {
		return
	}
	event.preventDefault()
	handleMessage()
}

const loadHistory = chat => {
	return new Promise((resolve, reject) => {
		state.chats[chat].historyStatus = historyStates.LOADING
		state.chats[chat].history
			.next()
			.then(({ value: events, done }) => {
				if (!events) {
					return
				}

				const messages = events.filter(event => event.type === 'message').map(event => {
					const author = state.users[event.author]
					return DOMOperations.createMessage(
						event.id,
						event.text,
						isAgent(author) ? 'agent' : 'customer',
						author.avatar,
					)
				})
				const messageList = DOMOperations.getMessageList(chat)

				const fromTheBottom = messageList.scrollHeight - (messageList.scrollTop + messageList.clientHeight)

				DOMOperations.prependMessages(chat, messages)

				messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight - fromTheBottom

				state.chats[chat].historyStatus = done ? historyStates.DONE : historyStates.INACTIVE
				resolve()
			})
			.catch(err => {
				state.chats[chat].historyStatus = historyStates.INACTIVE
				reject(err)
			})
	})
}

DOMOperations.delegate('#chats-list', '.chat-item', 'click', function showChat() {
	const chatId = this.dataset.id
	state.currentChat = chatId
	DOMOperations.showChat(chatId)

	if (state.chats[chatId].history || state.chats[chatId].historyStatus === historyStates.DONE) {
		return
	}

	state.chats[chatId].history = sdk.getChatHistory(chatId)
	state.chats[chatId].historyStatus = historyStates.INACTIVE

	const loadLatestHistory = () => loadHistory(chatId).then(() => DOMOperations.scrollToBottom(chatId))

	loadLatestHistory()
		.catch(() => loadLatestHistory())
		.catch(noop)
})

DOMOperations.delegate(
	'#livechat',
	'.message-list',
	'mousewheel',
	DOMOperations.throttle(300, function loadMore() {
		const chatId = this.dataset.id
		const chat = state.chats[chatId]

		if (this.scrollTop < 50 && chat.historyStatus === historyStates.INACTIVE) {
			loadHistory(chatId).catch(noop)
		}
	}),
)

DOMElements.backButton.onclick = DOMOperations.showChatsList

window.addEventListener('beforeunload', sdk.disconnect)
