---
weight: 50
---

# Callbacks

Callbacks allow you to react to the events triggered by the Chat Widget.
You can use them to add custom behaviors when certain events happen.
This can be accomplished by subscribing a callback with the API.

Available callbacks:

- [On load](#load)
- [On availability changed](#availability-changed)
- [On visibility changed](#visibility-changed)
- [On customer status changed](#customer-status-changed)
- [On new event](#new-event)
- [On form submitted](#form-submitted)
- [On rating submitted](#rating-submitted)

## On load

The Chat Widget has finished loading.
With this callback, you will receive the Chat Widget tate and customer data as if requested by their getters.

#### Payload

| param        | type                               | description                        |
| ------------ | ---------------------------------- | ---------------------------------- |
| state        | [WidgetState](#get-state)          | the Chat Widget state              |
| customerData | [CustomerData](#get-customer-data) | Customer data from the Chat Widget |

```js
function onLoad(initialData) {
  // chat has finished loading

  var state = initialData.state
  var customerData = initialData.customerData
}

LiveChatWidget.on('load', onLoad)
LiveChatWidget.off('load', onLoad)
```

## On availability changed

Availability has changed for the current group.

#### Payload

| param        | type                      | description             |
| ------------ | ------------------------- | ----------------------- |
| availability | `"online"` \| `"offline"` | Availability of a group |

```js
function onAvailabilityChanged(data) {
  if (data.availability === 'online') {
    // we're available to chat!
  } else {
    // sadly, no agents are available at the moment.
  }
}

LiveChatWidget.on('availability_changed', onAvailabilityChanged)
LiveChatWidget.off('availability_changed', onAvailabilityChanged)
```

## On visibility changed

Called once the visibility of the Chat Widget has changed.
This applies to both user actions like maximizing or minimizing the window as well as hiding or showing the Chat Widget through the use of this API.

#### Payload

| param      | type                                         | description                |
| ---------- | -------------------------------------------- | -------------------------- |
| visibility | `"maximized"` \| `"minimized"` \| `"hidden"` | the Chat Widget visibility |

```js
function onVisibilityChanged(data) {
  switch (data.visibility) {
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

## On customer status changed

Called once the status of your Customer has changed.
This can be used to track the following info:

- If and when Customers are being invited to chat
- If Customers are already chatting
- If they are waiting for an agent to become available in the queue

#### Payload

| param  | type                                                     | description       |
| ------ | -------------------------------------------------------- | ----------------- |
| status | `'queued'` \| `'chatting'` \| `'invited'` \|`'browsing'` | Customer's status |

```js
function onCustomerStatusChanged(data) {
  switch (data.status) {
    case 'queued':
      // customer is in queue
      break
    case 'chatting':
      // customer is currently chatting
      break
    case 'invited':
      // customer received an invitation but didn't start the chat
      break
    case 'browsing':
      // customer is in idle state, not queued, not chatting, and didn't receive an invitation
      break
  }
}

LiveChatWidget.on('customer_status_changed', onCustomerStatusChanged)
LiveChatWidget.off('customer_status_changed', onCustomerStatusChanged)
```

## On new event

Called for both incoming and outgoing events.

#### Payload

| param       | type                                        | description            |
| ----------- | ------------------------------------------- | ---------------------- |
| timestamp   | `number`                                    | Event's send timestamp |
| type        | `'message'` \| `'rich_message'` \| `'file'` | Event's type           |
| author.id   | `string`                                    | Event's author id      |
| author.type | `'customer'` \| `'agent'`                   | Event's author type    |

```js
function onNewEvent(event) {
  // do something
}

LiveChatWidget.on('new_event', onNewEvent)
LiveChatWidget.off('new_event', onNewEvent)
```

## On form submitted

Called after a form has been submitted in the chat.

Payload:

| param    | type                                      | description |
| -------- | ----------------------------------------- | ----------- |
| formType | `"prechat"` \| `"postchat"` \| `"ticket"` | Form's type |

```js
function onFormSubmitted(formType) {
  // do something
}

LiveChatWidget.on('form_submitted', onFormSubmitted)
LiveChatWidget.off('form_submitted', onFormSubmitted)
```

## On rating submitted

Called after the customer has rated the chat, or canceled the previous rating.

#### Payload

| param | type                            | description             |
| ----- | ------------------------------- | ----------------------- |
| value | `"good"` \| `"bad"` \| `"none"` | Customer's rating value |

```js
function onRatingSubmitted(value) {
  // do something
}

LiveChatWidget.on('rating_submitted', onRatingSubmitted)
LiveChatWidget.off('rating_submitted', onRatingSubmitted)
```
