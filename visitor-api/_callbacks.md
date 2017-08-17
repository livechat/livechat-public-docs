# Callbacks

Callbacks let you bind a custom JavaScript function to an event. For example, your function can be executed every time agent's message has been received.

## new_message

Callback function executed when a new message arrives.

```js
visitorApi.on('new_message', (newMessage) => {
    console.log(newMessage)
})
```
#### Payload:

| param      | type    | description                   |
| ---------- | ------- | ----------------------------- |
| messageId  | string  | Message ID                   |
| authorId   | string  | Message author ID             |
| timestamp  | number  | Timestamp added by server     |
| text       | string  | Message text                  |
| chatId     | string  | Message chat ID               |

## visitor_banned - not implemented yet

Callback function executed when a [visitor is banned](https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features).

```js
visitorApi.on('visitor_banned', (data) => {
    console.log(data)
})
```


## chat_started

Callback function executed when a chat is started.

```js
visitorApi.on('chat_started', (chatData) => {
    console.log(chatData)
})
```
#### Payload:

| param  | type    | description |
| ------ | ------- | ----------- |
| chatId | string  | New chat ID |

## chat_ended

Callback function executed when a chat is ended. This callback is called without any additional data.

```js
visitorApi.on('chat_ended', (chatData) => {
    console.log('Chat is closed');
})
```


## status_changed

Callback function executed when the chat status is changed.

```js
visitorApi.on('status_changed', (statusData) => {
    console.log(statusData)
})
```

#### Payload:

| param  | type                  | description                      |
| ------ | --------------------- | -------------------------------- |
| status | "online" \| "offline" | Current chat availability status |

## visitor_queued

Callback function executed when a visitor is queued.

```js
visitorApi.on('visitor_queued', (queueData) => {
    console.log(queueData)
})
```

#### Payload:

| param         | type   | description                       |
| ------------- | ------ | --------------------------------- |
| numberInQueue | number | Visitor's order number in queue   |
| waitingTime   | number | Estimated waiting time in seconds |

## connection_status_changed

Callback function executed when the connection status changes.

```js
visitorApi.on('connection_status_changed', (statusData) => {
    console.log(statusData)
})
```

#### Payload:

| param  | type                          | description               |
| ------ | ----------------------------- | ------------------------- |
| status | "connected" \| "disconnected" | Current connection status |

## new_file

Callback function executed when a [file is shared](https://www.livechatinc.com/features/chat-tools/#File-sharing).

```js
visitorApi.on('new_file', (newFile) => {
    console.log(newFile)
})
```

#### Payload:

| param       | type   | description                           |
| ----------- | ------ | ------------------------------------- |
| id          | string | File ID                               |
| authorId    | string | File author ID                        |
| timestamp   | number | Timestamp added by server             |
| url         | string | File url                              |
| contentType | string | File content type (i.e. 'text/plain') |
| size        | number | File size                             |

## agent_changed

Callback function executed when an agent takes over the chat.

```js
visitorApi.on('agent_changed', (newAgent) => {
    console.log(newAgent)
})
```

#### Payload:

| param     | type    | description                                     |
| --------- | ------- | ----------------------------------------------- |
| name      | string  | Agent's name                                    |
| id        | string  | Agent's ID                                      |
| avatarUrl | string  | Agent's avatar - path to the image on Amazon s3 |
| jobTitle  | string  | Agent's job title                               |

## typing_indicator

Callback function executed when the typing indicator appears.

```js
visitorApi.on('typing_indicator', (typingData) => {
    console.log(typingData)
})
```

#### Payload:

| param    | type    | description                       |
| -------- | ------- | --------------------------------- |
| authorId | string  | Author ID of the writer           |
| isTyping | boolean | Author is typing / stopped typing |

## message_seen - not implemented yet

Callback function executed when a message is marked as Seen.

Learn more about LiveChat delivery statuses [here](https://www.livechatinc.com/features/chat-tools/#Delivery-status).

```js
visitorApi.on('message_seen', (messageData) => {
    console.log(messageData)
})
```
