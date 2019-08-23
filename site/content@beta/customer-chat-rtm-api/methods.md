---
weight: 50
---


# Methods

#### The API endpoint
`wss://api.livechatinc.com/v3.0/customer/rtm/ws`

---------------------------------------------------------------

#### Required parameters

When connecting to the Customer Chat RTM API, clients have to send over the required query string parameters.

| Parameter   |      Data type      |  Notes |
|----------|:-------------:|------:|
| `license_id`	 |  `integer`  | LiveChat account ID |

> **RTM API request format**

```json
{
	"request_id": "<request_id>", // optional
	"action": "<action>",
	"payload": {
		// optional
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
```

> **RTM API response format**

```json
{
	"request_id": "<request_id>", // optional
	"action": "<action>",
	"type": "response",
	"success": true,
	"payload": {
		// optional
	}
}
```

|   |  |
|-------|--------| 
| **chats** | [`get_chats_summary`](#get-chats-summary) [`get_chat_threads_summary`](#get-chat-threads-summary) [`get_chat_threads`](#get-chat-threads) [`get_archives`](#get-archives) [`start_chat`](#start-chat) [`activate_chat`](#activate-chat) [`close_thread`](#close-thread) [`follow_chat`](#follow-chat)  [`unfollow_chat`](#unfollow-chat) |
| **chat access** | [`grant_access`](#grant-access) [`revoke_access`](#revoke-access) [`set_access`](#set-access)  [`transfer_chat`](#transfer-chat) |
| **chat users** | [`add_user_to_chat`](#add-user-to-chat) [`remove_user_from_chat`](#remove-user-from-chat)   | 
| **events** | [`send_event`](#send-event) [`send_rich_message_postback`](#send-rich-message-postback) |
| **properties (chat/thread/event)** | [`update_chat_properties`](#update-chat-properties) [`delete_chat_properties`](#delete-chat-properties) [`update_chat_thread_properties`](#update-chat-thread-properties) [`delete_chat_thread_properties`](#delete-chat-thread-properties) [`update_event_properties`](#update-event-properties) [`delete_event_properties`](#delete-event-properties)|  
| **thread tags** | [`tag_chat_thread`](#tag-chat-thread) [`untag_chat_thread`](#untag-chat-thread) | 
| **customers** |  [`get_customers`](#get-customers) [`create_customer`](#create-customer) [`update_customer`](#update-customer) [`ban_customer`](#ban-customer) |
| **status** | [`login`](#login) [`change_push_notifications`](#change-push-notifications) [`update_agent`](#update-agent) [`set_away_status`](#set-away-status) [`logout`](#logout) |
| **other** | [`update_last_seen_timestamp`](#update-last-seen-timestamp)  [`send_typing_indicator`](#send-typing-indicator) [`multicast`](#multicast) | 


## chats

### `get_chats_summary`

It returns summaries of the chats an Agent has access to.

--------------------------------------------------------------

> **`get_chats_summary`** sample **request** with required params only

```json
{
	"action": "get_chats_summary",
	"payload": {}
}
```

<!-- > **`get_chats_summary`** sample **request** with optional params

```json
{
	"request_id": "12345", // optional
	"action": "get_chats_summary",
	"payload": {
		{
		"offset": 0,
		"limit": 25
		}
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
```  -->

> **`get_chats_summary`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_chats_summary",
	"type": "response",
	"success": true,
	"payload": {
		"chats_summary": [{
		"id": "123",
		"order": 343544565,
		"last_thread_id": "xyz",
		"users": [
			// array of "User" objects
		],
		"properties": {
			// "Properties" object
		},
		"access": {
			// "Access" object
		},
		"last_event_per_type": { // last event of each type in chat
			"message": {
				"thread_id": "K600PKZON8",
				"thread_order": 3,
				"event": {
					// "Event > Message" object
				}
			},
			"system_message": {
				"thread_id": "K600PKZON8",
				"thread_order": 3,
				"event": {
					// "Event > System message" object
				}
			},
			...
		}
	}],
	"total_chats": 20
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chats_summary`  |
| **Web API equivalent**|[`get_chats_summary`](../customer-chat-web-api/#get_chats_summary) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get_chats_summary)</sup>|
| **Push message**| - |

#### Request


| Parameter           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `offset`                | No       | `number` |  Default is 0, maximum is 100 |
| `limit` 				  | No       | `number`   | Default is 10, maximum is 25 |



### `get_chat_threads_summary`

> **`get_chat_threads_summary`** sample **request** with required params only

```json
{
	"action": "get_chat_threads_summary",
	"payload": {
			"chat_id": "PJ0MRSHTDG"
			}
}
```

<!-- > **`get_chat_threads_summary`** sample **request** with optional params

```json
{
	"request_id": "23456", // optional
	"action": "get_chat_threads_summary",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"offset": 0,
		"limit": 100
		},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_chat_threads_summary`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_chat_threads_summary",
	"type": "response",
	"success": true,
	"payload": {
		"threads_summary": [{
			"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
			"order": 2,
			"total_events": 1
		},
		{
			"id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
			"order": 1,
			"total_events": 0
		}
	],
		"total_threads": 4
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chat_threads_summary`  |
| **Web API equivalent**| [`get_chat_threads_summary`](../customer-chat-web-api/#get-chat-threads-summary) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get-chat-threads-summary)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data ype     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `offset`      | No      | `number` | Default is 0 |
| `limit`      | No      | `number` | Defaul: 25, maximum: 100      |

#### Response

| Parameter  | Notes     |  |
| -------------- | -------- | ----- |
| `threads_summary`   |  Sorted descendingly by `order` |     |


### `get_groups_status`

> **`get_groups_status`** sample **request** with required params only

```json
{
	"action": "get_groups_status",
	"payload": {}
}
```

<!-- > **`get_groups_status`** sample **request** with optional params

```json
{
	"request_id": "12235", // optional
	"action": "get_groups_status",
	"payload": {
		"groups": [1, 2, 3, 4]
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_groups_status`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_groups_status",
	"type": "response",
	"success": true,
	"payload": {
		"groups_status": {

		//1,2,3 are group ids, online/offline/online_for_queue are statuses of the groups

		1: "online",
		2: "offline",
		3: "online_for_queue"
		}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_groups_status`  |
| **Web API equivalent**| [`get_groups_status`](../customer-chat-web-api/#get_groups_status) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get_groups_status)</sup> |
| **Push message**| - |


#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `all`      | No      | `bool` | If set to `true`, then you will get statuses for all groups.   |
| `groups`   | No       | `array`  | Table of a group's ids |


#### Response

|    |      |  |
| -------------- | -------- | ----- |
| `Group Not Found`   |  If you send `group_id` of a group that doesn't exists, then this id won't be included in the resposne payload.  |     |


### `get_predicted_agent`

> **`get_predicted_agent`** sample **request** with required params only

```json
{
	"action": "get_predicted_agent",
	"payload": {}
}
```

<!-- > **`get_predicted_agent`** sample **request** with optional params

```json
{
	"action": "get_predicted_agent",
	"payload": {},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_predicted_agent`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_predicted_agent",
	"type": "response",
	"success": true,
	"payload": {
	"agent": {
        "id": "agent1@example.com",
        "name": "Name",
        "avatar": "https://example.avatar/example.com",
        "is_bot": false,
        "job_title": "support hero",
        "type": "agent"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_predicted_agent`  |
| **Web API equivalent**| [`get_predicted_agent`](../customer-chat-web-api/#get_predicted_agent) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get_predicted_agent)</sup> |
| **Push message**| - |



### `get_url_details`

> **`get_url_details`** sample **request** with required params only

```json
{
	"action": "get_url_details",
	"payload": {	
		"url": "https://livechatinc.com"
	}
}
```

<!-- > **`get_url_details`** sample **request** with optional params

```json
{
	"action": "get_url_details",
	"payload": {
		"url": "https://livechatinc.com"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_url_details`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_url_details",
	"type": "response",
	"success": true,
	"payload": {
		"title": "LiveChat | Live Chat Software and Help Desk Software",
		"description": "LiveChat - premium live chat software and help desk software for business. Over 24 000 companies from 150 countries use LiveChat. Try now, chat for free!",
		"image_url": "s3.eu-central-1.amazonaws.com/labs-fraa-livechat-thumbnails/96979c3552cf3fa4ae326086a3048d9354c27324.png",
		"image_width": 200,
		"image_height": 200,
		"url": "https://livechatinc.com"
		}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_url_details`  |
| **Web API equivalent**| [`get_url_details`](../customer-chat-web-api/#get_url_details)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get_url_details)</sup> |
| **Push message**| - |


#### Request 

| Parameter                                        | Required | Data type     | Notes                               |
| ----------------------------------------------------- | -------- | -------- | ----------------------------------- |
| `url`                                             | Yes       | `string` |  Valid website URL                    |



### `start_chat`

Starts a chat.

-------------------------------------------------------------------------------------------

> **`start_chat`** sample **request** with required params only

```json
{
	"action": "start_chat",
	"payload": {}
}
```

<!-- > **`start_chat`** sample **request** with optional params 

```json
{
	"action": "start_chat",
	"payload": {
	"chat": {
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
			}
		}
	},
	"continuous": true
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`start_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "start_chat",
	"type": "response",
	"success": true,
	"payload": {
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
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `start_chat`  |
| **Web API equivalent**| [`start_chat`](../customer-chat-web-api/#start-chat)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#start-chat)</sup> |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |


#### Request

| Parameters           | Required | Data type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | No       | `object` |                                                                  |
| `chat.properties`        | No       | `object` |  Initial chat properties |
| `chat.access`            | No       | `object` | Chat access to set, defaults to all agents                       |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | Initial chat events array   |
| `chat.thread.properties` | No       | `object` |                   Initial chat thread properties |
| `continuous` 			   | No       | `bool`   | Starts chat as continuous (online group is not required), default: `false` |


### `activate_chat`


> **`activate_chat`** sample **request** with required params only

```json
{
	"action": "activate_chat",
	"payload": {
		 "chat": {
            "id": "PWJ8Y4THAV"
        }
	}
}
```

<!-- > **`activate_chat`** sample **request** with optional params 

```json
{
	"request_id": "7676", 
	"action": "activate_chat",
	"payload": {
	"chat": {
		"id": "PJ0MRSHTDG",
		"order": 343544565,
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
				}
			}
		}
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`activate_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "activate_chat",
	"type": "response",
	"success": true,
	"payload": {
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
		]
	}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `activate_chat`  |
| **Web API equivalent**|[`activate_chat`](../customer-chat-web-api/#activate-chat) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#activate-chat)</sup>|
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |


#### Request

| Request object           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | Yes      | `object` |                                                                  |
| `chat.id`                | Yes      | `string` | The ID of the chat that will be activated.                     |
| `chat.access`            | No       | `object` | Chat access to set, default to all agents                       |
| `chat.properties`        | No       | `object` | Initial chat properties                                          |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                        |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                                   |
| `continuous`             | No       | `bool`  | Set chat continuous mode. When unset leaves mode unchanged.|



### `close_thread`

Closes the thread. Sending messages to this thread will no longer be possible. 

------------------------------------------------------------------------------------------------

> **`close_thread`** sample **request** with required params only

```json
{
	"action": "close_thread",
	"payload": {
		"chat_id": "PJ0MRSHTDG"
	}
}
```

<!-- > **`close_thread`** sample **request** with optional params 

```json
{
	"request_id": "657", // optional
	"action": "close_thread",
	"payload": {
		"chat_id": "PJ0MRSHTDG"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`close_thread`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "close_thread",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `close_thread`  |
| **Web API equivalent**| [`close_thread`](../customer-chat-web-api/#close-thread) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#close-thread)</sup> |
| **Push message**| [`incoming_event`](#incoming-event) and [`thread_closed`](#thread-closed)  |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |


## events

### `send_event`

> **`send_event`** sample **request** with required params only

```json
{
	"action": "send_event",
	"payload": {
        "chat_id": "PW94SJTGW6",
        "event": {
            "type": "message",
            "text": "hello world",
			"recipients": "all"
		}
	}
}
```

<!-- > **`send_event`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "send_event",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"attach_to_last_thread": false,
		"event": {
			"type": "message",
			"text": "hello world",
			"recipients": "agents",
			"custom_id": "31-0C-1C-07-DB-16"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`send_event`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "send_event",
	"type": "response",
	"success": true,
	"payload": {
		"thread_id": "K600PKZON8",
		"event": {
			// the Event object
	}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `send_event`  |
| **Web API equivalent**| [`send_event`](../customer-chat-web-api/#send_event)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#send_event)</sup> |
| **Push message**| [`incoming-_vent](#incoming-event) and [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__ `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread.


#### Request


| Parameters         | Required | Data type     | Notes                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |



### `send_rich_message_postback`

> **`send_rich_message_postback`** sample **request** with required params only

```json
{
	"action": "send_rich_message_postback",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
        "thread_id": "K600PKZON8",
        "event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
        "postback": {
            "id": "Method URL_yes",
            "toggled": true
        }
	}
}
```

<!-- > **`send_rich_message_postback`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "send_rich_message_postback",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
        "thread_id": "K600PKZON8",
        "event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
        "postback": {
            "id": "Method URL_yes",
            "toggled": true
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`send_rich_message_postback`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "send_rich_message_postback",
	"type": "response",
	"success": true,
	"payload": {
		//no response payload
	}
}
```

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_rich_message_postback`  |
| **Web API equivalent**| [`send_rich_message_postback`](../customer-chat-web-api/#send-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#send-rich-message-postback)</sup> |
| **Push message**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

__*)__  `incoming_rich_message_postback` will be sent only for active threads.

#### Request

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `chat_id`       | Yes       | `string` |                         |
| `event_id`      | Yes       | `string` | 				     	   |
| `postback`      | Yes       | `object` | 							   |
| `postback.id  ` | Yes       | `string` | Postback name of the button |
| `postback.toggled`| Yes     | `bool`   | Postback toggled true/false |
| `thread_id`     | Yes       | `string` | 						       |


### `send_sneak_peek`

> **`send_sneak_peek`** sample **request** with required params only

```json
{
	"action": "send_sneak_peek",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"sneak_peek_text": "hello world"
	}
}
```

<!-- > **`send_sneak_peek`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "send_sneak_peek",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"sneak_peek_text": "hello world"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`send_sneak_peek`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "send_sneak_peek",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_sneak_peek`  |
| **Web API equivalent**| [`send_sneak_peek`](../customer-chat-web-api/#send_sneak_peek)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#send_sneak_peek)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a sneak peek to|
| `sneak_peek_text` | Yes      | `string` | Sneak peek text |



## properties (chat/thread/event)


### `update_chat_properties`

> **`update_chat_properties`** sample **request** with required params only

```json
{
	"action": "update_chat_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	}
}
```

<!-- > **`update_chat_properties`** sample **request** with optional params

```json
{
	"request_id": "93875", // optional
	"action": "update_chat_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_chat_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_chat_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_chat_properties`  |
| **Web API equivalent**| [`update_chat_properties`](../customer-chat-web-api/#update-chat-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-chat-properties)</sup> |
| **Push message**| [`chat_properties_updated`](#chat-properties-updated) |

#### Request

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a property for.|
| `properties`   | Yes      | `object` | Chat properties to set                          |


### `delete_chat_properties`

> **`delete_chat_properties`** sample **request** with required params only

```json
{
	"action": "delete_chat_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": [
                "score",
                "comment"
            ]
        }
	}
}
```

<!-- > **`delete_chat_properties`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "delete_chat_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": [
                "score",
                "comment"
            ]
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`delete_chat_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "delete_chat_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_chat_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| [`delete_chat_properties`](../customer-chat-web-api/#delete-chat-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#delete-chat-properties)</sup> |
| **Push message**| [`chat_properties_deleted`](#chat-properties-deleted) |


#### Request


| Parameter | Required | Data type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for |
| `properties`   | Yes      | `object` | Chat properties to delete                          |



### `update_chat_thread_properties`

> **`update_chat_thread_properties`** sample **request** with required params only

```json
{
	"action": "update_chat_thread_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	}
}
```

<!-- > **`update_chat_thread_properties`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "update_chat_thread_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_chat_thread_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_chat_thread_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_chat_thread_properties`  |
| **Web API equivalent**|[`update_chat_thread_properties`](../customer-chat-web-api/#update-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-chat-thread-properties)</sup> |
| **Push message**| [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

#### Request


| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you want to set properties for|
| `thread_id`    | Yes      | `string` | The id of the thread that you want to set properties for |
| `properties`   | Yes      | `object` | Chat properties to set                            |



### `delete_chat_thread_properties`

> **`delete_chat_thread_properties`** sample **request** with required params only

```json
{
	"action": "delete_chat_thread_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": [
                "score",
                "comment"
            ]
        }
	}
}
```

<!-- > **`delete_chat_thread_properties`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "delete_chat_thread_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": [
                "score",
                "comment"
            ]
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`delete_chat_thread_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "delete_chat_thread_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_chat_thread_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| [`delete_chat_thread_properties`](../customer-chat-web-api/#delete-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#delete-chat-thread-properties)</sup> |
| **Push message**| [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

#### Request


| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `properties`   | Yes      | `object` | Chat thread properties to delete                     |


### `update_event_properties`

> **`update_event_properties`** sample **request** with required params only

```json
{
	"action": "update_event_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "event_id": "2_EW2WQSA8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	}
}
```

<!-- > **`update_event_properties`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "update_event_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "event_id": "2_EW2WQSA8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
            }
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_event_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_event_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| [`update_event_properties`](../customer-chat-web-api/#update-event-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-event-properties)</sup> |
| **Push message**| [`event_properties_updated`](#event-properties-updated) |

#### Request


| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to set properties for. |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to set properties for.|
| `event_id`     | Yes      | `string` | Id of the event that you want to set properties for. |
| `properties`   | Yes      | `object` | Chat properties to set                            |



### `delete_event_properties`

> **`delete_event_properties`** sample **request** with required params only

```json
{
	"action": "delete_event_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "event_id": "2_EW2WQSA8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "rating": [
                    "score",
                    "comment"
                ]
            }
        }
	}
}
```

<!-- > **`delete_event_properties`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "delete_event_properties",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "thread_id": "K600PKZON8",
        "event_id": "2_EW2WQSA8",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "rating": [
                    "score",
                    "comment"
                ]
            }
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`delete_event_properties`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "delete_event_properties",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `delete_event_properties`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| [`delete_event_properties`](../customer-chat-web-api/#delete-event-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#delete-event-properties)</sup> |
| **Push message**| [`event_properties_deleted`](#event-properties-deleted) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `event_id`     | Yes      | `string` | Id of the event that we want to delete property for  |
| `properties`   | Yes      | `object` | Event properties to delete                           |


## thread tags

### `tag_chat_thread`

> **`tag_chat_thread`** sample **request** with required params only

```json
{
	"action": "tag_chat_thread",
	"payload": {
		"chat_id": "PW94SJTGW6",
		"thread_id": "PWS6GIKAKH",
		"tag": "support"	}
}
```

<!-- > **`tag_chat_thread`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "tag_chat_thread",
	"payload": {
		"chat_id": "PW94SJTGW6",
		"thread_id": "PWS6GIKAKH",
		"tag": "support"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`tag_chat_thread`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "tag_chat_thread",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `tag_chat_thread`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**|[`tag_chat_thread`](../customer-chat-web-api/#tag-chat-thread) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#tag-chat-thread)</sup> |
| **Push message**| [`chat_thread_tagged`](#chat-thread-tagged) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to add a tag to   		  |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to add a tag to 	 	  |
| `tag`    		 | Yes      | `string` | Tag name											  |



### `untag_chat_thread`

> **`untag_chat_thread`** sample **request** with required params only

```json
{
	"action": "untag_chat_thread",
	"payload": {
		"chat_id": "PW94SJTGW6",
		"thread_id": "PWS6GIKAKH",
		"tag": "support"
	}
}
```

<!-- > **`untag_chat_thread`** sample **request** with optional params

```json
{
	"request_id": "1245", // optional
	"action": "untag_chat_thread",
	"payload": {
		"chat_id": "PW94SJTGW6",
		"thread_id": "PWS6GIKAKH",
		"tag": "support"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`untag_chat_thread`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "untag_chat_thread",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```


#### Specifics

|  |  |
|-------|--------|
| **Action**   | `untag_chat_thread	`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**|[`untag_chat_thread`](../customer-chat-web-api/#untag-chat-thread) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#untag-chat-thread)</sup> |
| **Push message**| [`chat_thread_untagged`](#chat-thread-untagged) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to remove the tag from   |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to remove the tag from |
| `tag`    		 | Yes      | `string` | Tag name											  |


## customers


### `set_customer_fields`

> **`set_customer_fields`** sample **request** with required params only

```json
{
	"action": "set_customer_fields",
	"payload": {
		"fields": {
		"company_size": "10-100"
		}
	}
}
```

<!-- > **`set_customer_fields`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "set_customer_fields",
	"payload": {
		"fields": {
		"company_size": "10-100"
		}
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`set_customer_fields`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "set_customer_fields",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `set_customer_fields`  |
| **Web API equivalent**| [`get_customers`](../customer-chat-web-api/#get-customers) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#get-customers)</sup> |
| **Push message**| [`customer_updated`](#customer-updated) |

#### Request

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `fields`      | Yes       | `string` |  `key:value` object        |

Users Agent and referrer are updated by default using the browser’s headers.



### `update_customer_page`

> **`update_customer_page`** sample **request** with required params only

```json
{
	"action": "update_customer_page",
	"payload": {
		"url": "https://livechatinc.com/pricing"

	}
}
```

<!-- > **`update_customer_page`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "update_customer_page",
	"payload": {
			"url": "https://livechatinc.com/pricing",
			"title": "Livechat - Pricing"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_customer_page`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_customer_page",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_customer_page`  |
| **Web API equivalent**|- |
| **Push message**| [`customer_page_updated`](#customer-page-updated) |

Users Agent and referrer are updated by default using the browser’s headers.


#### Request


| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `url`          | Yes       | `string` |                                |
| `title`        | No       | `string` |                                |


### `update_customer`

> **`update_customer`** sample **request** with required params only

```json
{
	"action": "update_customer",
	"payload": {
		"customer_id": "646d53b8-ba76-48bf-7ef1-f6d61ec4ec44"
	}
}
```

<!-- > **`update_customer`** sample **request** with optional params

```json
{
	"request_id": "13425", // optional
	"action": "update_customer",
	"payload": {
		"customer_id": "d4efab70-984f-40ee-aa09-c9cc3c4b0882",
		"name": "John Doe",
		"avatar": "https://domain.com/avatars/1.jpg",
		"fields": {
			"score": "low"
		}
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_customer`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_customer",
	"type": "response",
	"success": true,
	"payload": {
		// "User > Customer" object
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_customer`  |
| __Required scopes__| `customers:rw`|
| **Web API equivalent**| [`update_customer`](../customer-chat-web-api/#update-customer) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-customer)</sup> |
| **Push message**| [`customer_updated`](#customer-updated) |

#### Request


| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `customer_id`  | Yes      | `string` | UUID v4 format is required     |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | URL of the Customer's avatar         |
| `fields`       | No       | `object` | `"key": "value"` object |

Apart from `customer_id`, which is a required parameter, you also need to include **one of the optional** parameters.



## status

### `login`
It returns current agent's initial state.

------------------------------------------------------

> **`login`** sample **request** with required params only

```json
{
	"action": "login",
	"payload": {
		"token": "Bearer dal:S2V0s1fgTbfXmgthj4cZSA"
		}
	}
}
```

<!-- > **`login`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "login",
	"payload": {
		"token": "Bearer p-cjQcfhTqego5I48WeAPw",
		"group_id": 1,
		"customer_page": {
			"url": "https://www.livechatinc.com/"
		}
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`login`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "login",
	"type": "response",
	"success": true,
	"payload": {
		"customer_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"has_active_thread": true,
	"chats": [
		{
			"chat_id": "PJ0MRSHTDG",
			"has_unread_events": true
		}
	],
	"__priv_dynamic_config": {
		"customer_data": {
			"name": "John Doe",
			"last_visit_timestamp": 1473433500,
			"page_views_count": 40,
			"visits_count": 15,
			"chats_count": 2,
			"invitations_shown_count": 20,
			"invitations_accepted_count": 1,
			"client_version": "432423423",
			"fields": "some fields",
			"group_id": 2
		},
		"online_groups_ids": [1, 3],
		"global_properties": {
			"key1": "value1",
			"key2": "value2"
		},
		"customer_groups": {
			"monitoring": {
				"id": 1,
				"static_config_url": "/licence/1520/get_static_config.121.1808829.94.95.39446.4011.2385.398.160.552.58.337.44320.js",
				"language_config_url": "/licence/1520/v2/localization.en.121.004b8e014f50ea0c6ad6227162f7d18f_40d391a9adcdbf190e62fcd21c865bf2.js"
			},
			"chats": {
				"2": {
					"chat_ids": ["PJ0MRSHTDG"],
					"static_config_url": "/licence/1520/get_static_config.121.1808829.94.95.39446.4011.2385.398.160.552.58.337.44320.js",
					"language_config_url": "/licence/1520/v2/localization.en.121.004b8e014f50ea0c6ad6227162f7d18f_40d391a9adcdbf190e62fcd21c865bf2.js"
				}
			}
		}
		"static_config_version": "3435.4545",
		"predicted_agent": {
			"id": "agent1@example.com",
			"name": "Bart",
			"type": "agent",
			"avatar": "cdn.livechatinc.com/avatars/1.png",
			"job_title": "Support Agent"
		},
		"greeting": {
			"id": 342543723,
			"unique_id": "e35a4fb4106d87e550fe1af480639058",
			"text": "some message",
			"agent": {
				"id": "agent1@example.com",
				"name": "Bart",
				"type": "agent",
				"avatar": "cdn.livechatinc.com/avatars/1.png",
				"job_title": "Support Agent",
				"is_bot": false
			},
			"displayed_first_time": true
		}
	}
}
```


#### Specifics

|  |  |
|-------|--------|
| **Action**   | `login`  |
| **Required scopes** | - |
| **Web API equivalent**| -|
| **Push message**| - |


#### Request


| Parameter                     | Required | Data type     | Notes                                                                                                                       |
| ----------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `token`                             | Yes      | `string` | OAuth token from customer accounts                                                  |
| `customer	`                         | No       | `object` |                                                       |
| `customer.avatar`              	  | No       | `string` | URL of the Customer's avatar   |
| `customer.email`              	  | No       | `string` |    |
| `customer.name`               	  | No       | `string` |                                                                        |
| `customer.fields`					  | No       | `object` | Map in the `"key": "value"` format |
| `customer_page.title`      		  | No       | `string` |                             |
| `customer_page.url`                 | No       | `string` |                                                                        |
| `customer_side_storage`__*__             | No       | `object` | Map in the `"key": "value"` format                                                       |
| `is_mobile`                		  | No       | `bool`   | Informs if logging in is performed from a mobile device                                                       |
| `group_id`              		      | No       | `number` |                                                        |
| `referrer`              		      | No       | `string` |                                                        |

__*)__ We use `customer_side_storage` to keep some data on the client side. You should pass a map from the `customer_side_storage_updated` push payload to this field.



### `set_away_status`

> **`set_away_status`** sample **request** with required params only

```json
{
	"action": "set_away_status",
	"payload": {
		"away": true
	}
}
```

<!-- > **`set_away_status`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "set_away_status",
	"payload": {
		"away": true
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`set_away_status`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "set_away_status",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `set_away_status`  |
| __Required scopes__| `agents--my:rw`|
| **Web API equivalent**| - |
| **Push message**| - |

#### Request


| Request object | Required | Type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `away`		 | Yes      | `bool`   |  				      |



### `change_push_notifications`

Change firebase push notifications properties.

-----------------------------------------------------------------------------

> **`change_push_notifications`** sample **request** with required params only

```json
{
	"action": "change_push_notifications",
	"payload": {
		"firebase_token": "8daDAD9dada8ja1JADA11",
		"platform": "ios",
		"enabled": true
	}
}
```

<!-- > **`change_push_notifications`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "change_push_notifications",
	"payload": {
		"firebase_token": "8daDAD9dada8ja1JADA11",
		"platform": "ios",
		"enabled": true
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`change_push_notifications`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "change_push_notifications",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `change_push_notifications`  |
| __Required scopes__| - |
| **Web API equivalent**| - |
| **Push message**| - |

#### Request

| Parameter  | Required | Data type   | Notes                                                    |
| ---------------- | -------- | ------ | -------------------------------------------------------- |
| `firebase_token` | Yes      | string | Firebase device token                                    |
| `platform`       | Yes      | string | OS platform, possible values:  `ios`, `android`          |
| `enabled`        | Yes      | bool   | Enable or disable push notifications for requested token |


### `update_agent`

Updates agent properties.

-----------------------------------------------------------------------------

> **`update_agent`** sample **request** with required params only

```json
{
	"action": "update_agent",
	"payload": {
		"agent_id": "user@gmail.com",
        "routing_status": "accepting_chats"
	}
}
```

<!-- > **`update_agent`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "update_agent",
	"payload": {
		"agent_id": "user@gmail.com",
        "routing_status": "accepting_chats"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_agent`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_agent",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_agent`  |
| __Required scopes__| `agents--my:rw` `agents--all:rw`|
| **Web API equivalent**|[`update_agent`](../customer-chat-web-api/#update-agent) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-agent)</sup> |
| **Push message**| [`agent_updated`](#agent-updated)|

#### Request


| Parameter  | Required | Data type     | Notes                                                     |
| ---------------- | -------- | -------- | --------------------------------------------------------- |
| `agent_id`       | No       | `string` | The current agent is used by default.                     |
| `routing_status` | No       | `string` | Possible values: `accepting_chats`, `not_accepting_chats` |


### `logout`

Logs the Agent out 

------------------------------------------------------

> **`logout`** sample **request** with required params only

```json
{
	"action": "logout",
	"payload": {}
}
```

<!-- > **`logout`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "logout",
	"payload": {},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`logout`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "logout",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `logout`  |
| **Required scopes** | - |
| **Web API equivalent**| -|
| **Push message**| - |



## other

### `update_last_seen_timestamp`

> **`update_last_seen_timestamp`** sample **request** with required params only

```json
{
	"action": "update_last_seen_timestamp",
	"payload": {
		 "chat_id": "PJ0MRSHTDG"
	}
}
```

<!-- > **`update_last_seen_timestamp`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "update_last_seen_timestamp",
	"payload": {
		 "chat_id": "PJ0MRSHTDG",
		 "timestamp": 123456789
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`update_last_seen_timestamp`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "update_last_seen_timestamp",
	"type": "response",
	"success": true,
	"payload": {
		"timestamp": 123456789
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `update_last_seen_timestamp`  |
| **Web API equivalent**| [`update_last_seen_timestamp`](../customer-chat-web-api/#update-last-seen-timestamp) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#update-last-seen-timestamp)</sup> |
| **Push message**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


#### Request


| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `timestamp`    | No       | `number` |       |


### `send_typing_indicator`

> **`send_typing_indicator`** sample **request** with required params only

```json
{
	"action": "send_typing_indicator",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
        "is_typing": true
	}
}
```

<!-- > **`send_typing_indicator`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "send_typing_indicator",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"recipients": "all",
		"is_typing": true
		},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`send_typing_indicator`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "send_typing_indicator",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `send_typing_indicator`  |
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**|[`send_typing_indicator`](../customer-chat-web-api/#send-typing-indicator) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#send-typing-indicator)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data type     | Notes                                                       |
| -------------- | -------- | -------- | ----------------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to send the typing indicator to |
| `recipients`   | No       | `string` | `all` (default), `agents`                                   |
| `is_typing`    | Yes      | `bool`   | Bool                                                        |



### `multicast`

This method was created for **chat-unrelated communication**. Messages sent using `multicast` are not being saved. 

For example, it could be used in an app that sends notifications to Agents or Customers, when a certain condition is met (e.g. an important Customer started the chat).

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> **`multicast`** sample **request** with required params only

```json
{
	"action": "multicast",
	"payload": {
		"scopes": {
            "agents": {
                "all": true,
                "ids": [
                    "agent1@example.com",
                    "agent2@example.com"
                ],
                "groups": [
                    1,
                    2
                ]
            },
            "customers": {
                "ids": [
                    "b7eff798-f8df-4364-8059-649c35c9ed0c"
                ]
            }
        },
        "content": {
            "example": {
                "nested": "json"
				}
			}
		}
	}
}
```

<!-- > **`multicast`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "multicast",
	"payload": {
		"scopes": {
            "agents": {
                "all": true,
                "ids": [
                    "agent1@example.com",
                    "agent2@example.com"
                ],
                "groups": [
                    1,
                    2
                ]
            },
            "customers": {
                "ids": [
                    "b7eff798-f8df-4364-8059-649c35c9ed0c"
                ]
            }
        },
        "content": {
            "example": {
                "nested": "json"
				}
			}
		},
		"type": "type1"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`multicast`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "multicast",
	"type": "response",
	"success": true,
	"payload": {
		// no response payload
	}
}
```

#### Specifics
|  |  |
|-------|--------|
| **Action**   | `multicast`  |
| __Required scopes__| `multicast:rw` |
| **Web API equivalent**|[`multicast`](../customer-chat-web-api/#multicast) <sup>[![LiveChat Link](link.svg)](../customer-chat-web-api/#multicast)</sup> |
| **Push message**| [`incoming_multicast`](#incoming-multicast)|

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





















