---
weight: 60
---


# Methods

#### The API enpoint

| HTTP method  | Base URL |
|-------|--------|
| `POST`|`https://api.livechatinc.com/v3.0/agent/action/<action>`   |

If you specify the API version in the URL, you don't have to include the optional `"X-API-Version: 3"` header.

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

## chats

### `activate_chat`

> **`activate_chat`** sample request

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/activate_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json"  \
  -d '{
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
				"system_message_type": "routing.assigned",
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
		}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/activate_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| [`activate_chat`](../agent-chat-rtm-api/#activate-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#activate-chat)</sup> |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |

__*)__ 
When `chat.users` is defined, one of following scopes is required:

- `chats--all:rw`
- `chats--access:rw`
- `chats--my:rw`

#### Request

> **`activate_chat`** sample response 

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



### `follow_chat`
Marks the chat as followed. All changes to the chat will be sent to the requester until the chat is reactivated or unfollowed. Chat members don't need to follow their chats as they should receive all chat pushes regardless of their follower status.

--------------------------------------

> **`follow_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/follow_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	  }'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/follow_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`follow_chat`](../agent-chat-rtm-api/#follow-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#follow-chat)</sup> |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__
It won't be sent when the requester already follows the chat or is the chat member.

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |

#### Response

No response payload.


### `start_chat`

Starts a chat.

-------------------------------------------------------------------------------------------

> **`start_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/start_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
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
	}'
  ```

> **`start_chat`** sample response 

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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/start_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| [`start_chat`](../agent-chat-rtm-api/#start-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#start-chat)</sup> |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |

__*)__ 
When `chat.users` is defined, one of following scopes is required:

- `chats--all:rw`
- `chats--access:rw`
- `chats--my:rw`

#### Request

| Parameters           | Required | Data type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | No       | `object` |                                                                  |
| `chat.properties`        | No       | `object` |                                                                  |
| `chat.access`            | No       | `object` |                                                                  |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | List of initial chat events                                      |
| `chat.thread.properties` | No       | `object` |                                                                  |





### `transfer_chat`

> **`transfer_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/transfer_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"target": {
		"type":  "group"
		"ids": [1]
			},
	"force": true
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/transfer_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`transfer_chat`](../agent-chat-rtm-api/#transfer-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#transfer-chat)</sup> |
| **Webhook**| [`chat_transferred`](#chat-transferred)  |


#### Request

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

> **`unfollow_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/unfollow_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/unfollow_chat`  |
| __Required scopes__| - |
| **RTM API equivalent**| [`unfollow_chat`](../agent-chat-rtm-api/#unfollow-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#unfollow-chat)</sup> |
| **Webhook**| - |

#### Request


| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |

#### Response

No response payload.





## chat access

### `grant_access`

> **`grant_access`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/grant_access" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
			}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/grant_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`grant_access`](../agent-chat-rtm-api/#grant-access)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#grant-access)</sup> |
| **Webhook**| [`access_granted`](#access-granted)|


#### Request

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

> **`revoke_access`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/revoke_access" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
			}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/revoke_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`revoke_access`](../agent-chat-rtm-api/#revoke-access)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#revoke-access)</sup> |
| **Webhook**| [`access_revoked`](#access-revoked)|

#### Request

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

> **`set_access`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/set_access" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"resource": "chat",
	"id": "PJ0MRSHTDG",
	"access": {
		"type": "group",
		"id": 1
			}
	}'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/set_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`set_access`](../agent-chat-rtm-api/#set-access)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#set-access)</sup> |
| **Webhook**| [`access_set`](#access-set)|


#### Request

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

> **`add_user_to_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/add_user_to_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/add_user_to_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **RTM API equivalent**| [`add_user_to_chat`](../agent-chat-rtm-api/#add-user-to-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#add-user-to-chat)</sup> |
| **Webhook**| [`chat_user_added`](#chat_user_added) |

#### Request

| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | Possible values: `agent` or `customer` |


#### Response

No response payload.

### `remove_user_from_chat`

Removes user from chat. Removing `customer` user type is forbidden. It's always possible to remove the requester from chat.

------------------------------------------------------------------------------------------

> **`remove_user_from_chat`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/remove_user_from_chat" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
	}'
  ```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/remove_user_from_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **RTM API equivalent**| [`remove_user_from_chat`](../agent-chat-rtm-api/#remove-user-from-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#remove-user-from-chat)</sup> |
| **Webhook**| [`chat_user_added`](#chat_user_added) |

**Request payload**

| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | possible values are `agent` or `customer` |

#### Response

No response payload.


### `update_agent`

Updates agent properties.

-----------------------------------------------------------------------------

> **`update_agent`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_agent" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"routing_status": "accepting_chats"
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_agent`  |
| __Required scopes__| `agents--my:rw` `agents--all:rw`|
| **RTM API equivalent**| [`update_agent`](../agent-chat-rtm-api/#update-agent)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-agent)</sup> |
| **Webhook**| [`agent_updated`](#agent-updated)|

#### Request

| Parameter  | Required | Data type     | Notes                                                     |
| ---------------- | -------- | -------- | --------------------------------------------------------- |
| `agent_id`       | No       | `string` | The current agent is used by default.                     |
| `routing_status` | No       | `string` | Possible values: `accepting_chats`, `not_accepting_chats` |

#### Response

No response payload.

## customers

### `ban_customer`

Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

------------------------------------------------------------------------------------------------

> **`ban_customer`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/ban_customer" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"ban": {
		"days": 5
		}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/ban_customer`  |
| __Required scopes__| `customers.ban:rw` |
| **RTM API equivalent**| [`ban_customer`](../agent-chat-rtm-api/#ban-customer)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#ban-customer)</sup> |
| **Webhook**| [`customer_banned`](#customer-banned) |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `customer_id`  | Yes      | `string` |       |
| `ban`          | Yes      | `object` |       |
| `ban.days`     | Yes      | `number` |       |

#### Response

No response payload.


### `create_customer`

> **`create_customer`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/create_customer" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"email": "customer1@example.com",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"some_key": "some_value"
			}
	}'
  ```
> **`create_customer`** sample response

```js
{
  // "User > Customer" object
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/create_customer`  |
| __Required scopes__| `customers:rw`|
| **RTM API equivalent**| [`create_customer`](../agent-chat-rtm-api/#create-customer)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#create-customer)</sup> |
| **Webhook**| [`customer_created`](#customer-created) |

#### Request

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |




### `get_customers`

It returns customers list.

---------------------------------------------------------------------------

> **`get_customers`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/get_customers" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
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
	}'
  ```

> **`get_customers`** sample response

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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_customers`  |
| __Required scopes__| `customers:ro`|
| **RTM API equivalent**| [`get_customers`](../agent-chat-rtm-api/#get-customers)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#get-customers)</sup> |
| **Webhook**| - |

#### Request

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

> **`update_customer`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_customer" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"customer_id": "d4efab70-984f-40ee-aa09-c9cc3c4b0882",
	"name": "John Doe",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"score": "low"
			}
	}'
```

> **`update_customer`** sample response 

```js
{
  // "User > Customer" object
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_customer`  |
| __Required scopes__| `customers:rw`|
| **RTM API equivalent**| [`update_customer`](../agent-chat-rtm-api/#update-customer)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-customer)</sup> |
| **Webhook**| [`customer_updated`](#customer-updated) |

#### Request

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `customer_id`  | Yes      | `string` | UUID v4 format is required     |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |



## events

### `send_event`

> **`send_event`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/send_event" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"attach_to_last_thread": false,
	"event": {
		"type": "message",
		"text": "hello world",
		"recipients": "agents",
		"custom_id": "31-0C-1C-07-DB-16",
			}
	}'
  ```

> **`send_event`** sample response 

```js
{
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_event`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| [`send_event`](../agent-chat-rtm-api/#send-event)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#send-event)</sup> |
| **Webhook**| [`incoming_event`](#incoming-event ) or [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__ The `incoming_chat_thread` webhook will be sent instead of `incoming_event `only if the event starts a new thread.


#### Request

| Parameters         | Required | Data type     | Notes                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |




## properties (chat/thread/event)

### `delete_chat_properties`

> **`delete_chat_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/delete_chat_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": ["score", "comment"],
		...
				}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`delete_chat_properties`](../agent-chat-rtm-api/#delete-chat-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#delete-chat-properties)</sup> |
| **Webhook**| [`chat_properties_deleted`](#chat-properties-deleted) |


#### Request

| Parameter | Required | Data type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for |
| `properties`   | Yes      | `object` | Chat properties to delete                          |

#### Response

No response payload.


### `delete_chat_thread_properties`

> **`delete_chat_thread_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/delete_chat_thread_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": ["score", "comment"],
		...
				}
	}'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`delete_chat_thread_properties`](../agent-chat-rtm-api/#delete-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#delete-chat-thread-properties)</sup> |
| **Webhook**| [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `properties`   | Yes      | `object` | Chat thread properties to delete                     |

#### Response

No response payload.


### `delete_event_properties`

> **`delete_event_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/delete_event_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "2_EW2WQSA8",
	"properties": {
		"rating": ["score", "comment"],
		...
				}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/delete_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`delete_event_properties`](../agent-chat-rtm-api/#delete-event-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#delete-event-properties)</sup> |
| **Webhook**| [`event_properties_deleted`](#event-properties-deleted) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `event_id`     | Yes      | `string` | Id of the event that we want to delete property for  |
| `properties`   | Yes      | `object` | Event properties to delete                           |


#### Response

No response payload.

### `update_chat_properties`

> **`update_chat_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_chat_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
				},
		...
			}
		}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`update_chat_properties`](../agent-chat-rtm-api/#update-chat-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-chat-properties)</sup> |
| **Webhook**| [`chat_properties_updated`](#chat-properties-updated) |

#### Request

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a property for.|
| `properties`   | Yes      | `object` | Chat properties to set                          |

#### Response

No response payload.


### `update_chat_thread_properties`

> **`update_chat_thread_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_chat_thread_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
				},
		...
		}
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`update_chat_thread_properties`](../agent-chat-rtm-api/#update-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-chat-thread-properties)</sup> |
| **Webhook**| [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

#### Request


| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you want to set properties for|
| `thread_id`    | Yes      | `string` | The id of the thread that you want to set properties for |
| `properties`   | Yes      | `object` | Chat properties to set                            |

#### Response

No response payload.


### `update_event_properties`

> **`update_event_properties`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_event_properties" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
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
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`update_event_properties`](../agent-chat-rtm-api/#update-event-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-event-properties)</sup> |
| **Webhook**| [`event_properties_updated`](#event-properties-updated) |

#### Request


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

> **`tag_chat_thread`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/tag_chat_thread" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
	}'
  ```


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/tag_chat_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`tag_chat_thread`](../agent-chat-rtm-api/#tag-chat-thread)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#tag-chat-thread)</sup> |
| **Webhook**| [`chat_thread_tagged`](#chat-thread-tagged) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to add a tag to   		  |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to add a tag to 	 	  |
| `tag`    		 | Yes      | `string` | Tag name											  |


#### Response

No response payload.


### `untag_chat_thread`

> **`untag_chat_thread`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/untag_chat_thread" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
	}'
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/untag_chat_thread	`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`untag_chat_thread`](../agent-chat-rtm-api/#untag-chat-thread)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#untag-chat-thread)</sup> |
| **Webhook**| [`chat_thread_untagged`](#chat-thread-untagged) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to remove the tag from   |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to remove the tag from |
| `tag`    		 | Yes      | `string` | Tag name											  |


#### Response

No response payload.


## other


### `get_chat_threads`

It returns threads that the current agent has access to in a given chat.

--------------------------------------------------------------------------------

> **`get_chat_threads`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/get_chat_threads" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_ids": ["K600PKZON8"]
	}'
```

> **`get_chat_threads`** sample response 

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
#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_chat_threads`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro`|
| **RTM API equivalent**| [`get_chat_threads`](../agent-chat-rtm-api/#get-chat-threads)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#get-chat-threads)</sup> |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`   | No       | `array`  |       |



### `get_chat_threads_summary`

> **`get_chat_threads_summary`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/get_chat_threads" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"limit": 25,
	"page_id": "MjpkZXNj"
	}'
  ```

> **`get_chat_threads_summary`** sample response

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
#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/get_chat_threads_summary`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **RTM API equivalent**| [`get_chat_threads_summary`](../agent-chat-rtm-api/#get-chat-threads-summary)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#get-chat-threads-summary)</sup> |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `order`      | No      | `string` | Possible values: `asc` - oldest chats first and `desc` - newest chats first (default)|
| `limit`      | No      | `number` | Defaul: 10, maximum: 100      |
| `page_id`   | No       | `string`  |       |

#### Response

| Parameter  | Data type     | Notes |
| -------------- | -------- | ----- |
| `found_threads`   | `string` | Number of threads in a chat    |



### `send_file`

> **`send_file`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/send_file" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:multipart/form-data; boundary=<boundary>" \
  -d 'payload.chat_id=a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5
	  payload.custom_id=12345-bhdsa
	  payload.file=test.png'
  ```

> **`send_file`** sample response 

```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/att/345678/bhdbfhdbf87348374837483.png"
}
```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_file`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **RTM API equivalent**| - |
| **Webhook**|[`incoming_chat_thread](#incoming-chat-thread) or [`incoming_event`](#incoming-event )__*__ |

__*)__
The `incoming_chat_thread` webhook will be sent instead of `incoming_event` only if the event starts a new thread.

#### Request

| Parameter				 | 		Required | Data type| Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `payload`        				  | Yes  | `object` |                              |
| `payload.chat_id`				  | Yes  | `string` | The id of the chat that you want to send the file to			   |
| `payload.require_active_thread` | No   | `bool` | If `true`, returns error when all threads are inactive; default: `false` |
| `payload.custom_id` 			  | No   | `string` | Postback name of the button |
| `payload.file`				  | Yes  | `binary`   | maximum size: 10 MB |



### `send_rich_message_postback`

> **`send_rich_message_postback`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/send_rich_message_postback" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "Method URL_yes",
		"toggled": true
				}
	}'
  ```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_rich_message_postback`  |
| __Required scopes__| `chats.conversation--my:rw` `chats.conversation--all:rw` |
| **RTM API equivalent**| [`send_rich_message_postback`](../agent-chat-rtm-api/#send-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#send-rich-message-postback)</sup> |
| **Webhook**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

__*)__  `incoming_rich_message_postback` will be sent only for active threads.

#### Request

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

### `multicast`

> **`multicast`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/multicast" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
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
	}'
  ```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/multicast`  |
| __Required scopes__| `multicast:rw` |
| **RTM API equivalent**| [`multicast`](../agent-chat-rtm-api/#multicast)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#multicast)</sup> |
| **Webhook**| [`incoming_multicast`](#incoming-multicast)|

#### Request

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



### `send_typing_indicator`

> **`send_typing_indicator`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/send_typing_indicator" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"recipients": "all",
	"is_typing": true
	}'
```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/send_typing_indicator`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **RTM API equivalent**| [`send_typing_indicator`](../agent-chat-rtm-api/#send-typing-indicator)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#send-typing-indicator)</sup> |
| **Webhook**| - |


#### Request

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

> **`close_thread`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/close_thread" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	}'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/close_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **RTM API equivalent**| [`close_thread`](../agent-chat-rtm-api/#close-thread)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#close-thread)</sup> |
| **Webhook**| [`thread_closed`](#thread-closed)  |

#### Request

| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |

#### Response

No response payload.



### `update_last_seen_timestamp`

> **`update_last_seen_timestamp`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/update_last_seen_timestamp" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:application/json" \
  -d '{
	"chat_id": "PJ0MRSHTDG",
	"timestamp": 123456789
	}'
  ```

> **`update_last_seen_timestamp`** sample response 

```js
{
	"timestamp": 123456789
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/update_last_seen_timestamp`  |
| __Required scopes__| `chats--access:ro` `chats--all:ro`|
| **RTM API equivalent**| [`update_last_seen_timestamp`](../agent-chat-rtm-api/#update-last-seen-timestamp)<sup>[![LiveChat Link](link.svg)](../agent-chat-rtm-api/#update-last-seen-timestamp)</sup> |
| **Webhook**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


#### Request
      

| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `timestamp`  | No       | `number` |     |



### `upload_image`

> **`upload_image`** sample request 

   ```shell
  curl "https://api.livechatinc.com/v3.0/agent/action/upload_image" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-type:multipart/form-data; boundary=<boundary>" \
  -d 'payload.image=test.png'
  ```

> **`upload_image`** sample response

```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/img/24434343/dmkslfmndsfgds6fsdfsdnfsd.png",
	"path": "24434343/dmkslfmndsfgds6fsdfsdnfsd.png"
}
```

#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/agent/action/upload_image`  |
| __Required scopes__| - |
| **RTM API equivalent**| - |
| **Push message**| - |

#### Request

| Parameter				 | 		Required | Data type| Notes                  |
| -------------- | -------- | -------- | ------------------------- |
| `payload`        				  | Yes  | `object` |  maximum size: 10 MB   |
| `payload.image`				  | Yes  | `binary` | maximum size: 10 MB    |


#### Response

| Parameter		 | 		 Notes                |
| -------------- |  ------------------------- |
| `url`        	 |  is a ready-to-use temporary URL, but it can expire in the future  |
| `path`		 |  should be used for database and must be appended to `base_url` (`https://cdn.livechat-static.com/api/file/lc/img`)|




