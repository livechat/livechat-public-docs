---
weight: 70
---

# Pushes
 
 Pushes are **server - client methods** used for keeping the application state up-to-date. They are available only in the `websocket` transport. The Agent Chat Web API uses [webhooks](../agent-chat-web-api/#webhooks). The majority of pushes have their webhook equivalents.

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
| **chat access** | [`access_granted`](#access-granted) [`access_revoked`](#access-revoked) [`access_set`](#access-set) [`chat_transferred`](#chat-transferred) |
| **chat users** |[`chat_user_added`](#chat-user-added) [`chat_user_removed`](#chat-user-removed)    | 
| **events** | [`incoming_event`](#incoming-event)  [`event_updated`](#event-updated)[`incoming_rich_message_postback`](#incoming-rich-message-postback)|
| **properties (chat/thread/event)** | [`chat_properties_updated`](#chat-properties-updated) [`chat_properties_deleted`](#chat-properties-deleted)  [`chat_thread_properties_updated`](#chat-thread-properties-updated) [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) [`event_properties_updated`](#event-properties-updated) [`event_properties_deleted`](#event-properties-deleted) |  
| **thread tags** | [`chat_thread_tagged`](#chat-thread-tagged) [`chat_thread_untagged`](#chat-thread-untagged) | 
| **customers** | [`customer_visit_started`](#customer-visit-started) [`customer_created`](#customer-created) [`customer_updated`](#customer-updated) [`customer_page_updated`](#customer-page-updated)    [`customer_banned`](#customer-banned) [`customer_visit_ended`](#customer-visit-ended) | 
| **status** | [`agent_updated`](#agent-updated) [`agent_disconnected`](#agent-disconnected)  | 
| **other** | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)  [`incoming_sneak_peek`](#incoming-sneak-peek) [`incoming_typing_indicator`](#incoming-typing-indicator)   [`incoming_multicast`](#incoming-multicast)| 


## chats

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
| **Webhook equivalent**| [`incoming_chat_thread`](../agent-chat-web-api/#incoming-chat-thread)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#incoming-chat-thread) |


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
| **Webhook equivalent**| [`thread_closed`](../agent-chat-web-api/#thread-closed)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#thread-closed) |

#### Push payload

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `user_id`   | Missing if thread was closed by router |


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
| **Webhook equivalent**| [`access_granted`](../agent-chat-web-api/#access-granted)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#access-granted) |


#### Push payload

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
| **Webhook equivalent**| [`access_revoked`](../agent-chat-web-api/#access-revoked)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#access-revoked) |


#### Push payload

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
| **Webhook equivalent**| [`access_set`](../agent-chat-web-api/#access-set)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#access-set) |


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
	"requester_id" : "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"type": "agent",
	"ids": ["agent1@example.com"]
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
| `ids`          | `group` or `agent` ids array |


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
| **Webhook equivalent**| [`chat_user_added`](../agent-chat-web-api/#chat-user-added)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-user-added) |


#### Push payload

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
| **Webhook equivalent**| [`chat_user_removed`](../agent-chat-web-api/#chat-user-removed)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-user-removed) |


#### Push payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | possible values: `agent`, `customer` |











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
| **Webhook equivalent**| [`incoming_event`](../agent-chat-web-api/#incoming-event)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#incoming-event) |

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
| **Webhook equivalent**| [`event_updated`](../agent-chat-web-api/#event-updated)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#event-updated) |





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
| **Webhook equivalent**| [`incoming_rich_message_postback`](../agent-chat-web-api/#incoming-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#incoming-rich-message-postback) |



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
| **Webhook equivalent**| [`chat_properties_updated`](../agent-chat-web-api/#chat-properties-updated)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-properties-updated) |


#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |




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
| **Webhook equivalent**| [`chat_properties_deleted`](../agent-chat-web-api/#chat-properties-deleted)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-properties-deleted) |

#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |






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
| **Webhook equivalent**| [`chat_thread_properties_updated`](../agent-chat-web-api/#chat-thread-properties-updated)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-thread-properties-updated) |


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
| **Webhook equivalent**| [`chat_thread_properties_deleted`](../agent-chat-web-api/#chat-thread-properties-deleted)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-thread-properties-deleted) |


#### Push payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |


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
| **Webhook equivalent**| [`event_properties_updated`](../agent-chat-web-api/#event-properties-updated)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#event-properties-updated) |


#### Push payload

| Object       | Notes                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated.  |


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
| **Webhook equivalent**| [`event_properties_deleted`](../agent-chat-web-api/#event-properties-deleted)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#event-properties-deleted) |

#### Push payload

| Object       | Notes                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `properties` | This is not a full `properties` object. This push shows only the properties, which have been recently updated. |





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
| **Webhook equivalent**| [`chat_thread_tagged`](../agent-chat-web-api/#chat-thread-tagged)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-thread-tagged) |


### `chat_thread_untagged`

> **`chat_thread_untagged`** sample payload

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
| **Webhook equivalent**| [`chat_thread_untagged`](../agent-chat-web-api/#chat-thread-untagged)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#chat-thread-untagged) |


## customers


### `customer_visit_started`

> **`customer_visit_started`** sample payload

```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"visit_id": 42,
	"started_at": "2017-10-12T15:19:21.010200Z",
	"ip": "194.181.146.130",
	"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
	"geolocation": {
		"latitude": "51.0805",
		"longitude": "17.0211",
		"country": "Poland",
		"country_code": "PL",
		"region": "Dolnoslaskie",
		"city": "Wroclaw",
		"timezone": "Europe/Warsaw"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_visit_started`  |
| **Webhook equivalent**| - |

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
| **Webhook equivalent**| [`customer_created`](../agent-chat-web-api/#customer-created)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#customer-created) |


### `customer_updated`

> **`customer_updated`** sample payload

```js
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"name": "John Doe",
	"email": "john@doe.me",
	"avatar": "https://domain.com/avatars/1.jpg",
	"type": "customer",
	"present": false,
	"banned": false,
	"fields": {
		"custom field name": "custom field value"
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
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"visit_id": 42,
	"opened_at": "2017-10-12T15:19:21.010200Z",
	"url": "https://www.livechatinc.com/",
	"title": "LiveChat - Homepage",
	"referrer": "http://www.google.com/"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_page_updated`  |
| **Webhook equivalent**| - |





### `customer_banned`

> **`customer_banned`** sample payload

```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"ban": {
		"days": 5
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_banned`  |
| **Webhook equivalent**| - |


### `customer_visit_ended`

> **`customer_visit_ended`** sample payload

```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"visit_id": 42,
	"ended_at": "2017-10-12T15:19:21.010200Z"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `customer_visit_ended`  |
| **Webhook equivalent**| - |






## status

### `agent_updated`

> **`agent_updated`** sample payload

```js
{
	"agent_id": "agent1@example.com",
	"routing_status": "accepting_chats"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `agent_updated`  |
| **Webhook equivalent**| - |




### `agent_disconnected`

> **`agent_disconnected`** sample payload

```js
{
	"reason": "misdirected_request",
	"data": { // optional
		"region": "fra"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `agent_disconnected`  |
| **Webhook equivalent**| - |


#### Possible reasons

| Type                           | Notes                                          |
| ------------------------------ | ---------------------------------------------- |
| `access_token_revoked`         | Agent access token has been revoked            |
| `access_token_expired`         | Access token life time has elapsed             |
| `license_expired`              | License has expired                            |
| `agent_deleted`                | Agent account has ben deleted                  |
| `agent_logged_out_remotely`    | Agent has been logged out remotely             |
| `agent_disconnected_by_server` | Agent has been disconnected by server          |
| `unsupported_version`          | Connecting to unsupported version of Agent API |
| `ping_timeout`                 | Not receiving ping for some time from customer |
| `internal_error`               | Internal error                                 |
| `too_many_connections`         | Agent reached max number of connections        |
| `misdirected_request` __*__    | Agent connected to server in wrong region      |
| `product_version_changed`      | Product version has been changed               |
| `license_not_found`            | License with specified ID doesn't exist        |

__*)__
Also, `misdirected_request` returns the correct `region` value in the optional `data` object.
With this piece of information, the client is able to figure out where it should be connected.


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
| **Webhook equivalent**| - |








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
| **Webhook equivalent**| [`last_seen_timestamp_updated`](../agent-chat-web-api/#last-seen-timestamp-updated)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#last-seen-timestamp-updated) |


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
| **Webhook equivalent**| - |

#### Push payload

| Object  | Required |
|-------|--------|
| `author_id`   |   No   |
| `content` |   Yes   |
| `type`      | No       | 



















