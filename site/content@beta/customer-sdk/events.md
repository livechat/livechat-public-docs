---
title: 'Events'
weight: 50
---

## Events

You can listen for emitted events by subscribing to them (using
[on method](#on)) with your custom JavaScript function. For example, your
function can be executed every time a message has been received.

### connected

```js
customerSDK.on('connected', payload => {
  console.log('connected')
  console.log(payload.chatsSummary)
  console.log(payload.totalChats)
})
```

Payload:

| shape        | type     | shape              | type     | description                                        |
| ------------ | -------- | ------------------ | -------- | -------------------------------------------------- |
| chatsSummary | object[] |                    |          |                                                    |
|              |          | id                 |          | Chat's id                                          |
|              |          | active             | boolean  |                                                    |
|              |          | users              | string[] | Users' ids                                         |
|              |          | lastEvent          | object   | Event                                              |
|              |          | lastEventsPerType  | object   | Map from event types to event objects              |
|              |          | lastSeenTimestamps | object   | Map from Users' ids to optional lastSeenTimestamps |
|              |          | lastThread         | string   | Thread's id                                        |
| totalChats   | number   |                    |          |                                                    |

### connection_lost

```js
customerSDK.on('connection_lost', () => {
  console.log('connection_lost')
})
```

This event doesn't carry any additional payload.

### connection_restored

```js
customerSDK.on('connection_restored', payload => {
  console.log('connection_restored')
  console.log(payload.chatsSummary)
  console.log(payload.totalChats)
})
```

Payload:

| shape        | type     | shape              | type     | description                                        |
| ------------ | -------- | ------------------ | -------- | -------------------------------------------------- |
| chatsSummary | object[] |                    |          |                                                    |
|              |          | id                 |          | Chat's id                                          |
|              |          | active             | boolean  |                                                    |
|              |          | users              | string[] | Users' ids                                         |
|              |          | lastEvent          | object   | Event                                              |
|              |          | lastEventsPerType  | object   | Map from event types to event objects              |
|              |          | lastSeenTimestamps | object   | Map from Users' ids to optional lastSeenTimestamps |
|              |          | lastThread         | string   | Thread's id                                        |
| totalChats   | number   |                    |          |                                                    |

### customer_id

```js
customerSDK.on('customer_id', id => {
  console.log('customer id is', id)
})
```

Payload:

| argument | type   |
| -------- | ------ |
| id       | string |

### disconnected

```js
customerSDK.on('disconnected', reason => {
  console.log(reason)
})
```

Payload:

| argument | type   | description |
| -------- | ------ | ----------- |
| reason   | string | Optional    |

### chat_properties_updated

```js
customerSDK.on('chat_properties_updated', payload => {
  console.log(payload.chat)
  console.log(payload.properties)
})
```

Payload:

| shape      | type   | description     |
| ---------- | ------ | --------------- |
| chat       | string | Chat's id       |
| properties | object | Chat properties |

### chat_thread_properties_updated

```js
customerSDK.on('chat_thread_properties_updated', payload => {
  console.log(payload.chat)
  console.log(payload.thread)
  console.log(payload.properties)
})
```

Payload:

| shape      | type   | description       |
| ---------- | ------ | ----------------- |
| chat       | string | Chat's id         |
| thread     | string | Thread's id       |
| properties | object | Thread properties |

### last_seen_timestamp_updated

```js
customerSDK.on('last_seen_timestamp_updated', payload => {
  console.log(payload.chat)
  console.log(payload.user)
  console.log(payload.timestamp)
})
```

Payload:

| shape     | type   | description |
| --------- | ------ | ----------- |
| chat      | string | Chat's id   |
| user      | string | User's id   |
| timestamp | number |             |

### new_event

You should distinguish received events by their types.

```js
customerSDK.on('new_event', ({ chat, event }) => {
  switch (event.type) {
    case 'message':
      console.log('new message - ', event.text)
      break
    default:
      break
  }
})
```

Payload:

| shape | type   | description      |
| ----- | ------ | ---------------- |
| type  | string | Event's type     |
| ...   |        | Other properties |

### user_data

```js
customerSDK.on('user_data', user => {
  console.log(user)
})
```

User:

| shape | type | description |
| ----- | ---- | ----------- |
|       |      |             |

### user_joined_chat

```js
customerSDK.on('user_joined_chat', ({ user, chat }) => {
  console.log({ user, chat })
})
```

Payload:

| shape | type   | description |
| ----- | ------ | ----------- |
| user  | string | User's ID   |
| chat  | string | Chat's ID   |

### user_left_chat

```js
customerSDK.on('user_left_chat', ({ user, chat }) => {
  console.log({ user, chat })
})
```

Payload:

| shape | type   | description |
| ----- | ------ | ----------- |
| user  | string | User's ID   |
| chat  | string | Chat's ID   |

### user_is_typing

```js
customerSDK.on('user_is_typing', payload => {
  console.log(
    'user with ' + payload.user + ' id is writing something in ' + payload.chat,
  )
})
```

Payload:

| shape | type   | description |
| ----- | ------ | ----------- |
| chat  | string | Chat's id   |
| user  | string | User's id   |

### user_stopped_typing

```js
customerSDK.on('user_stopped_typing', payload => {
  console.log(
    'user with ' + payload.user + ' id stopped writing in ' + payload.chat,
  )
})
```

Payload:

| shape | type   | description |
| ----- | ------ | ----------- |
| chat  | string | Chat's id   |
| user  | string | User's id   |

### thread_closed

```js
customerSDK.on('thread_closed', ({ chat }) => {
  console.log(chat)
})
```

Payload:

| shape | type   | description |
| ----- | ------ | ----------- |
| chat  | string | Chat's id   |

### thread_summary

```js
customerSDK.on('thread_summary', summary => {
  console.log(summary)
})
```

Payload:

| shape       | type   | description |
| ----------- | ------ | ----------- |
| id          | string |             |
| chat        | string | Chat's ID   |
| order       | number |             |
| totalEvents | number |             |
