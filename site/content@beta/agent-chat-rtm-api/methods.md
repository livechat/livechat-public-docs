---
weight: 60
---


# Methods

#### The URL to send the requests to:
`wss://api.livechatinc.com/v3.0/agent/rtm/ws`

---------------------------------------------------------------


|   |  |
|-------|--------| 
| **chats** | [`activate_chat`](#activate-chat) [`follow_chat`](#follow-chat) [`get_chats_summary`](#get-chats-summary) [`start_chat`](#start-chat) [`transfer_chat`](#transfer-chat) [`unfollow_chat`](#unfollow-chat) |
| **chat access** | [`grant_access`](#grant-access) [`revoke_access`](#revoke-access) [`set_access`](#set-access)   |
| **chat users** | [`add_user_to_chat`](#add-user-to-chat) [`remove_user_from_chat`](#remove-user-from-chat) [`update_agent`](#update-agent) [`set_away_status`](#set-away-status) | 
| **customers** | [`ban_customer`](#ban-customer) [`create_customer`](#create-customer) [`get_customers`](#get-customers) [`set_customers`](#get-customers) [`update_customer`](#update-customer)| 
| **events** | [`send_event`](#send-event) |
| **login/logout** | [`login`](#login) [`logout`](#logout) |
| **properties (chat/thread/event)** | [`delete_chat_properties`](#delete-chat-properties) [`delete_chat_thread_properties`](#delete-chat-thread-properties) [`delete_event_properties`](#delete-event-properties) [`update_chat_thread_properties`](#update-chat-thread-properties) [`update_chat_properties`](#update-chat-properties) [`update_event_properties`](#update-event-properties) |  
| **thread tags** | [`tag_chat_thread`](#tag-chat-thread) [`untag_chat_thread`](#untag-chat-thread) | 
| **other** | [`get_archives`](#get-archives) [`get_chat_threads`](#get-chat-threads) [`get_chat_threads_summary`](#get-chat-threads-summary) [`close_thread`](#close-thread) [`multicast`](#multicast) [`update_last_seen_timestamp`](#update-last-seen-timestamp) [`send_typing_indicator`](#send-typing-indicator) [`send_rich_message_postback`](#send-rich-message-postback) [`change_push_notifications`](#change-push-notifications)| 


## chats

### `activate_chat`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `activate_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |

__*)__ 
When `chat.users` is defined, one of following scopes is required:

- `chats--all:rw`
- `chats--access:rw`
- `chats--my:rw`


#### Request

> A sample **request** payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"access": {
			"group_ids": [1]
		},
		"properties": {
			"source": {
				"type": "facebook"
			}
		},
		"thread": {
			"events": [{
				"type": "message",
				"custom_id": "31-0C-1C-07-DB-16",
				"text": "hello there"
			}, {
				"type": "system_message",
				"custom_id": "31-0C-1C-07-DB-16",
				"text": "hello there"
			}],
			"properties": {
				"source": {
					"type": "facebook"
				},
				...
			},
			"tags": ["bug_report"]
		}
	}
}
```

| Request object           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | Yes      | `object` |                                                                  |
| `chat.id`                | Yes      | `string` | ID of the chat will be activated                                 |
| `chat.access`            | No       | `object` | Chat access to set, defaults to all agents                       |
| `chat.properties`        | No       | `object` | Initial chat properties                                          |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                        |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                                   |

> A sample **response** payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"properties": {
			// "Properties" object
		},
		"access": {
			// "Access" object
		},
		"threads": [
			// array of "Thread" objects
		],
		"is_followed": true
	}
}
```

### `follow_chat`
Marks the chat as followed. All changes to the chat will be sent to the requester until the chat is reactivated or unfollowed. Chat members don't need to follow their chats as they should receive all chat pushes regardless of their follower status.

--------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `follow_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__
It won't be sent when the requester already follows the chat or is the chat member.

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |

#### Response

No response payload.




### `start_chat`

Starts a chat.

-------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `start_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |

__*)__ 
When `chat.users` is defined, one of following scopes is required:

- `chats--all:rw`
- `chats--access:rw`
- `chats--my:rw`

#### Request

> A sample **request** payload

```js
{
	"chat": {
		"properties": {
			"source": {
				"type": "facebook"
			},
			...
		},
		"users": [{
			"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
			"type": "customer"
		}],
		"thread": {
			"events": [{
				"type": "message",
				"custom_id": "31-0C-1C-07-DB-16",
				"text": "hello there",
				"recipients": "all"
			}, {
				"type": "system_message",
				"custom_id": "31-0C-1C-07-DB-16",
				"text": "hello there",
				"recipients": "agents"
			}],
			"properties": {
				"source": {
					"type": "facebook"
				},
				...
			},
			"tags": ["bug_report"]
		}
		"access": {
			"group_ids": [1]
		},
		"is_followed": true
	},
	"continuous": true
}
```

| Parameters           | Required | Data type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | No       | `object` |                                                                  |
| `chat.properties`        | No       | `object` |                                                                  |
| `chat.access`            | No       | `object` |                                                                  |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | List of initial chat events                                      |
| `chat.thread.properties` | No       | `object` |                                                                  |

> A sample **response** payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"thread": {
			// "Thread" object
		}
	}
}
```


### `transfer_chat`

|  |  |
|-------|--------|
| **Action**   | `transfer_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_transferred`](#chat-transferred)  |


#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"target": {
		"type":  "group"
		"ids": [1]
	},
	"force": true
}
```

| Parameter | Required | Data ype     | Notes                                                                                                                 |
| -------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `chat_id`      | Yes      | `string` | id of resource                                                               |
| `target`       | No       | `object` | If missing, chat will be transferred within current group                    |
| `target.type`  | Yes      | `string` | `group` or `agent`                                                           |
| `target.ids`   | Yes      | `array`  | `group` or `agent` ids array                                                 |
| `force`        | No       | `bool`   | If `true`, always transfers chat, otherwise fails when cannot assign any agent from requested groups, default `false` |


#### Response

No response payload.


### `unfollow_chat`
Removes the requester from the chat followers. After that, only key changes to the chat (like `transfer_chat` or `close_active_thread`) will be sent to the requester. Chat members cannot unfollow the chat.

--------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `unfollow_chat`  |
| __Required scopes__| - |
| **Web API equivalent**| ✓ |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |

#### Response

No response payload.



## chat access

### `grant_access`

|  |  |
|-------|--------|
| **Action**   | `grant_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`access_granted`](#access-granted)|

#### Request

> A sample **request** payload

```js
{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

| Parameter | Required | Data ype     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

#### Response

No response payload.


### `revoke_access`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `revoke_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`access_revoked`](#access-revoked)|

#### Request

> A sample **request** payload

```js
{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

| Parameter | Required | Data type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

#### Response

No response payload.


### `set_access`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `set_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`access_set`](#access-set)|


#### Request

> A sample **request** payload

```js
{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

| Request object | Required | Type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | resource id          |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

#### Response

No response payload.


## chat users

### `add_user_to_chat`

Adds user to chat. Is't forbidden to add more than one `customer` user type to chat.

------------------------------------------------------------------------------------------

|  |  |
|-------|--------|
| **Action**   | `activate_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_user_added`](#chat_user_added) |

#### Request

> A sample request payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | Possible values: `agent` or `customer` |


#### Response

No response payload.

### `update_agent`

Updates agent properties.

-----------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_agent`  |
| __Required scopes__| `agents--my:rw` `agents--all:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`agent_updated`](#agent-updated)|

#### Request

> A sample **request** payload

```js
{
	"routing_status": "accepting_chats"
}
```

| Parameter  | Required | Data type     | Notes                                                     |
| ---------------- | -------- | -------- | --------------------------------------------------------- |
| `agent_id`       | No       | `string` | The current agent is used by default.                     |
| `routing_status` | No       | `string` | Possible values: `accepting_chats`, `not_accepting_chats` |

#### Response

No response payload.

### `remove_user_from_chat`

Removes user from chat. Removing `customer` user type is forbidden. It's always possible to remove the requester from chat.

------------------------------------------------------------------------------------------

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `remove_user_from_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_user_added`](#chat_user_added) |

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

**Request payload**

| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | possible values are `agent` or `customer` |

#### Response

No response payload.


### `set_away_status`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `set_away_status`  |
| __Required scopes__| `agents--my:rw`|
| **Web API equivalent**| - |

#### Request

> A sample **request** payload

```js
{
	"away": true
}
```

| Request object | Required | Type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `away`		 | Yes      | `bool`   |  				      |

#### Response

No response payload.







## customers

### `ban_customer`

Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

------------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `ban_customer`  |
| __Required scopes__| `customers.ban:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`customer_banned`](#customer-banned) |

#### Request

> A sample **request** payload

```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"ban": {
		"days": 5
	}
}
```

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `customer_id`  | Yes      | `string` |       |
| `ban`          | Yes      | `object` |       |
| `ban.days`     | Yes      | `number` |       |

#### Response

No response payload.


### `create_customer`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `create_customer`  |
| __Required scopes__| `customers:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`customer_created`](#customer-created) |

#### Request

> A sample **request** payload

```js
{
	"email": "customer1@example.com",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"some_key": "some_value"
	}
}
```

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |

> A sample **response** payload

```js
{
  // "User > Customer" object
}
```

### `get_customers`

It returns customers list.

---------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_customers`  |
| __Required scopes__| `customers:ro`|
| **Web API equivalent**| ✓ |

#### Request

> A sample **request** payload

```js
{
	"filters": {
		"country": {
			"values": ["United States", "Poland"]
		},
		"visits_count": {
			"gte": 20
		},
		"created_at": {
			"gte": "2017-10-12T15:19:21.010200+01:00"
		}
	},
	"page_id": "MTUxNzM5ODEzMTQ5Ng=="
}
```
> A sample **response** payload

```js
{
	"customers": [
		// array of "User > Customer" objects
	],
	"total_customers": 2340,
	"next_page_id": "MTUxNzM5ODEzMTQ5Ng==", // optional
	"previous_page_id": "MTUxNzM5ODEzMTQ5Ng==" // optional
}
```

All parameters are optional.

| Parameter                                                              | Data type| Notes                         |
| ---------------------------------------------------------------------- | -------- | ----------------------------- |
| `page_id`                                                              | `string` |                               |
| `limit`                                                                | `number` | Default: 10, Maximum: 100    |
| `order` __*__                                                          | `string` | Default: `desc`               |
| `filters`                                                              | `object` |                               |
| `filters.country.<string_filter_type>` __**__                          | `object` |                               |
| `filters.email.<string_filter_type>` __**__                            | `object` |                               |
| `filters.name.<string_filter_type>`    __**__                          | `object` |                               |
| `filters.customer_id.<string_filter_type>`  __**__                     | `object` |                               |
| `filters.chats_count.<range_filter_type>`  __***__                     | `object` |                               |
| `filters.threads_count.<range_filter_type>`   __***__                  | `object` |                               |
| `filters.visits_count.<range_filter_type>`   __***__                   | `object` |                               |
| `filters.created_at.<date_range_filter_type>`__****__                  | `object` |                               |
| `filters.agent_last_event_created_at.<date_range_filter_type>`   __****__  | `object` |                           |
| `filters.customer_last_event_created_at.<date_range_filter_type>`  __****__| `object` |                           |



__*)__ 

`order` can take the following values:

  - `asc` - oldest customers first
  - `desc` - newest customers first 

----------------------------------------------------------------

__**)__  

`<string_filter_type>` can take the following values :

  - `values` (`string[]` - an array of strings)
  - `exclude_values` (`string[]` - an array of strings)

  There's only one value allowed for a single filter.

----------------------------------------------------------------------  

__***)__  

