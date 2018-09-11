---
weight: 40
---

## Methods

### closeThread

```js
customerSDK
  .closeThread('ON0X0R0L67')
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | type   | description                                 |
| --------- | ------ | ------------------------------------------- |
| chat      | string | Chat's id in which thread should get closed |

Returned value:

| shape   | type    |
| ------- | ------- |
| success | boolean |

### destroy

This method clears any held resources, removes all listeners and
disconnects from the network. After using this method you won't be able to use
the destroyed SDK's instance.

```js
customerSDK.destroy()
```

### disconnect

```js
customerSDK.disconnect()
```

### getChatHistory

This method facilitates loading more history events. You need to
get access to the `history` object for certain chat by calling this method. The
returned `history` object has only one method, `next`, which gives you a promise
of `{ done, value }` pair.

- `done` - indicates if there is anything more to load
- `value` - it's an array of loaded events

You can keep calling `history.next()` multiple times to load more and more
history events (useful for infinite scroll feature). Keep in mind, though,
that you generally shouldn't call `next` while the history is being loaded - we
queue those requests so the previous one must resolve before we proceed with the
next one.

Such structure like our `history` object is called an **async iterator**.

```js
let wholeChatHistoryLoaded = false

const history = customerSDK.getChatHistory('OU0V0P0OWT')

