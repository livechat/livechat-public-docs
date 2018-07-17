# Introduction

This documentation describes version **v3.0** of agent-api.

<div class="callout type-info">Throughout the text we will use the term <strong>"client"</strong> to describe a service (an application, a script, an integration, etc.) which uses LiveChat Agent API.</div>

## Web API

Web API is similar to REST API. A client can send a **request message** that results in getting a **response message**.

### Requests

#### API endpoint

| HTTP method | Endpoint |
|--------|----------------|
| `POST` | `https://api.livechtinc.com/v3.0/agent/action/<action>` |

#### Required headers

| Header | Value | Notes |
| --- | --- | --- |
| `Content-Type` | `multipart/form-data; boundary=<boundary>` | Valid for `send_file` and `upload_image` action |
| | `application/json` | Valid for every action except `send_file` and `upload_image` |
| `Authorization` | `Bearer <token>` | Access token |

### Messages format

#### Request
```js
{
	"payload": {
		// optional
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
```

## Real-Time Messaging API

Real-Time Messaging API (RTM API) is based on a websocket-like connection. A client can send **request message** that results in getting **response message**. It can also get **push messages** anytime.

### Connection

#### API endpoints

| Transport | Endpoint |
|--------|----------------|
| `socket.io` | `https://api.livechatinc.com/v3.0//agentrtm/sio` |
| `websocket` | `wss://api.livechatinc.com/v3.0/agent/rtm/ws` |

##### Example

```
https://api.livechatinc.com/v3./0agent/rtm/ws
```

#### Ping

A client should ping the server each 15 seconds, otherwise the connection will be closed after about one minute of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (in web browsers), a client should use a protocol message with `ping` action.

### Messages format

#### Request
```js
{
	"request_id": "<request_id>", // optional
	"action": "<action>",
	"payload": {
		// optional
	},
	"author_id": "<author_id>" // optional, applies only to bots
}
```

#### Response
```js
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

#### Push
```js
{
	"request_id": "<request_id>", // optional, applies only to the requester
	"action": "<action>",
	"type": "push",
	"payload": {
		// optional payload
	}
}
```

## Authentication
Agent authentication is handled by access tokens. See how to obtain an access token in [Authorization](https://www.chat.io/docs/authorization/) section.

All authorization scopes are defined [here](https://www.chat.io/docs/authorization/#scopes-list). Each action in Agent API describes required scopes.

## Events order
Chat messages are not guaranteed to be sorted by server. A client should sort them by `order` parameter. Do not use `timestamp` to sort messages because two events can have the same timestamp.

# Examples
All examples have a similar structure: they connect and log in to Agent API and then start a chat by sending a welcome message (via Websocket).

## JavaScript
Sample file: [examples/example.js](./examples/example.js)

## Go
Sample file: [examples/example.go](./examples/example.go)

Remember to install the proper lib:
```
go get github.com/gorilla/websocket
```

## Python
Sample file: [examples/example.py](./examples/example.py)

Remember to install the proper lib:
```
sudo pip install websocket-client
```

# Objects
Objects are standardized data formats that are used in API requests and responses.

Please ignore fields with prefix `__priv_`. These fields may change between minor versions.

## Thread
```js
{
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"timestamp": 1473433500,
	"active": true,
	"user_ids": ["john@gmail.com"],
	"restricted_access": true,
	"events": [
		// array of "Event" objects
	], 
	"order": 112057129857,
	"properties": {
		// "Properties" object
	},
	"access": {
		// "Access" object 
	}
}
```
* `active` can take the following values:
  * `true` (thread is still active)
  * `false` (thread no longer active)
* `properties` is optional
* `access` is optional
* `restricted_access` is optional
* `events` is optional (not exists if `restricted_access` is `true`) 

## User

### Customer
```js
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"type": "customer",
	"name": "John Smith",
	"email": "john@gmail.com",
	"last_visit": {
		"started_at": "2017-10-12T15:19:21.010200Z",
		"referrer": "http://www.google.com/",
		"ip": "194.181.146.130",
		"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36",
		"geolocation": {
			"country": "Poland",
			"country_code": "PL",
			"region": "Dolnoslaskie",
			"city": "Wroclaw",
			"timezone": "Europe/Warsaw"
		},
		"last_pages": [{
			"opened_at": "2017-10-12T15:19:21.010200Z",
			"url": "https://www.livechatinc.com/",
			"title": "LiveChat - Homepage"
		}, {
			"opened_at": "2017-10-12T15:19:21.010200Z",
			"url": "https://www.livechatinc.com/tour",
			"title": "LiveChat - Tour"
		}]
	},
	"fields": {
		"custom field name": "custom field value"
	},
	"statistics": {
		"chats_count": 3,
		"threads_count": 9,
		"visits_count": 5
	},
	"__priv_lc2_customer_id": "S1525771305.dafea66e5c", //old, lc2 customer_id
	"agent_last_event_created_at": "2017-10-12T15:19:21.010200Z",
	"customer_last_event_created_at": "2017-10-12T15:19:21.010200Z",
	"created_at": "2017-10-11T15:19:21.010200Z",
	"present": true, // optional, applies only to customer located in chat object
	"last_seen_timestamp": 1473433500 // optional, applies only to customer located in chat object
}
```

Optional properties: `name`, `email`, `last_visit`, `fields`, `statistics`, `created_at`, `agent_last_event_created_at`, `customer_last_event_created_at`, `last_seen_timestamp` and `present`

### Agent
```js
{
	"id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"type": "agent",
	"name": "Support Team",
	"email": "john@gmail.com",
	"present": true,
	"last_seen_timestamp": 1473433500,
	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"routing_status": "accepting_chats"
}
```
`routing_status` will be returned only if the agent is currently logged in.

### My profile
```js
{
	"id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"type": "agent",
	"name": "Support Team",
	"email": "john@gmail.com",
	"present": true,
	"last_seen_timestamp": 1473433500,
	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"routing_status": "accepting_chats",
	"permission": "administrator"
}
```

## Event

### Message
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"recipients": "all",
	"properties": {
		// "Properties" object
	}
}
```
* `recipients` can take the following values: `all` (default), `agents`
* `custom_id` is optional
* `properties` is optional

