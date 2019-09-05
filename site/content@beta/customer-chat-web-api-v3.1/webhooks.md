---
weight: 70
---

# Webhooks

Webhooks notify you when specific events are triggered. Push equivalents in Agent Chat RTM API are [pushes](../customer-chat-rtm-api/#pushes).

----------------------------------------------------------------------------------------------------------------------------------------

|   |  |
|-------|--------| 
| **chats** | [`incoming_chat_thread`](#incoming-chat-thread) [`thread_closed`](#thread-closed) |
| **chat access** | [`access_set`](#access-set) |
| **chat users** |[`chat_user_added`](#chat-user-added) [`chat_user_removed`](#chat-user-removed)    | 
| **events** | [`incoming_event`](#incoming-event)  [`event_updated`](#event-updated)[`incoming_rich_message_postback`](#incoming-rich-message-postback)|
| **properties (chat/thread/event)** | [`chat_properties_updated`](#chat-properties-updated) [`chat_properties_deleted`](#chat-properties-deleted)  [`chat_thread_properties_updated`](#chat-thread-properties-updated) [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) [`event_properties_updated`](#event-properties-updated) [`event_properties_deleted`](#event-properties-deleted) |  
| **other** |  [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)| 


## chats

### `incoming_chat_thread`

> **`incoming_chat_thread`** sample payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"order": 343544565,
		"users": [
			// array of "User" objects
		],
		"properties": {
			// "Properties" object
		},
		"access": {
			// "Access" object
		},
		"thread": {
			// "Thread" object
		}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_chat_thread`  |
| **Push equivalent**| [`incoming_chat_thread`](../customer-chat-rtm-api/#incoming-chat-thread)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#incoming-chat-thread) |


### `thread_closed`

> **`thread_closed`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c" // optional
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `thread_closed`  |
| **Push equivalent**| [`thread_closed`](../customer-chat-rtm-api/#thread-closed)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#thread-closed) |

#### Push payload

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `user_id`   | Missing if a thread was closed by the router |


## chat access

### `access_set`

> **`access_set`** sample payload

```js
{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"group_ids": [
			1
		]
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `access_set`  |
| **Push equivalent**| [`access_set`](../customer-chat-rtm-api/#access-set)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#access-set) |


#### Push payload

| Object     | Notes         |
| ---------- | ------------- |
| `resource` | Resource type |
| `id`       | Resource id   |




## chat users

### `chat_user_added`

> **`chat_user_added`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user": {
		// "User > Customer" or "User > Agent" object
	},
	"user_type": "customer"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_user_added`  |
| **Push equivalent**| [`chat_user_added`](../customer-chat-rtm-api/#chat-user-added)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-user-added) |


#### Push payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | Possible values: `agent`, `customer`    |



### `chat_user_removed`

> **`chat_user_removed`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "user@example.com",
	"user_type": "customer"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_user_removed`  |
| **Push equivalent**| [`chat_user_removed`](../customer-chat-rtm-api/#chat-user-removed)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-user-removed) |


#### Push payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | Possible values: `agent`, `customer` |











## events

### `incoming_event`

> **`incoming_event`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_event`  |
| **Push equivalent**| [`incoming_event`](../customer-chat-rtm-api/#incoming-event)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#incoming-event) |

### `event_updated`

> **`event_updated`** sample payload

```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "E2WDHA8A",
	"event": {
		// "Event" object
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `event_updated`  |
| **Push equivalent**| [`event_updated`](../customer-chat-rtm-api/#event-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#event-updated) |





### `incoming_rich_message_postback`

> **`incoming_rich_message_postback`** sample payload

```js
{
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "action_yes",
		"toggled": true
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_rich_message_postback`  |
| **Push equivalent**| [`incoming_rich_message_postback`](../customer-chat-rtm-api/#incoming-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#incoming-rich-message-postback) |



## properties (chat/thread/event)

### `chat_properties_updated`

> **`chat_properties_updated`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": {
			"score": {
				"value": 1
			},
			"comment": {
				"value": "Very good!"
			}
		},
		...
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_properties_updated`  |
| **Push equivalent**| [`chat_properties_updated`](../customer-chat-rtm-api/#chat-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-properties-updated) |


#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |




### `chat_properties_deleted`

> **`chat_properties_deleted`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": ["score", "comment"]
		},
		...
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_properties_deleted`  |
| **Push equivalent**| [`chat_properties_deleted`](../customer-chat-rtm-api/#chat-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-properties-deleted) |

#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |






### `chat_thread_properties_updated`

> **`chat_thread_properties_updated`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": {
			"value": {
				"value": 1
			},
			"comment": {
				"value": "Very good!"
			}
		},
		...
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_thread_properties_updated`  |
| **Push equivalent**| [`chat_thread_properties_updated`](../customer-chat-rtm-api/#chat-thread-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-thread-properties-updated) |


#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated.  |



### `chat_thread_properties_deleted`

> **`chat_thread_properties_deleted`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": ["score", "comment"]
		},
		...
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_thread_properties_deleted`  |
| **Push equivalent**| [`chat_thread_properties_deleted`](../customer-chat-rtm-api/#chat-thread-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#chat-thread-properties-deleted) |


#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties that have been recently updated. |


### `event_properties_updated`

> **`event_properties_updated`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "2_E2WDHA8A",
	"properties": {
		"rating": {
			"comment": {
				"value": "Very good!"
			}
		}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `event_properties_updated`  |
| **Push equivalent**| [`event_properties_updated`](../customer-chat-rtm-api/#event-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#event-properties-updated) |


#### Push payload

| Object       | Notes                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated.  |


### `event_properties_deleted`

> **`event_properties_deleted`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "2_E2WDHA8A",
	"properties": {
		"rating": ["score", "comment"]
		},
		...
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `event_properties_deleted`  |
| **Push equivalent**| [`event_properties_deleted`](../customer-chat-rtm-api/#event-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#event-properties-deleted) |

#### Push payload

| Object       | Notes                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |
















## other


### `last_seen_timestamp_updated`

> **`last_seen_timestamp_updated`** sample payload

```js
{
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"timestamp": 123456789
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `last_seen_timestamp_updated`  |
| **Push equivalent**| [`last_seen_timestamp_updated`](../customer-chat-rtm-api/#last-seen-timestamp-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api/#last-seen-timestamp-updated) |
















