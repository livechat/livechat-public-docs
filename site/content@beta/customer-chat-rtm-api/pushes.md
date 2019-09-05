---
weight: 60
---

# Pushes
 
 Pushes are **server - client methods** used for keeping the application state up-to-date. They are available only in the `websocket` transport. The Agent Chat Web API uses [webhooks](../customer-chat-web-api/#webhooks). The majority of pushes have their webhook equivalents.

----------------------------------------------------------------------------------------------------------------------------------------

> **The general push format**

```json
{
	"request_id": "<request_id>", // optional, applies only to the requester
	"action": "<action>",
	"type": "push",
	"payload": {
		// optional payload
	}
}
```

|   |  |
|-------|--------| 
| **chats** | [`incoming_chat_thread`](#incoming-chat-thread) [`thread_closed`](#thread-closed) |
| **chat access** | [`access_set`](#access-set) [`chat_transferred`](#chat-transferred) |
| **chat users** |[`chat_user_added`](#chat-user-added) [`chat_user_removed`](#chat-user-removed)    | 
| **events** | [`incoming_event`](#incoming-event)  [`event_updated`](#event-updated)[`incoming_rich_message_postback`](#incoming-rich-message-postback)|
| **properties (chat/thread/event)** | [`chat_properties_updated`](#chat-properties-updated) [`chat_properties_deleted`](#chat-properties-deleted)  [`chat_thread_properties_updated`](#chat-thread-properties-updated) [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) [`event_properties_updated`](#event-properties-updated) [`event_properties_deleted`](#event-properties-deleted) |  
| **customers** | [`customer_updated`](#customer-updated) [`customer_page_updated`](#customer-page-updated)  [`customer_side_storage_updated`](#customer-side-storage-updated) | 
| **status** |  [`customer_disconnected`](#customer-disconnected) | 
| **other** |  [`incoming_typing_indicator`](#incoming-typing-indicator)   [`incoming_multicast`](#incoming-multicast) [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)| 


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
| **Webhook equivalent**| [`incoming_chat_thread`](../customer-chat-web-api/#incoming-chat-thread)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#incoming-chat-thread) |


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
| **Webhook equivalent**| [`thread_closed`](../customer-chat-web-api/#thread-closed)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#thread-closed) |

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
| **Webhook equivalent**| [`access_set`](../customer-chat-web-api/#access-set)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#access-set) |


#### Push payload

| Object     | Notes         |
| ---------- | ------------- |
| `resource` | Resource type |
| `id`       | Resource id   |


### `chat_transferred`

> **`chat_transferred`** sample payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"requester_id" : "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"type": "customer",
	"ids": ["user@example.com"]
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `chat_transferred`  |
| **Webhook equivalent**| - |


#### Push payload

| Object         | Notes                        |
| -------------- | ---------------------------- |
| `type`         | `agent` or `group`           |
| `ids`          | An array of the `group` or `agent` ids  |


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
| **Webhook equivalent**| [`chat_user_added`](../customer-chat-web-api/#chat-user-added)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-user-added) |


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
| **Webhook equivalent**| [`chat_user_removed`](../customer-chat-web-api/#chat-user-removed)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-user-removed) |


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
| **Webhook equivalent**| [`incoming_event`](../customer-chat-web-api/#incoming-event)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#incoming-event) |

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
| **Webhook equivalent**| [`event_updated`](../customer-chat-web-api/#event-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#event-updated) |





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
| **Webhook equivalent**| [`incoming_rich_message_postback`](../customer-chat-web-api/#incoming-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#incoming-rich-message-postback) |



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
| **Webhook equivalent**| [`chat_properties_updated`](../customer-chat-web-api/#chat-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-properties-updated) |


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
| **Webhook equivalent**| [`chat_properties_deleted`](../customer-chat-web-api/#chat-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-properties-deleted) |

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
| **Webhook equivalent**| [`chat_thread_properties_updated`](../customer-chat-web-api/#chat-thread-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-thread-properties-updated) |


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
| **Webhook equivalent**| [`chat_thread_properties_deleted`](../customer-chat-web-api/#chat-thread-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#chat-thread-properties-deleted) |


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
| **Webhook equivalent**| [`event_properties_updated`](../customer-chat-web-api/#event-properties-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#event-properties-updated) |


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
| **Webhook equivalent**| [`event_properties_deleted`](../customer-chat-web-api/#event-properties-deleted)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#event-properties-deleted) |

#### Push payload

| Object       | Notes                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |










## customers


### `customer_updated`

> **`customer_updated`** sample payload

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
| **Action**   | `customer_updated`  |
| **Webhook equivalent**| - |

### `customer_page_updated`

> **`customer_page_updated`** sample payload

```js
{
	"url": "https://livechatinc.com/pricing",
	"title": "pricing",
	"timestamp": 123456789
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_page_updated`  |
| **Webhook equivalent**| - |



### `customer_side_storage_updated`


> **`customer_side_storage_updated`** sample payload

```js
{
	'customer_side_storage': {
		"customer_visits": "1"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_side_storage_updated`  |
| **Webhook equivalent**| - |


#### Push payload

| Object  | Notes |
|-------|--------|
| `customer_side_storage`   |   **Map in the `key : value` format.**  Map content should be kept on the client side (e.g. in browsers local storages) and sent in [`login`](#login).   |


## status

### `customer_disconnected`

> **`customer_disconnected`** sample payload

```js
{
	"reason": "misdirected_connection",
	"data": { // optional
		"region": "fra"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_disconnected`  |
| **Webhook equivalent**| - |

#### Push payload

| Object  | Notes |
|-------|--------|
| `reason`   |      |

#### Possible reasons

| Type  | Notes |
|-------|--------|
| `access_token_expired`   |  Access token lifetime has elapsed.  |
| `connection_timeout`   |   Has not received [`ping`](#authentication)  from the client for some time, or it's been too long since the connection was authorized.   |
| `customer_banned`   |  Customer has been banned.    |
| `customer_temporarily_blocked`__*__   |  Customer tried reconnecting too many times after the `too_many_connections` error had occurred.    |
| `inactivity_timeout`   | Customer didn't chat or change the page in the past 30 minutes.    |
| `internal_error`   | Internal error     |
| `license_not_found`   | The license with the specified ID doesn't exist.     |
| `misdirected_connection` __**__   |  Customer connected to a server in the wrong region.    |
| `product_version_changed`   |   The product version has changed.   |
| `too_many_connections`   |  Customer has reached the maximum number of connections.    |
| `too_many_unauthorized_connections`   | The maximum number of unauthorized connections has been reached.     |
| `unsupported_version`   |  Connecting to an unsupported version of the Customer Chat API.    |


__*)__
The `misdirected_connection` reason can also return the correct region in an optional data object. With this piece of information, client is able to figure out where it should be connected.

__**)__
The `customer_temporarily_blocked` reason can also return the correct timeout in an optional data object. With this piece of information, client is able to figure out how much time a customer should wait before attempting to reconnect again.

## other


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
| **Webhook equivalent**| - |




### `incoming_multicast`

> **`incoming_multicast`** sample payload

```js
{
	"author_id": "agent1@example.com",
	"content": {
		"example": {
			"nested": "json"
		}
	}
}
```
#### Specifics

|  |  |
|-------|--------|
| **Action**   | `incoming_multicast`  |
| **Webhook equivalent**| - |



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
| **Webhook equivalent**| [`last_seen_timestamp_updated`](../customer-chat-web-api/#last-seen-timestamp-updated)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#last-seen-timestamp-updated) |
