### System message

It cannot be sent by a user.

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "system_message",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"recipients": "all"
}
```
* `recipients` can take the following: values: `all` (default), `agents`
* `custom_id` is optional

### Annotation

An annotation does not create a new thread. It just adds an event to the last thread without extending thread duration.

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "annotation",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "Sample annotation",
	"recipients": "all",
	"annotation_type": "rating",
	"properties": {
		// "Properties" object
	}
}
```
* `recipients` can take the following values: `all` (default), `agents`
* `custom_id` is optional
* `properties` is optional

### Filled form
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 4, // generated server-side
	"type": "filled_form",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"form_id": "1473433500211",
	"fields": [{
			"type": "text",
			"id": "14734335045454",
			"label": "Your name",
			"required": true,
			"value": "Jan Kowalski"
		},
		{
			"type": "email",
			"id": "14734335045455",
			"label": "Your email",
			"required": true,
			"value": "jan.kowalski@gmail.com"
		},
		{
			"type": "radio",
			"id": "14734335045456",
			"label": "Chat purpose",
			"required": true,
			"options": [{
					"value": "support",
					"checked": true
				},
				{
					"value": "sale",
					"checked": false
				}
			]
		},
		{
			"type": "checkbox",
			"id": "14734335045457",
			"label": "Company industry",
			"required": true,
			"options": [{
				"value": "automotive",
				"checked": true
			}, {
				"value": "it",
				"checked": true
			}]
		},
		{
			"type": "select",
			"id": "14734335045458",
			"label": "Country",
			"required": true,
			"options": [{
				"value": "usa",
				"checked": false
			}, {
				"value": "pl",
				"checked": true
			}]
		}
	]
}
```

* `recipients` can take the following values: `all` (default), `agents`
* `custom_id` is optional
* `properties` is optional

### File
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "file",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"name": "image25.png",
	"url": "https://domain.com/asdsfdsf.png",
	"thumbnail_url": "https://domain.com/thumbnail.png",
	"thumbnail2x_url": "https://domain.com/thumbnail2x.png",
	"content_type": "image/png",
	"size": 123444,
	"width": 640,
	"height": 480
}
```

* `recipients` can take the following values: `all` (default), `agents`
* `properties` is optional
* `custom_id` is optional
* `width`, `height`, `thumbnail_url` and `thumbnail2x_url` is optional and available only for images
* supported images types: `png`, `jpeg` and `gif`

### Custom

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "custom",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"content": {
		"custom": {
			"nested": "json"
		}
	},
	"recipients": "all",
	"properties": {
		// "Properties" object
	}
}
```

* `recipients` can take the following values: `all` (default), `agents`,
* `custom_id` is optional
* `properties` is optional

### Rich message

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12345-bhdsa",
	"order": 1, // generated server-side
	"type": "rich_message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"template_id": "cards",
	"elements": [{
		"title": "Lorem ipsum dolor.",
		"subtitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		"image": {
			"name": "image25.png",
			"url": "https://domain.com/asdsfdsf.png",
			"content_type": "image/png",
			"size": 123444,
			"width": 640,
			"height": 480
		},
		"buttons": [{
			"text": "yes",
			"postback_id": "action_yes",
			"user_ids": ["a7eef798-f8df-4364-8059-649c35c9ed0e", "a7qef880-aaaa-4364-8059-649c35c9ed0q"]
		}, {
			"text": "no",
			"postback_id": "action_no",
			"user_ids": []
		}]
	}, {
		"title": "Lorem ipsum dolor 2."
	}]
}
```

