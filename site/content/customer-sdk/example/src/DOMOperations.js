import * as DOMElements from './DOMElements'

const isAtTheBottom = (element, tolerance = 20) =>
	element.scrollTop + element.clientHeight >= element.scrollHeight - tolerance

export const getMessageList = chatId => {
	const messageLists = document.getElementsByClassName('message-list')

	for (let index = 0; index < messageLists.length; index++) {
		const messageList = messageLists[index]
		if (messageList.dataset.id === chatId) {
			return messageList
		}
	}

	return null
}

export const createMessage = (id, text, authorType, avatar) => {
	const messageDivContainer = document.createElement('div')
	messageDivContainer.dataset.id = id
	messageDivContainer.classList.add('message-container', authorType)
	if (avatar) {
		const avatarImage = document.createElement('img')
		avatarImage.src = `https://${ avatar }`
		avatarImage.classList.add('agent-avatar')
		messageDivContainer.append(avatarImage)
	}
	const messageDiv = document.createElement('div')
	messageDiv.classList.add('message')
	messageDiv.innerHTML = '<div>' + text + '</div>'
	messageDivContainer.append(messageDiv)
	return messageDivContainer
}

export const appendMessage = (chatId, message) => {
	const messageList = getMessageList(chatId)
	const shouldScrollToBottom = isAtTheBottom(messageList)
	messageList.appendChild(message)
	if (shouldScrollToBottom) {
		scrollToBottom(chatId)
	}
}

export const prependMessages = (chatId, messages) => {
	const messageList = getMessageList(chatId)
	messages.reverse().forEach(message => {
		const firstMessage = messageList.children[0]
		if (firstMessage) {
			messageList.insertBefore(message, firstMessage)
			return
		}
		appendMessage(chatId, message)
	})
}

export const markAsFailedMessage = id => {}

export const confirmMessageAsSent = id => {}

export const disableInput = text => {
	if (text) {
		DOMElements.input.placeholder = text
	}
	DOMElements.input.disabled = true
}

export const enableInput = () => {
	DOMElements.input.placeholder = 'Write a message'
	DOMElements.input.disabled = false
}

export const disableSendButton = () => {
	DOMElements.sendButton.disabled = true
}

export const enableSendButton = () => {
	DOMElements.sendButton.disabled = false
}

export const toggleMinimized = () => {
	DOMElements.lcWindow.classList.toggle('minimized')
	DOMElements.lcWindowMinimized.classList.toggle('minimized')
}

export const scrollToBottom = chatId => {
	const messageList = getMessageList(chatId)
	messageList.scrollTop = messageList.scrollHeight
}

export const createChatItem = (state, chatId, lastEvent) => {
	const chatItem = document.createElement('div')
	chatItem.classList.add('chat-item')
	chatItem.dataset.id = chatId

	if (lastEvent && state.users[lastEvent.author].avatar) {
		const { avatar: avatarUrl } = state.users[lastEvent.author]
		const avatarWrapper = document.createElement('div')
		avatarWrapper.classList.add('chat-item-avatar-wrapper')

		const avatar = document.createElement('img')
		avatar.classList.add('agent-avatar')
		avatar.setAttribute('src', `https://${ avatarUrl }`)

		avatarWrapper.appendChild(avatar)
		chatItem.appendChild(avatarWrapper)
	} else {
		const customerLetterWrapper = document.createElement('div')
		customerLetterWrapper.classList.add('customer-letter-wrapper')
		const customerLetter = document.createElement('span')
		customerLetter.textContent = 'C'
		customerLetter.classList.add('customer-letter')
		customerLetterWrapper.appendChild(customerLetter)
		chatItem.appendChild(customerLetterWrapper)
	}

	const chatItemContent = document.createElement('div')
	chatItemContent.classList.add('chat-item-content')

	const firstRow = document.createElement('div')
	firstRow.classList.add('chat-item-content-row')

	const authors = document.createElement('div')
	authors.classList.add('chat-item-content-authors')
	authors.textContent = 'with Jane'

	const time = document.createElement('div')
	time.classList.add('chat-item-content-time')

	if (lastEvent && lastEvent.timestamp) {
		const date = new Date(lastEvent.timestamp)
		time.textContent = `${ date.getHours() }:${ date.getMinutes() }`
	}

	const secondRow = document.createElement('div')
	secondRow.classList.add('chat-item-content-row')
	secondRow.classList.add('chat-item-content-text')
	secondRow.textContent = lastEvent ? `You: ${ lastEvent.text }` : ''

	chatItem.appendChild(chatItemContent)

	chatItemContent.appendChild(firstRow)
	firstRow.appendChild(authors)
	firstRow.appendChild(time)

	chatItemContent.appendChild(secondRow)

	return chatItem
}

export const appendChatItem = chatItem => DOMElements.chatsList.appendChild(chatItem)

export const appendChat = chatId => {
	const messageList = document.createElement('div')
	messageList.classList.add('message-list')
	messageList.dataset.id = chatId

	const chatWindow = DOMElements.lcWindow
	const elements = chatWindow.children

	let index
	for (index = 0; index < elements.length; index++) {
		if (elements[index] === DOMElements.chatsList) {
			break
		}
	}

	chatWindow.insertBefore(messageList, elements[index + 1])
}

export const hideChats = () => {
	const messageLists = document.getElementsByClassName('message-list')

	for (let index = 0; index < messageLists.length; index++) {
		messageLists[index].classList.remove('message-list-shown')
	}
}

export const showChat = chatId => {
	DOMElements.chatsList.style.display = 'none'
	DOMElements.startChatButton.style.display = 'none'
	DOMElements.textareaWrapper.style.display = 'flex'

	hideChats()

	getMessageList(chatId).classList.add('message-list-shown')
	DOMElements.input.focus()
}

export const showChatsList = () => {
	hideChats()
	DOMElements.chatsList.style.display = 'block'
	DOMElements.startChatButton.style.display = 'inline-block'
	DOMElements.textareaWrapper.style.display = 'none'
}

const closest = (to, element) => {
	const toClass = to.substr(1)
	let target = element
	while (target) {
		if (target.classList.contains(toClass)) {
			return target
		}
		target = target.parentElement
	}

	return null
}

export const delegate = (from, to, eventName, handler) => {
	const targetSelector = `${ to }, ${ to } *`

	document.querySelector(from).addEventListener(eventName, ev => {
		if (!ev.target.matches(targetSelector)) {
			return
		}

		handler.call(closest(to, ev.target), ev)
	})
}

// TODO: dedupe it later its a copy
// with exception that this one handles context passing
export const throttle = (ms, fn) => {
	let lastCall = Date.now() - 2 * ms
	let result
	let trailing

	function invoke(...args) {
		lastCall = Date.now()
		return (result = fn.apply(this, args))
	}

	return function throttler(...args) {
		const now = Date.now()

		if (now - lastCall >= ms) {
			return invoke.apply(this, args)
		}

		clearTimeout(trailing)
		trailing = setTimeout(() => invoke.apply(this, args), lastCall - now + ms)

		return result
	}
}
