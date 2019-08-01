---
weight: 60
---


# Methods

#### The base URL to send the requests to

| HTTP method  | Base URL |
|-------|--------|
| `POST`|`https://api.livechatinc.com/v3.0/agent/action/<action>`   |


#### Required headers

| Header   |      Value      |  Notes |
|----------|:-------------:|------:|
| `Content-Type`	 |  `multipart/form-data; boundary=<boundary>`  | Valid for `send_file` and `upload_image` Method URL |
| `Content-Type` |  `application/json`	    |   Valid for every Method URL except `send_file `and `upload_image` |
| `Authorization` |  `Bearer <token>`	    |   Access token |

---------------------------------------------------------------


|   |  |
|-------|--------| 
| **chats** | [`activate_chat`](#activate-chat) [`follow_chat`](#follow-chat) [`get_chats_summary`](#get-chats-summary) [`start_chat`](#start-chat) [`transfer_chat`](#transfer-chat) [`unfollow_chat`](#unfollow-chat) |
| **chat access** | [`grant_access`](#grant-access) [`revoke_access`](#revoke-access) [`set_access`](#set-access)   |
| **chat users** | [`add_user_to_chat`](#add-user-to-chat) [`remove_user_from_chat`](#remove-user-from-chat) [`update_agent`](#update-agent)| 
| **customers** | [`ban_customer`](#ban-customer) [`create_customer`](#create-customer) [`get_customers`](#get-customers) [`set_customers`](#get-customers) [`update_customer`](#update-customer)| 
| **events** | [`send_event`](#send-event) |
| **properties (chat/thread/event)** | [`delete_chat_properties`](#delete-chat-properties) [`delete_chat_thread_properties`](#delete-chat-thread-properties) [`delete_event_properties`](#delete-event-properties) [`update_chat_thread_properties`](#update-chat-thread-properties) [`update_chat_properties`](#update-chat-properties) [`update_event_properties`](#update-event-properties) |  
| **thread tags** | [`tag_chat_thread`](#tag-chat-thread) [`untag_chat_thread`](#untag-chat-thread) | 
| **other** | [`get_archives`](#get-archives) [`get_chat_threads`](#get-chat-threads) [`send_file`](#send-file) [`get_chat_threads_summary`](#get-chat-threads-summary) [`close_thread`](#close-thread) [`upload_image`](#upload-image) [`multicast`](#multicast) [`update_last_seen_timestamp`](#update-last-seen-timestamp) [`send_typing_indicator`](#send-typing-indicator) [`send_rich_message_postback`](#send-rich-message-postback)| 



## `get_chat_threads`

It returns threads that the current agent has access to in a given chat.

--------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_chat_threads`  |
| **Method URL**   | `get_chat_threads`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro`|
| **RTM API equivalent**| ✓ |

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

## `get_chat_threads_summary`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_chat_threads_summary`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **RTM API equivalent**| ✓ |

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


## `start_chat`

Starts a chat.

-------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/start_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |

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

> A sample **request** payload**

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
			}
		}
		"access": {
			"group_ids": [1]
		}
	}
}
```

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

## `activate_chat`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/activate_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |

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

| Parameter           | Required | Data type     | Notes                                                            |
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


## `add_user_to_chat`

Adds user to chat. Is't forbidden to add more than one `customer` user type to chat.

------------------------------------------------------------------------------------------

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/add_user_to_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_user_added`](#chat_user_added) |

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

## `remove_user_from_chat`

Removes user from chat. Removing `customer` user type is forbidden. It's always possible to remove the requester from chat.

------------------------------------------------------------------------------------------

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/remove_user_from_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_user_added`](#chat_user_added) |

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


## `send_event`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_event`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_event`](#incoming-event ) or [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__ The `incoming_chat_thread` push will be sent instead of `incoming_event `only if the event starts a new thread.

<!-- 
v3.1
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_event`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| ✓ |
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

## `send_file`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_file`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| - |
| **Webhook**|[incoming_chat_thread](#incoming-chat-thread) or [`incoming_event`](#incoming-event )__*__ |

__*)__
The `incoming_chat_thread` RTMhook will be sent instead of `incoming_event` only if the event starts a new thread.

<!-- 
v3.1
#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_file`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| - |
 -->

#### Request

> A sample **request** payload

```
	payload.chat_id=a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5
	payload.custom_id=12345-bhdsa
	payload.file=test.png
```

| Parameter				 | 		Required | Data type| Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `payload`        				  | Yes  | `object` |                              |
| `payload.chat_id`				  | Yes  | `string` | The id of the chat that you want to send the file to			   |
| `payload.require_active_thread` | No   | `bool` | If `true`, returns error when all threads are inactive; default: `false` |
| `payload.custom_id` 			  | No   | `string` | Postback name of the button |
| `payload.file`				  | Yes  | `binary`   | maximum size: 10 MB |

#### Response

> A sample **response** payload

```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/att/345678/bhdbfhdbf87348374837483.png"
}
```


## `send_rich_message_postback`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_rich_message_postback`  |
| __Required scopes__| `chats.conversation--my:rw` `chats.conversation--all:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

__*)__  `incoming_rich_message_postback` will be sent only for active threads.

#### Request

> A sample **request** payload

```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "Method URL_yes",
		"toggled": true
	}
}
```

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `chat_id`       | Yes      | `string` |                              |
| `event_id`      | Yes      | `string`    | 				     		   |
| `postback`      | Yes       | `object` | 							   |
| `postback.id` | Yes       | `string` | Postback name of the button |
| `postback.toggled`| Yes     | `bool`   | Postback toggled true/false |
| `thread_id`     | Yes       | `string` | 						       |

#### Response

No response payload.

## `multicast`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/multicast`  |
| __Required scopes__| `multicast:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_multicast`](#incoming-multicast)|

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

## `send_typing_indicator`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_typing_indicator`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |

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


## `ban_customer`

Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

------------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/ban_customer`  |
| __Required scopes__| `customers.ban:rw` |
| **RTM API equivalent**| ✓ |
| **Webhook**| [`customer_banned`](#customer-banned) |

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

## `close_thread`

Closes the thread. Nobody will be able to send any messages to this thread anymore.

------------------------------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/close_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`thread_closed`](#thread-closed)  |

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

## `transfer_chat`

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/transfer_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_transferred`](#chat-transferred)  |


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


## `grant_access`

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/grant_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`access_granted`](#access-granted)|

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


## `revoke_access`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/revoke_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`access_revoked`](#access-revoked)|

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


## `set_access`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/set_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`access_set`](#access-set)|


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


## `update_agent`

Updates agent properties.

-----------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_agent`  |
| __Required scopes__| `agents--my:rw` `agents--all:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`agent_updated`](#agent-updated)|

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


## `update_chat_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_properties_updated`](#chat-properties-updated) |

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


## `update_chat_thread_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

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


## `update_event_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`event_properties_updated`](#event-properties-updated) |

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


## `update_last_seen_timestamp`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_last_seen_timestamp`  |
| __Required scopes__| `chats--access:ro` `chats--all:ro`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


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


## `upload_image`

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/upload_image`  |
| __Required headers__| `Content-Type : multipart/form-data; boundary=<boundary>` |
| __Required scopes__| - |
| **RTM API equivalent**| - |

#### Request

> A sample **request** payload

```
	payload.image=test.png
```

| Parameter				 | 		Required | Data type| Notes                  |
| -------------- | -------- | -------- | ------------------------- |
| `payload`        				  | Yes  | `object` |  maximum size: 10 MB   |
| `payload.image`				  | Yes  | `binary` | maximum size: 10 MB    |


#### Response

> A sample **response** payload

```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/img/24434343/dmkslfmndsfgds6fsdfsdnfsd.png",
	"path": "24434343/dmkslfmndsfgds6fsdfsdnfsd.png"
}
```

| Parameter		 | 		 Notes                |
| -------------- |  ------------------------- |
| `url`        	 |  is a ready-to-use temporary URL, but it can expire in the future  |
| `path`		 |  should be used for database and must be appended to `base_url` (`https://cdn.livechat-static.com/api/file/lc/img`)|



## `get_customers`

It returns customers list.

---------------------------------------------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_customers`  |
| __Required scopes__| `customers:ro`|
| **RTM API equivalent**| ✓ |

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


## `create_customer`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/create_customer`  |
| __Required scopes__| `customers:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`customer_created`](#customer-created) |

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


## `update_customer`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_customer`  |
| __Required scopes__| `customers:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`customer_updated`](#customer-updated) |

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


## `delete_chat_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_properties_deleted`](#chat-properties-deleted) |


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


## `delete_chat_thread_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

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


## `delete_event_properties`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`event_properties_deleted`](#event-properties-deleted) |

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


## `tag_chat_thread`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/tag_chat_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_thread_tagged`](#chat-thread-tagged) |

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


## `untag_chat_thread`

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/untag_chat_thread	`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`chat_thread_untagged`](#chat-thread-untagged) |

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


## `follow_chat`
Marks the chat as followed. All changes to the chat will be sent to the requester until the chat is reactivated or unfollowed. Chat members don't need to follow their chats as they should receive all chat pushes regardless of their follower status.

--------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/follow_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| ✓ |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

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


## `unfollow_chat`
Removes the requester from the chat followers. After that, only key changes to the chat (like `transfer_chat` or `close_active_thread`) will be sent to the requester. Chat members cannot unfollow the chat.

--------------------------------------

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/unfollow_chat`  |
| __Required scopes__| - |
| **RTM API equivalent**| ✓ |

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