`<range_filter_type>` can take the following values:

  - `lte` (`int` - less than or equal to given value)
  - `lt` (`int` - less than given value)
  - `gte` (`int` - greater than or equal to given value)
  - `gt` (`int` - greater than given value)
  - `eq` (`int` - equal to given value)

------------------------------------------------------------------------

__****)__ 

`<date_range_filter_type>` can take the following values:

  - `lte` ( `string` - less than or equal to given value)
  - `lt` (`string` - less than given value)
  - `gte` (`string` - greater than or equal to given value)
  - `gt` (`string` - greater than given value)
  - `eq` (`string` - equal to given value)

Dates are represented in ISO 8601 format with microseconds resolution, e.g. `2017-10-12T15:19:21.010200+01:00` in specific timezone or `2017-10-12T14:19:21.010200Z` in UTC.

------------------------------------------------------------------------------------------------


### `update_customer`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_customer`  |
| __Required scopes__| `customers:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`customer_updated`](#customer-updated) |

#### Request

> A sample **request** payload

```js
{
	"customer_id": "d4efab70-984f-40ee-aa09-c9cc3c4b0882",
	"name": "John Doe",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"score": "low"
	}
}
```

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `customer_id`  | Yes      | `string` | UUID v4 format is required     |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |

> A sample **response** payload

```js
{
  // "User > Customer" object
}
```

## events

### `send_event`

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_event`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_event`](#incoming-event ) or [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__ The `incoming_chat_thread` push will be sent instead of `incoming_event `only if the event starts a new thread.

<!-- 
v3.1
|  |  |
|-------|--------|
| **Action**   | `send_event`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| ✓ |
 -->

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"attach_to_last_thread": false,
	"event": {
		"type": "message",
		"text": "hello world",
		"recipients": "agents",
		"custom_id": "31-0C-1C-07-DB-16",
	}
}
```

