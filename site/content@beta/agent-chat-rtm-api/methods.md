---
weight: 60
---


# Methods

#### The API endpoint
`wss://api.livechatinc.com/v3.0/agent/rtm/ws`

---------------------------------------------------------------

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
		"total": 3 
	}
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chats_summary`  |
| __Required scopes *__| `chats--all:ro` `chats--access:ro` `chats--my:ro` |
| **Web API equivalent**|[`get_chats_summary`](../agent-chat-web-api/#get_chats_summary) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#get_chats_summary)</sup>|
| **Push message**| - |

#### Request


| Request object           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `filters`                | No       | `object` |  Mustn't change between requests for subsequent pages. Otherwise the behavior is undefined.|
| `filters.include_active` | No       | `bool`   | Defines if the returned chat summary includes active chats; default is `True`|
| `filters.properties.<namespace>.<name>.<filter_type>`   | No       | `any`  |             |
| `pagination`			   | No       | `object` | 								                                    |
| `pagination.page`		   | No       | `number` | 	Default is 1, min is 1, max is 1000		                        |
| `pagination.total`	   | No       | `number` | 	Total number of threads matching filters; Default is 25, min is 0, max is 100   |

`filter_type` can take the following values:

- exists (bool)
- values (type[] - array with specific type for property: `string`, `int`, or `bool`)
- exclude_values (type[] - array with specific type for property: `string`, `int`, or `bool`)

There's only one value allowed for a single property.


#### Response

| Parameter  | Data type     | Notes |
| -------------- | -------- | ----- |
| `found_chats`   | `string` | An estimated number. The real number of found chats can differ a little. |


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
			"limit": 25,
			"page_id": "MjpkZXNj"
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
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chat_threads_summary`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **Web API equivalent**| [`get_chat_threads_summary`](../agent-chat-web-api/#get-chat-threads-summary) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#get-chat-threads-summary)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data ype     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `order`      | No      | `string` | Possible values: `asc` - oldest chats first and `desc` - newest chats first (default)|
| `limit`      | No      | `number` | Defaul: 10, maximum: 100      |
| `page_id`   | No       | `string`  |       |

#### Response

| Parameter  | Data type     | Notes |
| -------------- | -------- | ----- |
| `found_threads`   | `string` | Number of threads in a chat    |



### `get_chat_threads`

It returns threads that the current agent has access to in a given chat.

--------------------------------------------------------------------------------

> **`get_chat_threads`** sample **request** with required params only

```json
{
	"action": "get_chat_threads",
	"payload": {
		"chat_id": "PJ0MRSHTDG"
	}
}
```

<!-- > **`get_chat_threads`** sample **request** with optional params

```json
{
	"action": "get_chat_threads",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"thread_ids": ["K600PKZON8"]
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_chat_threads`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_chat_threads",
	"type": "response",
	"success": true,
	"payload": {
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
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_chat_threads`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro`|
| **Web API equivalent**| [`get_chat_threads`](../agent-chat-web-api/#get-chat-threads) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#get-chat-threads)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data ype     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`   | No       | `array`  |       |



### `get_archives`

It returns a list of the chats an Agent has access to. Together with a **chat**, the **events** of **one thread** from this chat are returned. 

The list classification is based on threads; 1 chat per 1 thread. Thus, the same **chat** object may appear on the list several times, but each time with a different **thread**. The returned **chat** is a complete object, not only a **chat summary**. 

------------------------------------------------------

> **`get_archives`** sample **request** with required params only

```json
{
	"action": "get_archives",
	"payload": {}
}
```

<!-- > **`get_archives`** sample **request** with optional params

```json
{
	"action": "get_archives",
	"payload": {
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
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_archives`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_archives",
	"type": "response",
	"success": true,
	"payload": {
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
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_archives`  |
| **Required scopes** | `chats--all:ro` `chats--access:ro` `chats--my:ro`|
| **Web API equivalent**| [`get_archives`](../agent-chat-web-api/#get-archives)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#get-archives)</sup> |
| **Push message**| - |


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


__*)__
`<filter_type>` can take the following values:

  - `exists` (`bool`)
  - `values` (`type[]` - an array with aspecific type for property: `string`, `int` or `bool`)
  - `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

There's only one value allowed for a single property.


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
			"users": [
				// array of "User" objects
			],
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
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| [`start_chat`](../agent-chat-web-api/#start-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#start-chat)</sup> |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |

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
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`activate_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "<action>",
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
		],
		"is_followed": true
	}
	}
}
```


#### Specifics

|  |  |
|-------|--------|
| **Action**   | `activate_chat`  |
| __Required scopes *__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**|[`activate_chat`](../agent-chat-web-api/#activate-chat) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#activate-chat)</sup>|
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread) |

__*)__ 
When `chat.users` is defined, one of following scopes is required:

- `chats--all:rw`
- `chats--access:rw`
- `chats--my:rw`

#### Request

| Request object           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `chat`                   | Yes      | `object` |                                                                  |
| `chat.id`                | Yes      | `string` | The ID of the chat, which will be activated.                     |
| `chat.access`            | No       | `object` | Chat access to set, default to all agents                       |
| `chat.properties`        | No       | `object` | Initial chat properties                                          |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer).|
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                        |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                                   |



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
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| [`close_thread`](../agent-chat-web-api/#close-thread) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#close-thread)</sup> |
| **Push message**| [`thread_closed`](#thread-closed)  |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |


### `follow_chat`
Marks the chat as followed. All changes to the chat will be sent to the requester until the chat is reactivated or unfollowed. Chat members don't need to follow their chats as they should receive all chat pushes regardless of their follower status.

--------------------------------------

> **`follow_chat`** sample **request** with required params only

```json
{
	"action": "follow_chat",
	"payload": {
		 "chat_id": "PW94SJTGW6"
	}
}
```

<!-- > **`follow_chat`** sample **request** with optional params 

```json
{
	"request_id": "756", // optional
	"action": "follow_chat",
	"payload": {
		 "chat_id": "PW94SJTGW6"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`follow_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "follow_chat",
	"type": "response",
	"success": true,
	"payload": {
		"chat_id": "PW94SJTGW6"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `follow_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**|[`follow_chat`](../agent-chat-web-api/#follow-chat)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#follow-chat)</sup> |
| **Push message**| [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__
It won't be sent when the requester already follows the chat or is the chat member.

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |



### `unfollow_chat`
Removes the requester from the chat followers. After that, only key changes to the chat (like `transfer_chat` or `close_active_thread`) will be sent to the requester. Chat members cannot unfollow the chat.

--------------------------------------

> **`unfollow_chat`** sample **request** with required params only

```json
{
	"action": "unfollow_chat",
	"payload": {
		 "chat_id": "PWF6BACIKO"
	}
}
```

<!-- > **`unfollow_chat`** sample **request** with optional params 

```json
{
	"request_id": "4756", // optional
	"action": "unfollow_chat",
	"payload": {
		 "chat_id": "PWF6BACIKO"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`unfollow_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "unfollow_chat",
	"type": "response",
	"success": true,
	"payload": {
		"chat_id": "PWF6BACIKO"
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `unfollow_chat`  |
| __Required scopes__| - |
| **Web API equivalent**| [`unfollow_chat`](../agent-chat-web-api/#unfollow-chat) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#unfollow-chat)</sup> |
| **Push message**| - |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` |   |


## chat access

### `grant_access`

> **`grant_access`** sample **request** with required params only

```json
{
	"action": "grant_access",
	"payload": {
		"resource": "chat",
			"id": "PW94SJTGW6",
			"access": {
				"type": "group",
				"id": 19
       		 	}
    	}
	
}
```

<!-- > **`grant_access`** sample **request** with optional params 
```json
{
	"request_id": "680",
	"payload": {
		"resource": "chat",
			"id": "PW94SJTGW6",
			"access": {
				"type": "group",
				"id": 19
       		 }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`grant_access`** sample **response**

```json
{
	"request_id": "<request_id>", // optional
	"action": "grant_access",
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
| **Action**   | `grant_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| [`grant_access`](../agent-chat-web-api/#grant-access) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#grant-access)</sup>|
| **Push message**| [`access_granted`](#access-granted)|

#### Request

| Parameter | Required | Data ype     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |



### `revoke_access`

> **`revoke_access`** sample **request** with required params only

```json
{
	"action": "revoke_access",
	"payload": {
		"resource": "chat",
        "id": "PW94SJTGW6",
        "access": {
            "type": "group",
            "id": 19
        }
	}
}
```

<!-- > **`revoke_access`** sample **request** with optional params

```json
{
	"request_id": "<request_id>", // optional
	"action": "revoke_access",
	"payload": {
		"resource": "chat",
        "id": "PW94SJTGW6",
        "access": {
            "type": "group",
            "id": 19
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`revoke_access`** sample **response**

```json
{
	"request_id": "<request_id>", // optional
	"action": "revoke_access",
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
| **Action**   | `revoke_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| [`revoke_access`](../agent-chat-web-api/#revoke-access) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#revoke-access)</sup> |
| **Push message**| [`access_revoked`](#access-revoked)|

#### Request

| Parameter | Required | Data type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |



### `set_access`

> **`set_access`** sample **request** with required params only

```json
{
	"action": "set_access",
	"payload": {
		"resource": "chat",
        "id": "PW94SJTGW6",
        "access": {
            "type": "group",
            "id": 19
        }
	}
}
```

<!-- > **`set_access`** sample **request** with optional params

```json
{
	"request_id": "3456", // optional
	"action": "set_access",
	"payload": {
		"resource": "chat",
        "id": "PW94SJTGW6",
        "access": {
            "type": "group",
            "id": 19
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`set_access`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "set_access",
	"type": "response",
	"success": true,
	"payload": {
		// no response optional
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `set_access`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| [`set_access`](../agent-chat-web-api/#set-access) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#set-access)</sup> |
| **Push message**| [`access_set`](#access-set)|


#### Request

| Request object | Required | Type     | Notes                |
| -------------- | -------- | -------- | -------------------- |
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | resource id          |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |



### `transfer_chat`

> **`transfer_chat`** sample **request** with required params only

```json
{
	"action": "transfer_chat",
	"payload": {
		"chat_id": "PWF6BACIKO",
        "target": {
            "type": "group",
            "ids": [
                19
            ]
        }
	}
}
```

<!-- > **`transfer_chat`** sample **request** with optional params

```json
{
	"request_id": "3452", // optional
	"action": "transfer_chat",
	"payload": {
		"chat_id": "PJ0MRSHTDG",
		"target": {
			"type":  "group",
			"ids": [1]
				},
		"force": true
			},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`transfer_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "transfer_chat",
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
| **Action**   | `transfer_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw`|
| **Web API equivalent**| [`transfer_chat`](../agent-chat-web-api/#transfer-chat) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#transfer-chat)</sup> |
| **Push message**| [`chat_transferred`](#chat-transferred)  |


#### Request


| Parameter | Required | Data ype     | Notes                                                                                                                 |
| -------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `chat_id`      | Yes      | `string` | id of resource                                                               |
| `target`       | No       | `object` | If missing, chat will be transferred within current group                    |
| `target.type`  | Yes      | `string` | `group` or `agent`                                                           |
| `target.ids`   | Yes      | `array`  | `group` or `agent` ids array                                                 |
| `force`        | No       | `bool`   | If `true`, always transfers chat, otherwise fails when cannot assign any agent from requested groups, default `false` |



## chat users

### `add_user_to_chat`

Adds user to chat. Is't forbidden to add more than one `customer` user type to chat.

------------------------------------------------------------------------------------------

> **`add_user_to_chat`** sample **request** with required params only

```json
{
	"action": "add_user_to_chat",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "user_id": "user@gmail.com",
        "user_type": "agent"
	}
}
```

<!-- > **`add_user_to_chat`** sample **request** with optional params

```json
{
	"request_id": "3445", // optional
	"action": "add_user_to_chat",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "user_id": "user@gmail.com",
        "user_type": "agent"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`add_user_to_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "add_user_to_chat",
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
| **Action**   | `add_user_to_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **Web API equivalent**| [`add_user_to_chat`](../agent-chat-web-api/#add-user-to-chat) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#add-user-to-chat)</sup> |
| **Push message**| [`chat_user_added`](#chat_user_added) |

#### Request


| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | Possible values: `agent` or `customer` |


### `remove_user_from_chat`

Removes user from chat. Removing `customer` user type is forbidden. It's always possible to remove the requester from chat.

------------------------------------------------------------------------------------------

> **`remove_user_from_chat`** sample **request** with required params only

```json
{
	"action": "remove_user_from_chat",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "user_id": "user@gmail.com",
        "user_type": "agent"
	}
}
```

<!-- > **`remove_user_from_chat`** sample **request** with optional params

```json
{
	"request_id": "98464", // optional
	"action": "remove_user_from_chat",
	"payload": {
		"chat_id": "PW94SJTGW6",
        "user_id": "user@gmail.com",
        "user_type": "agent"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`remove_user_from_chat`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "remove_user_from_chat",
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
| **Action**   | `remove_user_from_chat`  |
| __Required scopes__| `chats--all:rw` `chats--access:rw` `chats--my:rw` |
| **Web API equivalent**|[`remove_user_from_chat`](../agent-chat-web-api/#remove-user-from-chat) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#remove-user-from-chat)</sup> |
| **Push message**| [`chat_user_added`](#chat_user_added) |


**Request payload**

| Request object | Required | Type     | Notes                                     |
| -------------- | -------- | -------- | ----------------------------------------- |
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | possible values are `agent` or `customer` |


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
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw` |
| **Web API equivalent**| [`send_event`](../agent-chat-web-api/#send_event)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#send_event)</sup> |
| **Push message**| - |


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
| __Required scopes__| `chats.conversation--my:rw` `chats.conversation--all:rw` |
| **Web API equivalent**| [`send_rich_message_postback`](../agent-chat-web-api/#send-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#send-rich-message-postback)</sup> |
| **Push message**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

__*)__  `incoming_rich_message_postback` will be sent only for active threads.

#### Request

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `chat_id`       | Yes      | `string` |                              |
| `event_id`      | Yes      | `string`    | 				     		   |
| `postback`      | Yes       | `object` | 							   |
| `postback.id  ` | Yes       | `string` | Postback name of the button |
| `postback.toggled`| Yes     | `bool`   | Postback toggled true/false |
| `thread_id`     | Yes       | `string` | 						       |


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
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**| [`update_chat_properties`](../agent-chat-web-api/#update-chat-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-chat-properties)</sup> |
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
| **Web API equivalent**| [`delete_chat_properties`](../agent-chat-web-api/#delete-chat-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#delete-chat-properties)</sup> |
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
| __Required scopes__| `chats.conversation--all:rw` `chats.conversation--access:rw` `chats.conversation--my:rw`|
| **Web API equivalent**|[`update_chat_thread_properties`](../agent-chat-web-api/#update-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-chat-thread-properties)</sup> |
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
| **Web API equivalent**| [`delete_chat_thread_properties`](../agent-chat-web-api/#delete-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#delete-chat-thread-properties)</sup> |
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
| **Web API equivalent**| [`update_event_properties`](../agent-chat-web-api/#update-event-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-event-properties)</sup> |
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
| **Web API equivalent**| [`delete_event_properties`](../agent-chat-web-api/#delete-event-properties)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#delete-event-properties)</sup> |
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
| **Web API equivalent**|[`tag_chat_thread`](../agent-chat-web-api/#tag-chat-thread) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#tag-chat-thread)</sup> |
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
| **Web API equivalent**|[`untag_chat_thread`](../agent-chat-web-api/#untag-chat-thread) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#untag-chat-thread)</sup> |
| **Push message**| [`chat_thread_untagged`](#chat-thread-untagged) |

#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to remove the tag from   |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to remove the tag from |
| `tag`    		 | Yes      | `string` | Tag name											  |


## customers


### `get_customers`

It returns customers list.

---------------------------------------------------------------------------

> **`get_customers`** sample **request** with required params only

```json
{
	"action": "get_customers",
	"payload": {}
}
```

<!-- > **`get_customers`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "get_customers",
	"payload": {
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
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`get_customers`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "get_customers",
	"type": "response",
	"success": true,
	"payload": {
		"customers": [
		// an array of "User > Customer" objects
	],
	"total_customers": 2340,
	"next_page_id": "MTUxNzM5ODEzMTQ5Ng==", // optional
	"previous_page_id": "MTUxNzM5ODEzMTQ5Ng==" // optional
	}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Action**   | `get_customers`  |
| __Required scopes__| `customers:ro`|
| **Web API equivalent**| [`get_customers`](../agent-chat-web-api/#get-customers) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#get-customers)</sup> |
| **Push message**| - |

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


### `create_customer`

> **`create_customer`** sample **request** with required params only

```json
{
	"action": "create_customer",
	"payload": {}
}
```

<!-- > **`create_customer`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "create_customer",
	"payload": {
		"email": "customer1@example.com",
		"avatar": "https://domain.com/avatars/1.jpg",
		"fields": {
			"some_key": "some_value"
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`create_customer`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "create_customer",
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
| **Action**   | `create_customer`  |
| __Required scopes__| `customers:rw`|
| **Web API equivalent**|[create_customer](../agent-chat-web-api/#create-customer) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#create-customer)</sup> |
| **Push message**| [`customer_created`](#customer-created) |

#### Request


| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |


### `update_customer`

> **`update_customer`** sample **request** with required params only

```json
{
	"action": "update_customer",
	"payload": {
		"customer_id": "646d53b8-ba76-48bf-7ef1-f6d61ec4ec44",
        "name": "John Doe"
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
| **Web API equivalent**| [`update_customer`](../agent-chat-web-api/#update-customer) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-customer)</sup> |
| **Push message**| [`customer_updated`](#customer-updated) |

#### Request


| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `customer_id`  | Yes      | `string` | UUID v4 format is required     |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |

Apart from `customer_id`, which is a required parameter, you also need to include **one of the optional** parameters.


### `ban_customer`

Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

------------------------------------------------------------------------------------------------

> **`ban_customer`** sample **request** with required params only

```json
{
	"action": "ban_customer",
	"payload": {
		"customer_id": "3cd19fff-f852-4402-59ce-ebd03af3f15a",
        "ban": {
            "days": 3
        }
	}
}
```

<!-- > **`ban_customer`** sample **request** with optional params

```json
{
	"request_id": "125", // optional
	"action": "ban_customer",
	"payload": {
		"customer_id": "3cd19fff-f852-4402-59ce-ebd03af3f15a",
        "ban": {
            "days": 3
        }
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
``` -->

> **`ban_customer`** sample **response** 

```json
{
	"request_id": "<request_id>", // optional
	"action": "ban_customer",
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
| **Action**   | `ban_customer`  |
| __Required scopes__| `customers.ban:rw` |
| **Web API equivalent**| [`ban_customer`](../agent-chat-web-api/#ban-customer)<sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#ban-customer)</sup> |
| **Push message**| [`customer_banned`](#customer-banned) |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `customer_id`  | Yes      | `string` |       |
| `ban`          | Yes      | `object` |       |
| `ban.days`     | Yes      | `number` |       |


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
		"push_notifications": {
			"firebase_token": "JDa8813Ka92mmKda00dsdkAKDA0",
			"platform": "ios"
	},
	"application": {
		"name": "SmartClient - Chrome",
		"version": "4.1.2.1231 (57.0.2987.133)"
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
| `token`                             | Yes      | `string` | SSO Token                                                      |
| `timezone`                          | No       | `string` |                                                               |
| `reconnect`                         | No       | `bool`   | Reconnecting sets status to last known state instead of default   |
| `push_notifications`                | No       | `object` |                                                                        |
| `push_notifications.firebase_token` | No       | `string` | Firebase device token to allow connecting this instance with existing push notification instance (to be seen as 1 instance) |
| `push_notifications.platform`       | Yes      | `string` | OS platform; possible values:`ios`, `android`. Required only when `push_notifications` is included.                            |
| `application`                       | No       | `object` |                                                                        |
| `application.name`                  | No       | `string` | Application name                                                       |
| `application.version`               | No       | `string` | Application version                                                       |


#### Response

| Parameter                     | Req./Optional | Data type     | Notes                                                       |
| ----------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `access`                             | optional      | ? | -                                                      |
| `properties`                          | optional       | ? |         -                                                      |


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
| **Web API equivalent**|[`update_agent`](../agent-chat-web-api/#update-agent) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-agent)</sup> |
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
| __Required scopes__| `chats--access:ro` `chats--all:ro`|
| **Web API equivalent**| [`update_last_seen_timestamp`](../agent-chat-web-api/#update-last-seen-timestamp) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#update-last-seen-timestamp)</sup> |
| **Push message**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


#### Request


| Parameter | Required | Data type     | Notes |
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
| **Web API equivalent**|[`send_typing_indicator`](../agent-chat-web-api/#send-typing-indicator) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#send-typing-indicator)</sup> |
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
| **Web API equivalent**|[`multicast`](../agent-chat-web-api/#multicast) <sup>[![LiveChat Link](link.svg)](../agent-chat-web-api/#multicast)</sup> |
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





















