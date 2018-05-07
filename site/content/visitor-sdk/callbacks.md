---
weight: 40
---

# Callbacks

Callbacks let you bind a custom JavaScript function to an event. For example, your function can be executed every time agent's message has been received.

## visitor_data

Callback function executed when server returns visitor's data.

```js
visitorSDK.on('visitor_data', visitorData => {
  console.log(visitorData)
})
```

#### Payload:

| param | type   | description |
| ----- | ------ | ----------- |
| id    | string | Visitor ID  |

## new_message

Callback function executed when a new message arrives.

```js
visitorSDK.on('new_message', newMessage => {
  console.log(newMessage)
})
```

#### Payload:

| param     | type   | description                                     |
| --------- | ------ | ----------------------------------------------- |
| id        | string | Message ID                                      |
| authorId  | string | Message author ID                               |
| timestamp | number | Timestamp added by server                       |
| text      | string | Message text                                    |
| chatId    | string | Message chat ID                                 |
| customId  | string | Message custom ID (for visitor's messages only) |

## visitor_banned - not implemented yet

Callback function executed when a [visitor is banned](https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features).

```js
visitorSDK.on('visitor_banned', data => {
  console.log(data)
})
```

## chat_started

Callback function executed when a chat is started.

```js
visitorSDK.on('chat_started', chatData => {
  console.log(chatData)
})
```

#### Payload:

| param  | type   | description |
| ------ | ------ | ----------- |
| chatId | string | New chat ID |

## chat_ended

Callback function executed when a chat is ended. This callback is called without any additional data.

```js
visitorSDK.on('chat_ended', () => {
  console.log('Chat is closed')
})
```

## status_changed

Callback function executed when the chat status is changed.

```js
visitorSDK.on('status_changed', statusData => {
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
visitorSDK.on('visitor_queued', queueData => {
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
visitorSDK.on('connection_status_changed', statusData => {
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
visitorSDK.on('new_file', newFile => {
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
visitorSDK.on('agent_changed', newAgent => {
  console.log(newAgent)
})
```

#### Payload:

| param     | type   | description                                     |
| --------- | ------ | ----------------------------------------------- |
| name      | string | Agent's name                                    |
| id        | string | Agent's ID                                      |
| avatarUrl | string | Agent's avatar - path to the image on Amazon s3 |
| jobTitle  | string | Agent's job title                               |

## typing_indicator

Callback function executed when the typing indicator appears.

```js
visitorSDK.on('typing_indicator', typingData => {
  console.log(typingData)
})
```

#### Payload:

| param    | type    | description                       |
| -------- | ------- | --------------------------------- |
| authorId | string  | Author ID of the writer           |
| isTyping | boolean | Author is typing / stopped typing |

## message_seen

Callback function executed when a message is marked as seen.

Learn more about LiveChat delivery statuses [here](https://www.livechatinc.com/features/chat-tools/#Delivery-status).

```js
visitorSDK.on('message_seen', data => {
  console.log(data)
})
```

#### Payload:

| param    | type                | description                  |
| -------- | ------------------- | ---------------------------- |
| id       | string              | Seen message id              |
| customId | string              | Seen message custom id       |
| type     | "agent" / "visitor" | Original message author type |

## chat_rated

Callback function executed when the chat is [rated or commented](<(https://www.livechatinc.com/features/getting-feedback/#Chat-ratings)>) by visitor.

```js
visitorSDK.on('chat_rated', data => {
  console.log(messageData)
})
```

#### Payload:

| param   | type                    | description       |
| ------- | ----------------------- | ----------------- |
| rate    | "good" \ "bad" \ "none" | Rate type         |
| comment | string                  | Rate comment text |

## new_invitation

Callback function executed when an [invitation](https://www.livechatinc.com/features/engaging-customers/#Automatic-greetings) was sent to visitor.

```js
visitorSDK.on('new_invitation', invitationData => {
  console.log(invitationData)
})
```

#### Payload:

| param             | type    | description                                |
| ----------------- | ------- | ------------------------------------------ |
| id                | string  | Message ID                                 |
| authorId          | string  | Message author ID                          |
| text              | string  | Message text                               |
| receivedFirstTime | boolean | Was invitation received for the first time |

## ready

Callback executed when SDK finished initialization and all chat history was fetched. This callback is called without any additional data.

```js
visitorSDK.on('ready', () => {
  console.log('Visitor SDK is ready')
})
```