| Parameters         | Required | Data type     | Notes                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |


> A sample **response** payload

```js
{
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

## login/logout

### `login`
It returns current agent's initial state.

------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `login`  |
| **Required scopes** | - |
| **Web API equivalent**| -|

> A sample **request** payload

```js
{
	"push_notifications": {
		"firebase_token": "JDa8813Ka92mmKda00dsdkAKDA0",
		"platform": "ios"
	},
	"application": {
		"name": "SmartClient - Chrome",
		"version": "4.1.2.1231 (57.0.2987.133)"
	}
}
```

#### Request


| Parameter                     | Required | Data type     | Notes                                                                                                                       |
| ----------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `token`                             | Yes      | `string` | SSO Token                                                      |
| `timezone`                          | No       | `string` |                                                               |
| `reconnect`                         | No       | `bool`   | Reconnecting sets status to last known state instead of default   |
| `push_notifications`                | No       | `object` |                                                                        |
| `push_notifications.firebase_token` | No       | `string` | Firebase device token to allow connecting this instance with existing push notification instance (to be seen as 1 instance) |
| `push_notifications.platform`       | Yes      | `string` | OS platform; possible values:`ios`, `android`                            |
| `application`                       | No       | `object` |                                                                        |
| `application.name`                  | No       | `string` | Application name                                                       |
| `application.version`               | No       | `string` | Application version                                                       |




> A sample **response** payload

```js
{
	"license": {
		"id": "104130623",
		"plan": "enterprise",
		"expiration_timestamp": 1483433500,
		"creation_timestamp": 1482433500,
		"in_trial": true,
		"website_last_activity": "2018-01-05" // optional
	},
	"my_profile": {
		// "User > My profile" object
	},
	"chats_summary": [{
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"last_event_per_type": { // the last event of each type in chat
			"message": {
				"thread_id": "K600PKZON8",
				"thread_order": 343544565,
				"event": {
					// "restricted_access": true
					// or
					// Event > Message object
				}
			},
			"system_message": {
				"thread_id": "K600PKZON8",
				"thread_order": 343544565,
				"event": {
					// "restricted_access": true
					// or
					// Event > System Message object
				}
			},
			...
		},
		"last_thread_summary": {
			"id": "K600PKZON8",
			"timestamp": 1473433500,
			"user_ids": ["agent1@example.com"],
			"order": 12417249812721,
			"properties": {
				"routing": {
					"idle": {
						"value": false
					},
					"unassigned": {
						"value": false
					}
				},
				...
			}
		},
		"properties": {
			"routing": {
				"idle": {
					"value": false
				},
				"unassigned": {
					"value": false
				}
			},
			...
		},
		"access": {
			// "Access" object
		}
	}]
}
```


#### Response

| Parameter                     | Req./Optional | Data type     | Notes                                                       |
| ----------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `access`                             | optional      | ? | -                                                      |
| `properties`                          | optional       | ? |         -                                                      |



### `logout`

logs out the agent

------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `logout`  |
| **Required scopes** | - |
| **Web API equivalent**| -|

#### Request

No request payload.

#### Response

No response payload.


## properties (chat/thread/event)

### `delete_chat_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_properties_deleted`](#chat-properties-deleted) |


#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": ["score", "comment"],
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for |
| `properties`   | Yes      | `object` | Chat properties to delete                          |

#### Response

No response payload.


### `delete_chat_thread_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": ["score", "comment"],
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `properties`   | Yes      | `object` | Chat thread properties to delete                     |