history.next().then(result => {
  if (result.done) {
    wholeChatHistoryLoaded = true
  }

  const events = result.value
  console.log(events)
})
```

Arguments:

| arguments | type   | description                                           |
| --------- | ------ | ----------------------------------------------------- |
| chat      | string | Chat's id for which history object should be returned |

### getChatsSummary

```js
customerSDK
  .getChatsSummary({
    offset: 0,
    limit: 10,
  })
  .then(({ chatsSummary, totalChats }) => {
    console.log(chatsSummary)
    console.log(totalChats)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments  | shape  | type   | default | max | description |
| ---------- | ------ | ------ | ------- | --- | ----------- |
| pagination |        |        |         |     |             |
|            | offset | number | 0       |     |             |
|            | limit  | number | 10      | 25  |             |

Returned value:

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

### getChatThreads

In most cases you do not need to use this method directly. If you want to load
more events, consider using [`getChatHistory`](#getchathistory).

```js
const threads = ["OS0C0W0Z1B", "OS0I0M0J0G", "OT01080705", "OT0E02082U", "OT0E08040G"]
customerSDK.getChatThreads("ON0X0R0L67", threads)
    .then(threads => {
        console.log(threads)
    })
    .catch(error => {
        console.log(rror
    })
```

Arguments:

| arguments | shape | type     |
| --------- | ----- | -------- |
| chat      |       | string   |
| threads   | page  | string[] |

Returned value:

| array of shapes | type     | description                     |
| --------------- | -------- | ------------------------------- |
| id              | string   | Thread's id                     |
| chat            | string   | Chat's id                       |
| active          | string[] | Active state                    |
| order           | number   | order (can be used for sorting) |
| users           | string[] | Users' ids                      |
| events          | object[] | Events                          |

### getChatThreadsSummary

In most cases you do not need to use this method directly. If you want to load
more events, consider using [`getChatHistory`](#getchathistory).

```js
customerSDK
  .getChatThreadsSummary('ON0X0R0L67', {
    offset: 0,
    limit: 10,
  })
  .then(summary => {
    console.log(summary.threadsSummary)
    console.log(summary.totalThreads)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments  | shape  | type   | default | max  | description |
| ---------- | ------ | ------ | ------- | ---- | ----------- |
| chat       |        | string |         |      |             |
| pagination |        |        |         |      |             |
|            | offset | number | 0       |      |             |
|            | limit  | number | 25      | 1000 |             |

Returned value:

| shape          | type     | shape       | type   |
| -------------- | -------- | ----------- | ------ |
| threadsSummary | object[] |             |        |
|                |          | id          | string |
|                |          | order       | number |
|                |          | totalEvents | number |
| totalThreads   | number   |             |        |

### getPredictedAgent

```js
customerSDK
  .getPredictedAgent()
  .then(agent => {
    console.log(agent)
  })
  .catch(error => {
    console.log(error)
  })
```

### off

This method unsubscribes from emitted events which are described [here](#events).

### on

This method subscribes to emitted events which are described [here](#events).

### once

This method subscribes to emitted events which are described [here](#events) and unsubscribes immediately after the callback gets called.

### rateChat

```js
customerSDK
  .rateChat('ON0X0R0L67', {
    value: 'good',
    comment: 'Agent helped me a lot!',
  })
  .then(rating => {
    console.log(rating)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | shape   | type   | description           |
| --------- | ------- | ------ | --------------------- |
| chat      |         |        | Destination chat's id |
| rating    |         |        |                       |
|           | score   | 0 or 1 | Rating value          |
|           | comment | string | Optional comment      |

Returned value:

| shape | type   |                    |
| ----- | ------ | ------------------ |
| id    | string | Created event's id |

### sendEvent

```js
const event = {
  type: 'message',
  // ... other properties specific for the event's type
}

customerSDK
  .sendEvent('ON0X0R0L67', event)
  .then(event => {
    console.log(event)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | shape              | type    | description           |
| --------- | ------------------ | ------- | --------------------- |
| chat      |                    | string  | Destination chat's id |
| event     |                    |         |                       |
|           | type               | string  | Type of the event     |
|           | ...                |         | Other properties      |
| meta      |                    |         |                       | optional |
|           | attachToLastThread | boolean | optional              |

### sendFile

This method is a little bit special - it returns regular `then`/`catch` methods
of a Promise **and** a `cancel` method which you can use to abort the upload of
the file. It also lets you pass `onProgress` callback function. Keep in mind
that the maximum accepted file size is 10 MB.

```js
customerSDK
  .sendFile(
    'ON0X0R0L67',
    {
      file,
      customId, // optional
    },
    {
      onProgress: progress => console.log(`upload progress: ${progress}`),
    },
  )
  .then(response => {
    console.log(response.url)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | shape      | type     | description                                                                   |
| --------- | ---------- | -------- | ----------------------------------------------------------------------------- |
| chat      |            | string   | Destination chat's id                                                         |
| data      |            |          |                                                                               |
|           | file       | Blob     |                                                                               |
|           | customId   | string   | Optional customId for the event                                               |
| spec      |            |          |                                                                               |
|           | onProgress | function | This callback function will receive a progress value - number between 0 and 1 |

Returned value:

| shape | type   |
| ----- | ------ |
| url   | string |

In React Native instead of passing a blob you need to pass an object of
[such shape](https://github.com/facebook/react-native/blob/56fef9b6225ffc1ba87f784660eebe842866c57d/Libraries/Network/FormData.js#L34-L38):

```js
const file = {
  uri: uriFromCameraRoll,
  type: 'image/jpeg', // optional
  name: 'photo.jpg', // optional
}
```

### sendPostback

```js
customerSDK
  .sendPostback('ON0X0R0L67', 'OS0C0W0Z1B', 'OS0C0W0Z1B01', {
    id: 'OS0C0W0Z1B01002',
    toggled: true,
  })
  .then(rating => {
    console.log('success')
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | shape   | type    | description                     |
| --------- | ------- | ------- | ------------------------------- |
| chat      |         | string  | Postback chat's id              |
| thread    |         | string  | Postback thread's id            |
| event     |         | string  | Postback event's id             |
| postback  |         |         |                                 |
|           | id      | string  | Postback button's id            |
|           | toggled | boolean | Postback toggled (default true) |

### setSneakPeek

This method doesn't return a promise. It just sets the internal sneak peek
value. It will be sent to the server only if the target chat is active and only
once per 2 seconds (it's [throttled](https://lodash.com/docs/4.17.4#throttle)).

```js
customerSDK.setSneakPeek('ON0X0R0L67', 'what is the price for your ')
```

Arguments:

| arguments | type   | description                              |
| --------- | ------ | ---------------------------------------- |
| chat      | string | Destination chat id                      |
| text      | string | Message preview broadcasted to the agent |

### startChat

```js
customerSDK
  .startChat({
    events: [],
  })
  .then(chat => {
    console.log(chat)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments     | shape  | type     | description        |
| ------------- | ------ | -------- | ------------------ |
| specification |        |          | For advanced usage |
|               | scope  |          |                    |
|               | events | events[] |                    |

### updateChatProperties

```js
const properties = {
  property_namespace: {
    sample: 'property',
  },
}
customerSDK
  .updateChatProperties('ON0X0R0L67', properties)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments  | shape | type   | description |
| ---------- | ----- | ------ | ----------- |
| chat       |       | string |             |
| properties |       |        |             |

### updateChatThreadProperties

```js
const properties = {
  property_namespace: {
    sample: 'property',
  },
}
customerSDK
  .updateChatThreadProperties('ON0X0R0L67', 'OS0C0W0Z1B', properties)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments  | shape | type   | description |
| ---------- | ----- | ------ | ----------- |
| chat       |       | string |             |
| thread     |       | string |             |
| properties |       |        |             |

### updateCustomer

```js
const properties = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  fields: {
    custom_property: 'BasketValue=10usd',
    any_key_is_ok: 'sample custom field',
  },
}
customerSDK.updateCustomer(properties)
```

Arguments:

| arguments  | shape  | type   | description                              |
| ---------- | ------ | ------ | ---------------------------------------- |
| properties |        |        |                                          |
|            | name   | string | Optional name                            |
|            | email  | string | Optional email                           |
|            | fields | object | Optionl custom fields with string values |

### updateCustomerPage

```js
customerSDK.updateCustomerPage({
  url: 'https://developers.livechatinc.com/',
  title: 'LiveChat for Developers',
})
```

Arguments:

| arguments | shape | type   | description |
| --------- | ----- | ------ | ----------- |
| page      |       |        |             |
|           | url   | string |             |
|           | title | string |             |

### updateLastSeenTimestamp

```js
customerSDK
  .updateLastSeenTimestamp('ON0X0R0L67', 1500646701447)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

Arguments:

| arguments | type   | description |
| --------- | ------ | ----------- |
| chat      | string |             |
| timestamp | number | optional    |

Returned value:

| shape     | type   |
| --------- | ------ |
| timestamp | number |

### $$observable

You can consume all emitted events as a stream with
[most](https://github.com/mostjs/core) of stream libraries like in example
[RxJS](https://github.com/reactivex/rxjs). We provide an interop point for this,
so you can easily convert our SDK to a stream like this:

```js
import Rx from '@reactivex/rxjs'

Rx.Observable.from(visitorSDK).subscribe(([eventName, eventData]) => {
  console.log(eventName, eventData)
})
```
