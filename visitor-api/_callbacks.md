## Callbacks

Callbacks let you bind a custom JavaScript function to an event. For example, your function can be invoked every time agent's message was received.

### new_message

```js
visitorApi.on('new_message', (newMessage) => {
    console.log(newMessage)
})
```
Payload:

| param      | type    | description                   |
| ---------- | ------- | ----------------------------- |
| messageId  | string  | Message Id                    |
| authorId   | string  | Message author Id             |
| timestamp  | number  | Timestamp added by server     |
| text       | string  | Message text                  |
| chatId     | string  | Message chat id               |

### visitor_banned - not implemented yet

```js
visitorApi.on('visitor_banned', (data) => {
    console.log(data)
})
```

Feature description: [Visitor banning](https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features)

### chat_started

```js
visitorApi.on('chat_started', (chatData) => {
    console.log(chatData)
})
```
Payload:

| param  | type    | description |
| ------ | ------- | ----------- |
| chatId | string  | New chat id |

### chat_ended

```js
visitorApi.on('chat_ended', (chatData) => {
    console.log('Chat is closed');
})
```

Callback is called wihout any additional data.

### visitor_queued - not implemented yet

```js
visitorApi.on('visitor_queued', (queueData) => {
    console.log(queueData)
})
```

### new_file - not implemented yet

```js
visitorApi.on('new_file', (newFile) => {
    console.log(newFile)
})
```

Feature description: [File sharing](https://www.livechatinc.com/features/chat-tools/#File-sharing)

### agent_changed

```js
visitorApi.on('agent_changed', (newAgent) => {
    console.log(newAgent)
})
```

Payload:

| param     | type    | description                                     |
| --------- | ------- | ----------------------------------------------- |
| name      | string  | Agent's name                                    |
| id        | string  | Agent's Id                                      |
| avatarUrl | string  | Agent's avatar - path to the image on Amazon s3 |
| jobTitle  | string  | Agent's job title                               |

### typing_indicator - not implemented yet

```js
visitorApi.on('typing_indicator', (typingData) => {
    console.log(typingData)
})
```

### message_seen - not implemented yet

```js
visitorApi.on('message_seen', (messageData) => {
    console.log(messageData)
})
```

Feature description: [Delivery status](https://www.livechatinc.com/features/chat-tools/#Delivery-status)
