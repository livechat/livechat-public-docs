# Callbacks

### new_message

```js
visitorApi.on('new_message', (newMessage) => {
    console.log(newMessage)
})
```
response:

| param      | type   | description               |
| ---------- | ------ | ------------------------- |
| messageId  | string | Message Id                |
| authorId   | string | Message author Id         |
| timestamp  | number | Timestamp added by server |
| text       | string | Message text              |
| chatId     | string | Message chat id           |

### visitor_banned

```js
visitorApi.on('visitor_banned', (data) => {
    console.log(data)
})
```

Feature description: https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features

### chat_started

```js
visitorApi.on('chat_started', (chatData) => {
    console.log(chatData)
})
```

### visitor_queued

```js
visitorApi.on('visitor_queued', (queueData) => {
    console.log(queueData)
})
```

### new_file

```js
visitorApi.on('new_file', (newFile) => {
    console.log(newFile)
})
```

Feature description: https://www.livechatinc.com/features/chat-tools/#File-sharing

### agent_changed

```js
visitorApi.on('agent_changed', (newAgent) => {
    console.log(newAgent)
})
```

### typing_indicator

```js
visitorApi.on('typing_indicator', (typingData) => {
    console.log(typingData)
})
```

### message_seen

```js
visitorApi.on('message_seen', (messageData) => {
    console.log(messageData)
})
```

Feature description: https://www.livechatinc.com/features/chat-tools/#Delivery-status