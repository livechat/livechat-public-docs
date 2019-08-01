---
weight: 40
---

# API Description

## Reacting to Events with Callbacks

Callbacks allow you to react to events triggered by the Chat Widget.
You might be interested in adding behavior only when a certain event has happened.
This can be accomplished by subscribing a callback with the API.

Available callbacks:

- [load](#load)
- [availability changed](#availability-changed)
- [visibility changed](#visibility-changed)
- [customer status changed](#customer-status-changed)
- [new event](#new-event)
- [form submitted](#form-submitted)
- [rating submitted](#rating-submitted)

### load

The Chat Widget has finished loading.

Example usage:

```js
function onLoad() {
  // chat has finished loading
}

LiveChatWidget.on('load', onLoad)
LiveChatWidget.off('load', onLoad)
```

### availability changed

Availability has changed for the current group.

Payload:

| param        | type                  | description           |
| ------------ | --------------------- | --------------------- |
| availability | "online" \| "offline" | Groups's availability |

Example usage:

```js
function onAvailabilityChanged(availability) {
  if (availability === 'online') {
    // we're available to chat!
  } else {
    // sadly, no agents are available at the moment.
  }
}

LiveChatWidget.on('availability_changed', onAvailabilityChanged)
LiveChatWidget.off('availability_changed', onAvailabilityChanged)
```

### visibility changed

Called the visibility of our Chat Widget is changed.
This responds to both user actions like maximizing or minimizing the window as well as hiding or showing the Chat Widget through the use of this API.

Payload:

| param      | type                                   | description              |
| ---------- | -------------------------------------- | ------------------------ |
| visibility | "maximized" \| "minimized" \| "hidden" | Chat widget's visibility |

Example usage:

```js
function onVisibilityChanged(visibility) {
  switch (visibility) {
    case 'maximized':
      break
    case 'minimized':
      break
    case 'hidden':
      break
  }
}

LiveChatWidget.on('visibility_changed', onVisibilityChanged)
LiveChatWidget.off('visibility_changed', onVisibilityChanged)
```

### customer status changed

Called when your customer status is changed.
This can be used to track if and when customers are being invited to chat, are already chatting or if they are waiting for an agent to become available in the queue.

Payload:

| param  | type                                              | description       |
| ------ | ------------------------------------------------- | ----------------- |
| status | 'queued' \| 'chatting' \| 'browsing' \| 'invited' | Customer's status |

Example usage:

```js
function onCustomerStatusChanged(status) {
  // do something
}

LiveChatWidget.on('customer_status_changed', onCustomerStatusChanged)
LiveChatWidget.off('customer_status_changed', onCustomerStatusChanged)
```

### new event

Called for both incoming and outgoing events.

Payload:

```ts
event: {
    timestamp: number,
    type: 'message' | 'rich_message' | 'file',
    author: {
        id: string,
        type: 'customer' | 'agent',
    },
}
```

Example usage:

```js
function onNewEvent(event) {
  // do something
}

LiveChatWidget.on('new_event', onNewEvent)
LiveChatWidget.off('new_event', onNewEvent)
```

### form submitted

Called after a form has been submitted in the chat.

Payload:

| param    | type                                | description |
| -------- | ----------------------------------- | ----------- |
| formType | 'prechat' \| 'postchat' \| 'ticket' | Form's type |

|

Example usage:

```js
function onFormSubmitted(formType) {
  // do something
}

LiveChatWidget.on('form_submitted', onFormSubmitted)
LiveChatWidget.off('form_submitted', onFormSubmitted)
```

### rating submitted

Called after the customer has rated the chat, or canceled the previous rating.

Payload:

| param | type                      | description             |
| ----- | ------------------------- | ----------------------- |
| value | 'good' \| 'bad' \| 'none' | Customer's rating value |

Example usage:

```js
function onRatingSubmitted(value) {
  // do something
}

LiveChatWidget.on('rating_submitted', onRatingSubmitted)
LiveChatWidget.off('rating_submitted', onRatingSubmitted)
```