* `custom_id`, `properties` and `elements` are optional
* `elements` may contain 1-10 `element` objects
* all `elements` properties are optional: `title`, `subtitle`, `image` and `buttons`
* `image` properties (expect for `url`) are optional: `name`, `url`, `content_type`, `size`, `width` and `height`
* `buttons` may contain 1-10 `button` objects

* `template_id` describes how the event should be presented in an app
* `elements.buttons.postback_id` describes the action sent via `send_rich_message_postback` method
* multiple buttons (even from different elements) can contain the same `postback_id`; calling `send_rich_message_postback` with this id will add user to all these buttons at once.
* `elements.buttons.user_ids` describes users that sent the postback with `"toggled": true`


## Typing indicator
```js
{
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"recipients": "all",
	"timestamp": 1473433500
}
```

## Sneak peek
```js
{
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"recipients": "agents",
	"timestamp": 1473433500,
	"text": "hello there"
}
```

## Ban
```js
{
	"days": 5
}
```
* `days` - the number of days the ban will last

## Access
An empty object designates no access, which means that all agents can see it.

 ```js
 {
	"access": {
		"group_ids": [1, 2]
	}
}
 ```

## Properties

<div class="callout type-info">This section describes properties object format only, to read more about properties click [here](https://www.chat.io/docs/apis-overview/#properties).</div>

#### General format
```js
{
	"<property_namespace>": {
		"<property_name>": {
			"value": <property_value> // <property_value> type depends on the property configuration
		}
	}
}
```

#### Sample properties
```js
{
	"properties": {
		"rating": {
			"score": {
				"value": 1
			},
			"comment": {
				"value": "rated good!"
			}
		},
		"routing": {
			"idle": {
				"value": false
			}
		}
	}
}
```

# Errors handling

## Format

### Error payload

```
{
	"error": {
		"type": "authentication",
		"message": "Authentication error"
	}
}
```

## Possible errors

| Type | Default Message | Notes |
|--------|----------------|---|
| `internal` | Internal server error | |
| `validation` | Wrong format of request | |
| `authorization` | Authorization error | Agent is not allowed to perform action |
| `authentication` | Authentication error | Invalid / expired access token |
| `request_timeout` | Request timed out | Timeout threshold is 15 seconds |
| `license_expired` | License expired | |
| `unsupported_version` | Unsupported version | Unsupported version of protocol |

# Methods

## Login
It returns current agent's initial state.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `login` | ✓ | - | - |

No persmission is required to perform this action.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `token`| Yes | SSO Token |
| `timezone`| No |  |
| `reconnect` | No | Reconnecting sets status to last known state instead of default |
| `push_notifications.firebase_token` | No | Firebase device token to allow connecting this instance with existing push notification instance (to be seen as 1 instance) |
| `push_notifications.platform` | Yes | OS platform |
| `application.name` | No | Application name |
| `application.version` | No | Application version |

* `<platform>` can take the following values:
  * `ios` - iOS operating system
  * `android` - Android operating system

**Sample request payload**
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

**Sample response payload**
```js
{
	"license": {
		"id": "123",
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
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"users": [
			// array of "User" objects
		],
		"last_event_per_type": { // the last event of each type in chat
			"message": {
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"thread_order": 343544565,
				"event": {
					// "restricted_access": true 
					// or
					// Event > Message object
				}
			},
			"system_message": {
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
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
			"id": "OE070R0W0U",
			"timestamp": 1473433500,
			"user_ids": ["john@gmail.com"],
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
* `properties` is optional
* `access` is optional


## Get archives
It returns active threads that the current agent has access to.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_archives` | ✓ | ✓ | - |

**Permissions**

* `chats--all:read` - read access for all license chats

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `filters.query` | No | |
| `filters.date_from` | No | `YYYY-MM-DD` format |
| `filters.date_to` | No | `YYYY-MM-DD` format |
| `filters.agent_ids` | No | Array of agent IDs |
| `filters.team_ids` | No | Array of team IDs |
| `filters.properties.<namespace>.<name>.<filter_type>` | No | |
| `pagination.page` | No | |
| `pagination.limit` | No | |

* `<filter_type>` can take the following values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

**Sample request payload**
```js
{
	"filters": {
		"query": "search keyword",
		"agents": ["p.bednarek@livechatinc.com"],
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

**Sample response payload**
```js
{
	"chats": [{
		"chat": {
			"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
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
```

## Get filtered chats

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_filtered_chats` | ✓ | ✓ | - |

**Permissions**

* `chats--all:read` - read scope for all license chats
* `chats--access:read` - read scope for the chats in a requester access

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `filters.include_active` | No | |
| `filters.properties.<namespace>.<name>.<filter_type>` | No | |

* `<filter_type>` can take the following values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

**Sample request payload**
```js
{
	"filters": {
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
		},
		"include_active": false
	}
}
```

**Sample response payload**
```js
{
	"chats_summary": [{
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"users": [
			// array of "User" objects
		],
		"last_event_per_type": { // last event of each type in chat
			"message": {
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"thread_order": 343544565,
				"event": {
					// "restricted_access": true 
					// or
					// "Event > Message" object
				}
			},
			"system_message": {
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"thread_order": 343544565,
				"event": {
					// "restricted_access": true 
					// or
					// "Event > System message" object
				}
			},
			...
		},
		"last_thread_summary": {
			"id": "OE070R0W0U",
			"timestamp": 1473433500,
			"user_ids": ["john@gmail.com"],
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

## Get chat threads
It returns threads that the current agent has access to in a given chat.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_chat_threads` | ✓ | ✓ | - |

**Permissions**

* `chats--all:read` - read scope for all license chats
* `chats--access:read` - read scope for the chats in a requester access

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes | |
| `thread_ids` | No | |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
}
```

**Sample response payload**
```js
{
	"chat": {
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"users": [
			// array of "User" objects         
		],
		"threads": [ // optional
			// "Thread" object
		],
		"threads_summary": [{
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"order": 129846129847
			},
			{
				"thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
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

## Start chat
Starts a chat.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `start_chat` | ✓ | ✓ | [`incoming_chat_thread`](#incoming-chat-thread) |

No persmission is required to perform this action.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|---|
| `chat.properties` | No | |
| `chat.access` | No | |
| `chat.users` | No | List of existing users. Only one user is allowed (type customer) |
| `chat.thread.events` | No | List of initial chat events |
| `chat.thread.properties` | No | |

**Sample request payload**
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
			"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
			"type": "customer"
		}],
		"thread": {
			"events": [{
				"type": "message",
				"custom_id": "12312.301231238591134",
				"text": "hello there",
				"recipients": "all"
			}, {
				"type": "system_message",
				"custom_id": "12312.301231238591135",
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

**Sample response payload**
```js
{
	"chat": {
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"users": [
			// array of "User" objects
		],
		"thread": {
			// "Thread" object
		}
	}
}
```

## Add user to chat
Adds user to chat. Is't forbidden to add more than one `customer` user type to chat.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `add_user_to_chat` | ✓ | ✓ | [`chat_user_added`](#chat-user-added) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats (joining by myself)
* `chats.meta--all:write` - write access for meta data of all license chats
* `chats.meta--my:write` - write access for meta data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|---|
| `chat_id` | Yes | |
| `user_id` | Yes | |
| `user_type` | Yes | possible values are `agent` or `customer` |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"type": "agent"
}
```

No response payload.

## Remove user from chat
Removes user from chat. Removing `customer` user type is forbidden.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `remove_user_from_chat` | ✓ | ✓ | [`chat_user_removed`](#chat-user-removed) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats (joining by myself)
* `chats.meta--all:write` - write access for meta data of all license chats
* `chats.meta--my:write` - write access for meta data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|---|
| `chat_id` | Yes | |
| `user_id` | Yes | |
| `user_type` | Yes | possible values are `agent` or `customer` |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"type": "agent"
}
```

No response payload.

## Send event

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_event` | ✓ | ✓ | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`*](#incoming-chat-thread) |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes | Id of the chat that we want to send the message to |
| `event` | Yes | Event object |
| `attach_to_last_thread` | No | If `true`, adds event to last thread, otherwise creates new one, default `false` |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"attach_to_last_thread": false,
	"event": {
		"type": "message",
		"text": "hello world",
		"recipients": "agents",
		"custom_id": "12345-bhdsa"
	}
}
```

**Sample response payload**
```js
{
	"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"event": {
		// "Event" object
	}
}
```

## Send file

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_file` | - | ✓ | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`](#incoming-chat-thread)* |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Sample request (with payload)**

| Request object | Required | Notes |
|----------------|----------|-------|
| `payload.chat_id`      | Yes      | Id of the chat that we want to send the file to |
| `payload.custom_id`        | No      | |
| `payload.file`      | Yes      | max 10MB |

* Content-Type header in form `Content-Type: multipart/form-data; boundary=<boundary>` is required.

**Sample request (with payload)**
```
	payload.chat_id=a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5
	payload.custom_id=12345-bhdsa
	payload.file=test.png
```

**Sample response payload**
```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/att/345678/bhdbfhdbf87348374837483.png"
}
```

## Send rich message postback

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_rich_message_postback` | ✓ | ✓ | [`incoming_rich_message_postback`](#incoming-rich-message-postback)* |

\* `incoming_rich_message_postback` will be sent only for active threads.

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|---|
| `chat_id` | Yes | |
| `thread_id` | Yes | |
| `event_id` | Yes | |
| `postback.id` | Yes | Postback name of the button |
| `postback.toggled` | Yes | Postback toggled true/false |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "action_yes",
		"toggled": true
	}
}
```

No response payload.

## Multicast

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `multicast` | ✓ | ✓ | [`incoming_multicast`](#incoming-multicast) |

**Permissions**

* `multicast:write` - access for multicast data to agents or customers

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `scopes` | Yes | <scopes> |
| `content` | Yes | JSON message to be sent |
| `type` | No | Type of multicast message |

* `<scopes>` can take the following values:
  * `agents` (object) can take the following values:
	* `all` (`bool` - include all agents)
	* `ids` (`[]string` - array of agent's ids)
	* `groups` (`[]string` - array of group's ids)
  * `customers` (object) can take the following values:
	* `ids` (`[]string` - array of customer's ids)

At least one of `scopes` type (`agents.all`, `agents.ids`, `agents.groups`, `customers.ids`) is required.

**Sample request payload**
```js
{
	"scopes": {
		"agents": {
			"all": true,
			"ids": ["john@gmail.com", "jane@gmail.com"],
			"groups": [1, 2]
		},
		"customers": {
			"ids": ["50ce4683-22a5-48bf-5317-340f40bf6dfe"]
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

No response payload.

## Send typing indicator

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_typing_indicator` | ✓ | ✓ | - |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Notes  |
|----------------|----------|--------|
| `chat_id`      | Yes      | Id of the chat that we want to send the typing indicator to |
| `recipients`   | No       | `all` (default), `agents` |
| `is_typing`    | Yes      | Bool |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"recipients": "all",
	"is_typing": true
}
```

No response payload.

## Ban customer
Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `ban_customer` | ✓ | ✓ | [`customer_banned`](#customer-banned) |

**Permissions**

* `customers.ban:write` - access for banning customers

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `customer_id` | Yes | |
| `ban.days` | Yes | |

**Sample request payload**
```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"ban": {
		"days": 5
	}
}
```

No response payload.

## Close thread
Closes the thread. Nobody will be able to send any messages to this thread anymore.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `close_thread` | ✓ | ✓ | [`thread_closed`](#thread-closed) |

**Permissions**

* `chats.meta--all:write` - write access for meta data of all license chats
* `chats.meta--my:write` - write access for meta data of chats I belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes ||

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"
}
```

No response payload.

## Transfer chat

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `transfer_chat` | ✓ | ✓ | [`chat_transferred`](#chat-transferred) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes | id of resource |
| `type` | Yes | `group` or `agent`|
| `ids` | Yes | `group` or `agent` ids array |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"type":  "group",
	"ids": [1]
}
```

No response payload.

## Grant access

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `grant_access` | ✓ | ✓ | [`access_granted`](#access-granted) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `resource` | Yes |`chat` or `customer`|
| `id` | Yes | id of resource |
| `access.type` | Yes | `group` or `agent`|
| `access.id` | Yes | |

**Sample request payload**
```js
{
	"resource": "chat",
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

No response payload.

## Revoke access

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `revoke_access` | ✓ | ✓ | [`access_revoked`](#access-revoked) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `resource` | Yes |`chat` or `customer`|
| `id` | Yes | id of resource |
| `access.type` | Yes | `group` or `agent`|
| `access.id` | Yes | |

**Sample request payload**
```js
{
	"resource": "chat",
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

No response payload.

## Set access

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `set_access` | ✓ | ✓ | [`access_set`](#access-set) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `resource` | Yes |`chat` or `customer`|
| `id` | Yes | id of resource |
| `access.type` | Yes | `group` or `agent`|
| `access.id` | Yes | |

**Sample request payload**
```js
{
	"resource": "chat",
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"access": {
		"type": "group",
		"id": 1
	}
}
```

No response payload.


## Update agent
Updates agent properties.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_agent` | ✓ | - | [`agent_updated`](#agent-updated) |

**Permissions**

* `agents--my:write` - write access for my profile configuration
* `agents--all:write` - write access for all agents profiles configuration

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `agent_id` | No | Current agent is used by default |
| `routing_status` | No | Possible values: `accepting_chats`, `not_accepting_chats` |

**Sample request payload**
```js
{
	"routing_status": "accepting_chats"
}
```

No response payload.

## Change push notifications
Change firebase push notifications properties.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `change_push_notifications` | ✓ | - | - |

No persmission is required to perform this action.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `firebase_token` | Yes | Firebase device token |
| `platform` | Yes | OS platform |
| `enabled` | Yes | Enable or disable push notifications for requested token |

* `<platform>` can take the following values:
  * `ios` - iOS operating system
  * `android` - Android operating system

#### Example request payload
```js
{
	"firebase_token": "8daDAD9dada8ja1JADA11",
	"platform": "ios",
	"enabled": true
}
```

No response payload.

## Update chat properties

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_chat_properties` | ✓ | ✓ | [`chat_properties_updated`](#chat-properties-updated) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes | Id of the chat that we want to set property for |
| `properties` | Yes | Chat properties to set |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

No response payload.

## Update chat thread properties

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_chat_thread_properties` | ✓ | ✓ | [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id`      | Yes      | Id of the chat that we want to set property for    |
| `thread_id`    | Yes      | Id of the thread that we want to set property for  |
| `properties  ` | Yes      | Chat properties to set |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "EW2WQSA8",
	"properties": {
		"rating": {
			"score": 2,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

No response payload.

## Update last seen timestamp

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_last_seen_timestamp` | ✓ | ✓ | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated) |

**Permissions**

* `chats--all:read` - read scope for all license chats
* `chats--access:read` - read scope for the chats in a requester access

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id`      | Yes      |       |
| `timestamp`    | No       |       |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"timestamp": 123456789
}
```

**Sample response payload**
```js
{
	"timestamp": 123456789
}
```

## Add auto access rules

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `add_auto_access_rules` | ✓ | - | - |

**Permissions**

* `auto_chat_scopes:write` - write access for auto access rules configuration

**Request payload**

| Request object | Type | Required | Notes |
|----------------|------|----------|-------|
| `access` | `object` | Yes | Destination access |
| `rules` | `object` | Yes | Rules to check for scope auto |
| `description` | `string` | No | Auto access rules description |

* `access` object:
```js
{
	"scopes": {
		"groups": [1, 2]
	}
}
```

* `rules` possible rules:
  * `chat_properties.<namespace>.<name>.<filter_type>`
    * `<filter_type>` can take the following values (only one is allowed for single property):
      * `exists` (`bool`)
      * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
      * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `customer_url.<string_filter_type>`
    * `<string_filter_type>` can take the following values (only one is allowed for single customer_url):
      * `values` (`match_object[]`)
      * `exclude_values` (`match_object[]`)
    * `<match_object>` structure:
      * `value` - value to match (`string`)
      * `exact_match` - if exact match, if set to `false` a `match_object.value` will be matched as substring of `customer_url`

**Sample request payload**
```js
{
	"description": "Chats from Facebook or Twitter",
	"access": {
		"groups": [1]
	},
	"rules": {
		"chat_properties": {
			"source": {
				"type": {
					"values": ["facebook", "twitter"]
				}
			},
			"facebook": {
				"page_id": {
					"values": ["63121487121"]
				}
			}
		},
		"customer_url": {
			"values": [{
				"value": "livechatinc.com",
				"exact_match": false
			}]
		}
	}
}
```

**Sample response payload**
```js
{
	"auto_chat_scopes_id": "pqi8oasdjahuakndw9nsad9na"
}
```

## Remove auto access rules

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `remove_auto_access_rules` | ✓ | - | - |

**Permissions**

* `auto_chat_scopes:write` - write access for auto access rules configuration

**Request payload**

| Request object | Type | Required | Notes |
|----------------|------|----------|-------|
| `auto_chat_scopes_id` | `string` | Yes | auto chat scopes ID  |

**Sample request payload**
```js
{
	"auto_chat_scopes_id": "pqi8oasdjahuakndw9nsad9na"
}
```

No response payload.

## Get auto access rules config

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_auto_access_rules_config` | ✓ | - | - |

**Permissions**

* `auto_chat_scopes:read` - read access for auto access rules configuration

No request payload

**Sample response payload**
```js
{
	"auto_access_rules_config": [{
		"id": "pqi8oasdjahuakndw9nsad9na",
		"description": "Chats from Facebook or Twitter",
		"access": {
			"groups": [1]
		},
		"rules": {
			"chat_properties": {
				"source": {
					"type": {
						"values": ["facebook", "twitter"]
					}
				},
				"facebook": {
					"page_id": {
						"values": ["63121487121"]
					}
				}
			},
			"customer_url": {
				"values": [{
					"value": "livechatinc.com",
					"exact_match": false
				}]
			}
		}
	}]
}
```

## Upload image

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `upload_image` | - | ✓ | - |

No persmission is required to perform this action.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `payload.image`      | Yes      | max 10MB |

* Content-Type header in form `Content-Type: multipart/form-data; boundary=<boundary>` is required.

**Sample request payload**
```
	payload.image=test.png
```

**Sample response payload**
```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/img/24434343/dmkslfmndsfgds6fsdfsdnfsd.png",
	"path": "24434343/dmkslfmndsfgds6fsdfsdnfsd.png"
}
```

Notes:

* `url` is a ready-to-use, temporary URL, but it can expire in the future
* `path` should be used for database and must be appended to `base_url`
* `base_url` is `https://cdn.livechat-static.com/api/file/lc/img`

## Get customers
It returns customers list.

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_customers` | ✓ | - | - |

**Permissions**

* `customers:read` - read access for all license customers

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `page_id` | No | |
| `limit` | No | Default is 10, maximum is 100 |
| `order` | No | Default is `desc`  |
| `filters.country.<string_filter_type>` | No | |
| `filters.email.<string_filter_type>` | No |  |
| `filters.name.<string_filter_type>` | No |  |
| `filters.customer_id.<string_filter_type>` | No |  |
| `filters.chats_count.<range_filter_type>` | No |  |
| `filters.threads_count.<range_filter_type>` | No |  |
| `filters.visits_count.<range_filter_type>` | No |  |
| `filters.created_at.<date_range_filter_type>` | No |  |
| `filters.agent_last_event_created_at.<date_range_filter_type>` | No |  |
| `filters.customer_last_event_created_at.<date_range_filter_type>` | No |  |


* `order` can take the following values:
  * `asc` - oldest customers first
  * `desc` - newest customers first
* `<string_filter_type>` can take the following values (only one is allowed for single filter):
  * `values` (`string[]` - array of strings)
  * `exclude_values` (`string[]` - array of strings)
* `<range_filter_type>` can take the following values:
  * `lte` (`int` - less than or equal to given value)
  * `lt` (`int` - less than given value)
  * `gte` (`int` - greater than or equal to given value)
  * `gt` (`int` - greater than given value)
  * `eq` (`int` - equal to given value)
* `<date_range_filter_type>` can take the following values:
  * `lte` ( `string` - less than or equal to given value)
  * `lt` (`string` - less than given value)
  * `gte` (`string` - greater than or equal to given value)
  * `gt` (`string` - greater than given value)
  * `eq` (`string` - equal to given value)
* dates are represented in ISO 8601 format with microseconds resolution, e.g. `2017-10-12T15:19:21.010200+01:00` in specific timezone or `2017-10-12T14:19:21.010200Z` in UTC.
  

**Sample request payload**
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

**Sample response payload**
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

## Create customer

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `create_customer` | ✓ | ✓ | [`customer_created`](#customer-created) |

**Permissions**

* `customers:write` - write access for all license customers

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `name` | No |  |
| `email` | No |  |
| `fields` | No | Map in `"key": "value"` format |

**Sample request payload**
```js
{
	"email": "j.doe@domain.com",
	"fields": {
		"some_key": "some_value"
	}
}
```

**Sample response payload**
```js
{
	// "User > Customer" object
}
```

## Update customer

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_customer` | ✓ | ✓ | [`customer_updated`](#customer-updated) | |

**Permissions**

`customers:write` - write access for all license customers

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `customer_id`      | Yes      | UUID v4 format is required |
| `name`      | No      |  |
| `email`      | No      |  |
| `fields`      | No      | Map in `"key": "value"` format |

**Sample request payload**
```js
{
	"customer_id": "d4efab70-984f-40ee-aa09-c9cc3c4b0882",
	"name": "morus12",
	"fields": {
		"size": "large"
	}
}
```

**Sample response payload**
```js
{
	// "User > Customer" object
}
```

# Pushes
Server => Client methods are used for keeping the application state up-to-date. They are available only in `websocket` transport.

## Incoming chat thread

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_chat_thread` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `thread`       |          |

**Sample push payload**
```js
{
	"chat": {
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
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

## Incoming event

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_event` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `event`       |          |

**Sample push payload**
```js
{
	"chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
	"event": {
		// "Event" object
	}
}
```

## Incoming rich message postback

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_rich_message_postback` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `user_id`       |          |
| `chat_id`       |          |
| `thread_id`       |          |
| `event_id`       |          |
| `postback.id`       |          |
| `postback.toggled`       |          |

**Sample push payload**
```js
{
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "action_yes",
		"toggled": true
	}
}
```

## Incoming multicast

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_multicast` | ✓ | - |

**Push payload**

| Object         | Required | Notes    |
|----------------|----------|----------|
| `author_id` | No | |
| `content` | Yes | |
| `type` | No | |


**Sample push payload**
```js
{
	"author_id": "jack@gmail.com",
	"content": {
		"example": {
			"nested": "json"
		}
	},
	"type": "type1"
}
```

## Incoming typing indicator

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_typing_indicator` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `typing_indicator`       |          |

**Sample push payload**
```js
{
	"chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
	"typing_indicator": {
		// "Typing indicator" object
	}
}
```

## Incoming sneak peek

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_sneak_peek` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `sneak_peek`       |          |

**Sample push payload**
```js
{
	"chat_id": "85f3bfc9-06c1-434e-958b-2a5239b07de8",
	"sneak_peek": {
		// "Sneak peek" object
	}
}
```

## Customer banned

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_banned` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `customer_id`       |          |
| `ban.days`       |          |

**Sample push payload**
```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"ban": {
		"days": 5
	}
}
```

## Thread closed

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `thread_closed` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `thread_id`       |          |
| `user_id`       | Missing if thread was closed by router |

**Sample push payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d" // optional
}
```

## Access granted

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `access_granted` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `resource` | Resource type         |
| `id`       | Resource id         |
| `access`   |          |

**Sample push payload**
```js
{
	"resource": "chat",
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"access": {
		"group_ids": [
			1
		]
	}
}
```

## Access revoked

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `access_revoked` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `resource` | Resource type         |
| `id`       | Resource id         |
| `access`   |          |

**Sample push payload**
```js
{
	"resource": "chat",
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"access": {
		"group_ids": [
			1
		]
	}
}
```


## Agent updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `agent_updated` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `agent_id`       |          |
| `routing_status`       |          |

**Sample push payload**
```js
{
	"agent_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"routing_status": "accepting_chats"
}
```

## Agent disconnected

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `agent_disconnected` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `reason`       |          |

**Sample push payload**
```js
{
	"reason": "access_token_revoked"
}
```

#### Possible reasons
| Type | Notes |
|--------|----------------|
| `access_token_revoked` | Agent access token has been revoked |
| `access_token_expired` | Access token life time has elapsed  |
| `license_expired` | License has expired |
| `agent_deleted` | Agent account has ben deleted |
| `logged_out_remotely` | Agent has been logged out remotely |
| `unsupported_version` | Connecting to unsupported version of Agent API |
| `ping_timeout` | Not receiving ping for some time from customer |
| `internal_error` | Internal error |
| `too_many_connections` | Agent reached max number of connections |

## Chat properties updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_properties_updated` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `properties`       |     this is not a full properties object, this push shows only the properties which have been recently updated     |

**Sample push payload**
```js
{
	"chat_id": "123-123-123-123",
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

## Chat thread properties updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_thread_properties_updated` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `thread_id`       |          |
| `properties`       |     this is not a full properties object, this push shows only the properties which have been recently updated    |

**Sample push payload**
```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "E2WDHA8A",
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

## Last seen timestamp updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `last_seen_timestamp_updated` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `user_id`       |          |
| `chat_id`       |          |
| `timestamp`       |          |

**Sample push payload**
```js
{
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"chat_id": "123-123-123-123",
	"timestamp": 123456789
}
```

## Customer created

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_created` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `customer`       |          |

**Sample push payload**
```js
{
	"customer": {
		// "User > Customer" object
	}
}
```

## Customer updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_updated` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `customer`       |          |

**Sample push payload**
```js
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"name": "John Doe",
	"email": "john@doe.me", // optional
	"type": "customer",
	"present": false,
	"banned": false,
	"fields": {
		"custom field name": "custom field value"
	}
}
```

## Customer visit started

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_visit_started` | ✓ | - |

**Sample push payload**
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

## Customer visit ended

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_visit_ended` | ✓ | - |

**Sample push payload**
```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"visit_id": 42,
	"ended_at": "2017-10-12T15:19:21.010200Z"
}
```

## Customer page updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_page_updated` | ✓ | - |

**Sample push payload**
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

## Chat user added

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_user_added` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `user`       |          |
| `user_type`       | possible values are `agent`, `customer`          |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"user": {
		// "User > Customer" or "User > Agent" object
	},
	"user_type": "agent"
}
```

## Chat user removed

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_user_removed` | ✓ | ✓ |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `user_id`       |          |
| `user_type`       | possible values are `agent`, `customer`          |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"user_id": "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"user_type": "agent"
}
```

## Chat transferred

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_transferred` | ✓ | - |

**Push payload**

| Object         | Notes    |
|----------------|----------|
| `chat_id`       |          |
| `requester_id` | |
| `type`       | `agent` or `group` |
| `ids`       | `group` or `agent` ids array  |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"requester_id" : "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"type": "agent",
	"ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
}
```
