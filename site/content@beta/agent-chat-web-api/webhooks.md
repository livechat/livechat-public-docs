---
weight: 70
---

# Webhooks

Webhooks notify you when specific events are triggered. Webhook equivalents in Agent Chat RTM API are [pushes](../agent-chat-rtm-api/#pushes).

----------------------------------------------------------------------------------------------------------------------------------------

|   |  |
|-------|--------| 
| **chat access** | [`access_granted`](#access-granted) [`access_revoked`](#access-revoked) [`access_set`](#access-set)  |
| **chat users** |[`chat_user_removed`](#chat-user-removed) [`chat_user_added`](#chat-user-added)   | 
| **customers** | [`customer_created`](#customer-created)| 
| **events** | [`event_updated`](#event-updated) [`incoming_event`](#incoming-event) |
| **properties (chat/thread/event)** | [`event_properties_updated`](#event-properties-updated) [`event_properties_deleted`](#event-properties-deleted) [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) [`chat_thread_properties_updated`](#chat-thread-properties-updated) [`chat_properties_deleted`](#chat-properties-deleted) [`chat_properties_updated`](#chat-properties-updated) |  
| **thread tags** | [`chat_thread_tagged`](#chat-thread-tagged) [`chat_thread_untagged`](#chat-thread-untagged) | 
| **other** | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated) [`thread_closed`](#thread-closed) [`incoming_rich_message_postback`](#incoming-rich-message-postback) [`incoming_chat_thread`](#incoming-chat-thread)| 


## chat access

### `access_granted`

> **`access_granted`** sample payload

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
| **Action**   | `access_granted`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#access-granted) |


#### Webhook payload

| Object     | Notes         |
| ---------- | ------------- |
| `resource` | Resource type |
| `id`       | Resource id   |



### `access_revoked`

> **`access_revoked`** sample payload

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
| **Action**   | `access_revoked`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#access-revoked) |


#### Webhook payload

| Object     | Notes         |
| ---------- | ------------- |
| `resource` | Resource type |
| `id`       | Resource id   |



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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#access-set) |


#### Webhook payload

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
	"user_type": "agent"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_user_added`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-user-added) |


#### Webhook payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | possible values: `agent`, `customer`    |



### `chat_user_removed`

> **`chat_user_removed`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_user_removed`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-user-removed) |


#### Webhook payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | possible values: `agent`, `customer` |

## customers

### `customer_created`

> **`customer_created`** sample payload

```js
{
	"customer": {
		// "User > Customer" object
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_created`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#customer-created) |


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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#incoming-event) |


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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#event-updated) |



## properties (chat/thread/event)

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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-properties-deleted) |

#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated. |



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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-thread-properties-deleted) |


#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated. |



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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#event-properties-deleted) |

#### Webhook payload

| Object       | Notes                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated. |

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
				"value": "Very good, veeeery good"
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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-properties-updated) |


#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated. |




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
				"value": "Very good, veeeery good"
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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-thread-properties-updated) |


#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated.  |



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
				"value": "goooood"
			}
		}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `event_properties_updated`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#event-properties-updated) |


#### Webhook payload

| Object       | Notes                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This Webhook shows only the properties, which have been recently updated.  |



## thread tags

### `chat_thread_tagged`

> **`chat_thread_tagged`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_thread_tagged`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-thread-tagged) |


### `chat_thread_untagged`

> **`chat_thread_tagged`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_thread_untagged`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#chat-thread-tagged) |


## other

### `incoming_chat_thread`

> **`incoming_chat_thread`** sample payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"properties": {
			"source": {
				"type": "facebook"
			},
			...
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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#incoming-chat-thread) |


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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#incoming-rich-message-postback) |



### `incoming_multicast`

> **`incoming_multicast`** sample payload

```js
{
	"author_id": "agent1@example.com",
	"content": {
		"example": {
			"nested": "json"
		}
	},
	"type": "type1"
}
```
#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_multicast`  |
| **Push equivalent**| - |

#### Webhook payload

| Object  | Required |
|-------|--------|
| `author_id`   |   No   |
| `content` |   Yes   |
| `type`      | No       | 


### `incoming_typing_indicator`

> **`incoming_typing_indicator`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"typing_indicator": {
		// "Typing indicator" object
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_typing_indicator`  |
| **Push equivalent**| - |



### `incoming_sneak_peek`

> **`incoming_sneak_peek`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"sneak_peek": {
		// "Sneak peek" object
	}
}
```
#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_sneak_peek`  |
| **Push equivalent**| - |




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
| **Push equivalent**| [✓](../agent-chat-rtm-api/#thread-closed) |

#### Webhook payload

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `user_id`   | Missing if thread was closed by router |



### `last_seen_timestamp_updated`

> **`last_seen_timestamp_updated`** sample payload

```js
{
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"timestamp": 123456789
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `last_seen_timestamp_updated`  |
| **Push equivalent**| [✓](../agent-chat-rtm-api/#last-seen-timestamp-updated) |
