#### Response

No response payload.


### `delete_event_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`event_properties_deleted`](#event-properties-deleted) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "2_EW2WQSA8",
	"properties": {
		"rating": ["score", "comment"],
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `event_id`     | Yes      | `string` | Id of the event that we want to delete property for  |
| `properties`   | Yes      | `object` | Event properties to delete                           |

#### Response

No response payload.


### `update_chat_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_properties_updated`](#chat-properties-updated) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a property for.|
| `properties`   | Yes      | `object` | Chat properties to set                          |

#### Response

No response payload.


### `update_chat_thread_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you want to set properties for|
| `thread_id`    | Yes      | `string` | The id of the thread that you want to set properties for |
| `properties`   | Yes      | `object` | Chat properties to set                            |

#### Response

No response payload.


### `update_event_properties`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`event_properties_updated`](#event-properties-updated) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "2_EW2WQSA8",
	"properties": {
		"rating": {
			"score": 1,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to set properties for. |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to set properties for.|
| `event_id`     | Yes      | `string` | Id of the event that you want to set properties for. |
| `properties`   | Yes      | `object` | Chat properties to set                            |

#### Response

No response payload.



## thread tags

### `tag_chat_thread`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `tag_chat_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_thread_tagged`](#chat-thread-tagged) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to add a tag to   		  |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to add a tag to 	 	  |
| `tag`    		 | Yes      | `string` | Tag name											  |


#### Response

No response payload.


### `untag_chat_thread	`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `untag_chat_thread	`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`chat_thread_untagged`](#chat-thread-untagged) |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to remove the tag from   |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to remove the tag from |
| `tag`    		 | Yes      | `string` | Tag name											  |


#### Response

No response payload.


## other

### `get_archives`

It returns the active threads the current agent has access to.

------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_archives`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **Web API equivalent**| ✓ |

> A sample **request** payload

```js
{
	"filters": {
		"query": "search keyword",
		"agent_ids": ["agent1@example.com"],
		"date_from": "2016-09-01",
		"date_to": "2016-10-01",
		"properties": {
			"rating": {
				"score": {
					"values": [1]
				}
			},
			"rating": {
				"comment": {
					"exists": true
				}
			}
		}
	},
	"pagination": {
		"page": 1,
		"limit": 25
	}
}
```

#### Request 

| Parameter                                        | Required | Data type     | Notes                               |
| ----------------------------------------------------- | -------- | -------- | ----------------------------------- |
| `filters`                                             | No       | `object` |                                     |
| `filters.query`                                       | No       | `string` |                                     |
| `filters.date_from`                                   | No       | `string` | `YYYY-MM-DD` format                 |
| `filters.date_to`                                     | No       | `string` | `YYYY-MM-DD` format                 |
| `filters.agent_ids`                                   | No       | `array`  | Array of agent IDs                  |
| `filters.group_ids`                                   | No       | `array`  | Array of group IDs                  |
| `filters.properties.<namespace>.<name>.<filter_type>` | No       | `any`    |                                     |
| `<filter_type>`									    | No       | `any`    |  __*__                              |
| `pagination`                                          | No       | `object` |                                     |
| `pagination.page`                                     | No       | `number` | Default is 1, min is 1, max is 1000 |
| `pagination.limit`                                    | No       | `number` | Default is 25, min is 0, max is 100 |

> A sample **response** payload

```js
{
	"chats": [{
		"chat": {
			"id": "PJ0MRSHTDG",
			"users": [
				// array of "User" objects
			],
			"thread": {
				// "Thread" object
			}
		}
	}],
	"pagination": {
		"page": 1,
		"total": 3 // this is total number of threads matching filters
	}
}
```
__*)__
`<filter_type>` can take the following values:

  - `exists` (`bool`)
  - `values` (`type[]` - an array with aspecific type for property: `string`, `int` or `bool`)
  - `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

There's only one value allowed for a single property.

### `get_chat_threads`

It returns threads that the current agent has access to in a given chat.

--------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chat_threads`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro`|
| **Web API equivalent**| ✓ |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_ids": ["K600PKZON8"]
}
```

| Parameter | Required | Data ype     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`   | No       | `array`  |       |


> A sample **response** payload

```js
{
	"chat": {
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"threads": [ // optional
			// "Thread" object
		],
		"threads_summary": [{
				"thread_id": "K600PKZON8",
				"order": 129846129847
			},
			{
				"thread_id": "K600PKZON8",
				"order": 129846129848
			}
		],
		"properites": {
			// "Properites" object
		},
		"access": {
			// "Access" object
		}
	}
}
```

### `get_chat_threads_summary`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chat_threads_summary`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **Web API equivalent**| ✓ |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"limit": 25,
	"page_id": "MjpkZXNj"
}
```

| Parameter | Required | Data ype     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `order`      | No      | `string` | Possible values: `asc` - oldest chats first and `desc` - newest chats first (default)|
| `limit`      | No      | `number` | Defaul: 10, maximum: 100      |
| `page_id`   | No       | `string`  |       |

#### Response

> A sample **response** payload

```js 
{
	"threads_summary": [
            {
                "id": "PT039ES4OG",
                "order": 2,
                "events_count": 2
            },
            {
                "id": "PT039DS6IP",
                "order": 1,
                "events_count": 17
            }
        ],
        "found_threads": 7,
        "next_page_id": "MTUxNzM5ODEzMTQ5Ng==", // optional
        "previous_page_id": "MTUxNzM5ODEzMTQ5Nw==" // optional
}
```
| Parameter  | Data type     | Notes |
| -------------- | -------- | ----- |
| `found_threads`   | `string` | Number of threads in a chat    |


### `send_rich_message_postback`

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_rich_message_postback`  |
| __Required scopes__| `chats.conversation--my:rw` `chats.conversation--all:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

__*)__  `incoming_rich_message_postback` will be sent only for active threads.

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "action_yes",
		"toggled": true
	}
}
```

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `chat_id`       | Yes      | `string` |                              |
| `event_id`      | Yes      | `string`    | 				     		   |
| `postback`      | Yes       | `object` | 							   |
| `postback.id  ` | Yes       | `string` | Postback name of the button |
| `postback.toggled`| Yes     | `bool`   | Postback toggled true/false |
| `thread_id`     | Yes       | `string` | 						       |

#### Response

No response payload.

### `multicast`

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `multicast`  |
| __Required scopes__| `multicast:rw` |
| **Web API equivalent**| ✓ |
| **Push message**| [`incoming_multicast`](#incoming-multicast)|

#### Request

> A sample **request** payload

```js
{
	"scopes": {
		"agents": {
			"all": true,
			"ids": ["agent1@example.com", "agent2@example.com"],
			"groups": [1, 2]
		},
		"customers": {
			"ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
		}
	},
	"content": {
		"example": {
			"nested": "json"
		}
	},
	"type": "type1"
}
```

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `scopes`       | Yes      | `object` | __*__                     |
| `content`      | Yes      | `any`    | JSON message to be sent   |
| `type`         | No       | `string` | Type of multicast message |


__*)__ `scopes` can take the following values:

  - `agents`:

     - `all` (`bool` - includes all agents)
     - `ids` (`[]string` - an array of agents' ids) 
	 - `groups` (`[]string` - an array of groups' ids)

  - `customers`: 
   	- `ids` (`[]string` - an array of customer's ids)

At least one `scopes` type (`agents.all`, `agents.ids`, `agents.groups`, `customers.ids`) is required.

#### Response

No response payload.


### `send_typing_indicator`

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_typing_indicator`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| ✓ |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"recipients": "all",
	"is_typing": true
}
```

| Parameter | Required | Data type     | Notes                                                       |
| -------------- | -------- | -------- | ----------------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to send the typing indicator to |
| `recipients`   | No       | `string` | `all` (default), `agents`                                   |
| `is_typing`    | Yes      | `bool`   | Bool                                                        |

#### Response

No response payload.


### `close_thread`

Closes the thread. Nobody will be able to send any messages to this thread anymore.

------------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `close_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| ✓ |
| **Push message**| [`thread_closed`](#thread-closed)  |

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |

#### Response

No response payload.



### `change_push_notifications`

Change firebase push notifications properties.

-----------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `change_push_notifications`  |
| __Required scopes__| - |
| **Web API equivalent**| - |

#### Request

> A sample **request** payload

```js
{
	"firebase_token": "8daDAD9dada8ja1JADA11",
	"platform": "ios",
	"enabled": true
}
```

| Parameter  | Required | Data type   | Notes                                                    |
| ---------------- | -------- | ------ | -------------------------------------------------------- |
| `firebase_token` | Yes      | string | Firebase device token                                    |
| `platform`       | Yes      | string | OS platform, possible values:  `ios`, `android`          |
| `enabled`        | Yes      | bool   | Enable or disable push notifications for requested token |

#### Response

No response payload.



### `update_last_seen_timestamp`

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_last_seen_timestamp`  |
| __Required scopes__| `chats--access:ro` `chats--all:ro`|
| **Web API equivalent**| ✓ |
| **Push message**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"timestamp": 123456789
}
```

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `timestamp`    | No       | `number` |       |



> A sample **response** payload

```js
{
	"timestamp": 123456789
}
```












