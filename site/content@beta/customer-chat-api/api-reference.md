<div class="hide">

# Customer Chat API

* [Introduction](#introduction)
  * [Web API](#web-api)
  * [Real-Time Messaging API](#real-time-messaging-api)
  * [Authentication](#authentication)
  * [Events order](#events-order)
* [Examples](#examples)
  * [JavaScript](#javascript)
  * [Go](#go)
  * [Python](#python)
* [Objects](#objects)
  * [Chat](#chat)
  * [Thread](#thread)
  * [User](#user)
  * [Event](#event)
  * [Typing indicator](#typing-indicator)
  * [Sneak peek](#sneak-peek)
  * [Scopes](#scopes)
  * [Properties](#properties)
* [Errors handling](#errors-handling)
  * [Format](#format)
  * [Possible errors](#possible-errors)
* [Methods](#methods)
  * [Login](#login)
  * [Get chats summary](#get-chats-summary)
  * [Get chat threads](#get-chat-threads)
  * [Get chat threads summary](#get-chat-threads-summary)
  * [Get groups status](#get-groups-status)
  * [Get predicted agent](#get-predicted-agent)
  * [Get url details](#get-url-details)
  * [Start chat](#start-chat)
  * [Send event](#send-event)
  * [Send file](#send-file)
  * [Send rich message postback](#send-rich-message-postback)
  * [Send sneak peek](#send-sneak-peek)
  * [Close thread](#close-thread)
  * [Update customer](#update-customer)
  * [Update customer page](#update-customer-page)
  * [Update chat properties](#update-chat-properties)
  * [Update chat thread properties](#update-chat-thread-properties)
  * [Update event properties](#update-event-properties)
  * [Update last seen timestamp](#update-last-seen-timestamp)
  * [Check goals](#check-goals)
* [Pushes](#pushes)
  * [Incoming chat thread](#incoming-chat-thread)
  * [Incoming event](#incoming-event)
  * [Incoming rich message postback](#incoming-rich-message-postback)
  * [Incoming multicast](#incoming-multicast)
  * [Incoming typing indicator](#incoming-typing-indicator)
  * [Customer disconnected](#customer-disconnected)
  * [Thread closed](#thread-closed)
  * [Access set](#access-set)
  * [Customer updated](#customer-updated)
  * [Customer page updated](#customer-page-updated)
  * [Customer side storage updated](#customer-side-storage-updated)
  * [Chat properties updated](#chat-properties-updated)
  * [Chat thread properties updated](#chat-thread-properties-updated)
  * [Event properties updated](#event-properties-updated)  
  * [Last seen timestamp updated](#last-seen-timestamp-updated)
  * [Chat user added](#chat-user-added)
  * [Chat user removed](#chat-user-removed)
  * [Chat transferred](#chat-transferred)
</div>

# Introduction to API

This documentation describes version **v3.0** of customer-api.

<div class="callout type-info">Throughout the text we will use the term <strong>"client"</strong> to describe a service (an application, a script, an integration, etc.) which uses LiveChat Agent API.</div>

## Web API

Web API is similar to REST API. A client can send a **request message** that results in getting a **response message**.

### Requests

**API endpoint**

| HTTP method | Endpoint |
|--------|----------------|
| `POST` | `https://api.livechatinc.com/v3.0/customer/action/<action>` |

**Required headers**

| Header | Value | Notes |
| --- | --- | --- |
| `Content-Type` | `multipart/form-data; boundary=<boundary>` | Valid for `send_file` action |
| | `application/json` | Valid for every action except `send_file` |
| `Authorization` | `Bearer <token>` | Access token |

A client should send query string params in every request to Web API:

| Param | Required | Type | Notes |
| --- | --- | --- | --- |
| `license_id` | Yes | Integer | LiveChat account ID |

### Messages format

**Request**
```js
{
	"payload": {
		// optional
	},
}
```

## Real-Time Messaging API

Real-Time Messaging API (RTM API) is based on a websocket-like connection. A client can send **request message** that results in getting **response message**. It can also get **push messages** anytime.

### Connection

**API endpoints**

| Transport | Endpoint |
|--------|----------------|
| `websocket` | `wss://api.livechatinc.com/v3.0/customer/rtm/ws` |

Client must send query string param when connecting to RTM API:

| Param | Required | Type | Notes |
| --- | --- | --- | --- |
| `license_id` | Yes | Integer | LiveChat account ID |

**Example**

```
https://api.livechatinc.com/v3.0/customer/rtm/ws?license_id=123456789
```

#### Ping

A client should ping the server each 15 seconds, otherwise the connection will be closed after about one minute of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (in web browsers), a client should use a protocol message with `ping` action.

### Messages format

**Request**
```js
{
	"request_id": "<request_id>", // optional
	"action": "<action>",
	"payload": {
		// optional
	}
}
```

**Response**
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
	"request_id": "<request_id>", // optional, applies only to requester
	"action": "<action>",
	"type": "push",
	"payload": {
		// optional
	}
}
```

## Authentication
Customer authentication is handled by access tokens. See how to obtain an access token in [Authorization](/beta-docs/authorization/#customer-authorization-flow) section.

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

You don't need to wonder if you should use `chat_id` or `chatID` parameter in your API call. Instead, just look up the `Chat` object structure to know how to use it in the request or when parsing the response.

Objects can include other objects. For example, `Chat` object may return `users` array which is a list of `User` objects.

Please ignore fields with prefix `__priv_`. These fields may change between minor versions.

## Thread
```js
{
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"active": true,
	"order": 123123,
	"user_ids": ["john@gmail.com"],
	"events": [
		// array of "Event" objects
	],
	"properties": {
		// "Properties" object
	},
	"access": {
		// "Access" object
	}

}
```
* `active` takes the following values:
  * `true` (thread still active)
  * `false` (thread no longer active)

* `properties` is optional
* `access` is optional

## Chat
```js
{
	"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"users": [
		// array of "User" objects
	],
	"threads": [
		// array of "Thread" objects
	],
	"properties": {
		// "Properties" object
	},
	"access": {
		// "Access" object
	}
}
```
* `properties` is optional
* `access` is optional

## User

### Customer

```js
{
	"id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"type": "customer",
	"name": "John Smith",
	"email": "john@gmail.com",
	"fields": {
		"custom field name": "custom field value"
	},
	"present": true,
	"last_seen_timestamp": 1473433500
}
```

### Agent

```js
{
	"id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"type": "agent",
	"name": "Support Team",
 	"avatar": "cdn.livechatinc.com/avatars/1.png",
	"present": true,
	"last_seen_timestamp": 1473433500
}
```

## Event

### Message

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12312.301231238591134",
	"order": 1, // generated server-side
	"type": "message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"postback": {
		"id": "action_call",
		"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"event_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
		"type": "phone",
		"value": "790034890"
	},
	"properties": {
		// "Properties" object
	}
}
```
* `postback` is optional
* `postback.type` is required only if `postback.value` is present and vice versa
* `custom_id` is optional
* `properties` is optional

### System message

It cannot be sent by a user.

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"order": 1, // generated server-side
	"type": "system_message",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"system_message_type": "thread_archived"
}
```

### Annotation

An annotation does not create a new thread. It just adds an event to the last thread without extending thread duration.

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12312.301231238591134",
	"order": 1, // generated server-side
	"type": "annotation",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "Example annotation",
	"annotation_type": "rating",
	"properties": {
		// "Properties" object
	}
}
```
* `custom_id` is optional
* `text` is optional
* `properties` is optional

### Filled form
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12312.301231238591134",
	"order": 4, // generated server-side
	"type": "filled_form",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
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
			"id": "14734335045456",
			"label": "Your email",
			"required": true,
			"value": "jan.kowalski@gmail.com"
		},
		{
			"type": "radio",
			"id": "14734335045457",
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
			"id": "14734335045458",
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
			"id": "14734335045459",
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
* `custom_id` is optional
* `properties` is optional

### File
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12312.301231238591134",
	"order": 1, // generated server-side
	"type": "file",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
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
* `custom_id` is optional
* `properties` is optional
* `width`, `height`, `thumbnail_url` and `thumbnail2x_url` is optional and available only for images
* supported images types: `png`, `jpeg` and `gif`.

### Custom

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "12312.301231238591134",
	"order": 1, // generated server-side
	"type": "custom",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"content": {
		"custom": {
			"nested": "json"
		}
	},
	"properties": {
		// "Properties" object
	}
}
```
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
		}, {
			"type": "phone",
			"text": "value",
			"value": "790034890",
			"postback_id": "action_call",
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
* `buttons` may contain 1-11 `button` objects

* `template_id` describes how the event should be presented in an app
* `elements.buttons.postback_id` describes the action sent via `send_rich_message_postback` method
* multiple buttons (even from different elements) can contain the same `postback_id`; calling `send_rich_message_postback` with this id will add user to all these buttons at once.
* `elements.buttons.user_ids` describes users that sent the postback with `"toggled": true`


## Typing indicator
```js
{
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500,
	"is_typing": true
}
```

## Sneak peek
```js
{
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500,
	"text": "hello there"
}
```

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

<div class="callout type-info">This section describes properties object format only, to read more about properties click [here](/beta-docs/apis-overview/#properties).</div>

```js
{
	"<property_namespace>": {
		"<property_name>": {
			"value": < property_value > // <property_value> type depends on the property configuration
		}
	}
}
```

## Sample properties
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

```js
{
	"error": {
		"type": "misdirected_request",
		"message": "Wrong region",
		"data": { // optional
			"region": "dal"
		}
	}
}
```

## Possible errors

| Type | Default Message | Notes |
|--------|----------------|---|
| `internal` | Internal server error | |
| `customer_banned` | Customer is banned | |
| `validation` | Wrong format of request | |
| `authorization` | Authorization error | Customer is not allowed to perform action |
| `authentication` | Authentication error | Invalid / expired access token |
| `license_expired` | License expired | |
| `request_timeout` | Request timed out | Timeout threshold is 15 seconds |
| `unsupported_version` | Unsupported version | Unsupported version of protocol |
| `misdirected_request` | Wrong region | Client's request should be performed to another region |


\* `misdirected_request` error returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

# Methods

## Login

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `login` | ✓ | - | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `token` | Yes | OAuth token from customer accounts |
| `group_id` | No | |
| `customer.name` | No | |
| `customer.email` | No | |
| `customer.fields` | No | map in `"key": "value"` format |
| `customer_page.url` | No | |
| `customer_page.title` | No | |
| `referrer` | No | |
| `customer_side_storage` | No | map in `"key": "value"` format |


**Note about customer_side_storage**

We are using `customer_side_storage` to keep some data on client side. You should pass a map from `customer_side_storage_updated` push payload to this field.

**Sample request payload**
```js
{
	"token": "Bearer p-cjQcfhTqego5I48WeAPw",
	"group_id": 1,
	"customer_page": {
		"url": "https://www.livechatinc.com/"
	}
}
```

**Sample response payload**
```js
{
	"customer_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"has_active_thread": true,
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
		"static_config_version": "3435.4545",
		"predicted_agent": {
			"id": "cf756f02812909107e844ae41cba1530",
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
				"id": "cf756f02812909107e844ae41cba1530",
				"name": "Bart",
				"type": "agent",
				"avatar": "cdn.livechatinc.com/avatars/1.png",
				"job_title": "Support Agent"
			},
			"displayed_first_time": true
		}
	}
}
```

## Get chats summary

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_chats_summary` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `offset` | No | Default is 0, maximum is 100 |
| `limit` | No | Default is 10, maximum is 25 |

**Sample request payload**
```js
{
	"offset": 0,
	"limit": 25
}
```

**Sample response payload**
```js
{
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
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"thread_order": 343544565,
				"event": {
					// "Event > Message" object
				}
			},
			"system_message": {
				"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
				"thread_order": 343544565,
				"event": {
					// "Event > System message" object
				}
			},
			...
		}
	}],
	"total_chats": 20
}
```


## Get chat threads

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_chat_threads` | ✓ | ✓ | - |

**Request payload**

| Request object | Required |
|----------------|----------|
| `chat_id` | Yes |
| `thread_ids` | Yes |

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
		"properties": {
			// "Properties" object
		},
		"access": {
			// "Access" object
		},
		"threads": [
			// Thread object
		]
	}
}
```

## Get chat threads summary

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_chat_threads_summary` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes |
| `offset` | No | Default is 0 |
| `limit` | No | Default is 25, maximum is 100 |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"offset": 0,
	"limit": 100
}
```

**Sample response payload**
```js
{
	"threads_summary": [{
			"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
			"order": 129846129847,
			"total_events": 1
		},
		{
			"id": "b0c22fdd-fb71-40b5-bfc6-a8a0bc3117f6",
			"order": 129846129848,
			"total_events": 0
		}
	],
	"total_threads": 4
}
```

## Get groups status

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_groups_status` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `all` | No | If set to true then you will get status for all groups |
| `groups` | No | table of group id's |

**Sample request payload**
```js
{
	`groups`: [1, 2, 3]
}
```

**Sample response payload**
```js
{
	"groups_status": {
		//1,2,3 are group ids, online/offline/online_for_queue are statuses of the groups
		1: "online",
		2: "offline",
		3: "online_for_queue"
	}
}
```

## Get predicted agent

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_predicted_agent` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|

**Sample request payload**
```js
{
}
```

**Sample response payload**
```js
{
	"agent": {
        "id": "example_id",
        "name": "example_name",
        "avatar": "https://example.avatar/example.com"
    }
}
```

## Get URL details

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_url_details` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `url` | Yes | Valid website url |

**Sample request payload**
```js
{
	"url": "https://livechatinc.com"
}
```

**Sample response payload**
```js
{
	"title": "LiveChat | Live Chat Software and Help Desk Software",
	"description": "LiveChat - premium live chat software and help desk software for business. Over 24 000 companies from 150 countries use LiveChat. Try now, chat for free!",
	"image_url": "s3.eu-central-1.amazonaws.com/labs-fraa-livechat-thumbnails/96979c3552cf3fa4ae326086a3048d9354c27324.png",
	"image_width": 200,
	"image_height": 200,
	"url": "https://livechatinc.com"
}
```

## Start chat

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `start_chat` | ✓ | ✓ | [`incoming_chat_thread`](#incoming-chat-thread) |

Note: customer details must be sent to server before the chat can be started (see [`update customer`](#update-customer) method).

**Request payload**

| Request object | Required | Notes |
|----------------|----------|---|
| `chat.access` | No | Chat a to set, defaults to all agents |
| `chat.properties` | No | Initial chat properties |
| `chat.thread.events` | No | Initial chat events array |
| `chat.thread.properties` | No | Initial chat thread properties |

**Sample request payload**
```js
{
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
				"custom_id": "12312.301231238591134",
				"text": "hello there"
			}, {
				"type": "system_message",
				"custom_id": "12312.301231238591135",
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
		"properties": {
			// "Properties" object
		},
		"scopes": {
			// "Scopes" object
		},
		"thread": {
			// "Thread" object
		}
	}
}
```

## Send event

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_event` | ✓ | ✓ | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`](#incoming-chat-thread)* |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Request payload**

| Request object | Required | Notes                    |
|----------------|----------|--------------------------|
| `chat_id`      | Yes      | Id of the chat that we want to send the message to |
| `event`        | Yes      | Event object             |
| `attach_to_last_thread`| No| If `true`, adds event to last thread, otherwise creates new one, default `false`|

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"event": {
		"type": "message",
		"text": "hello world",
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
| `payload.custom_id`        | Yes      | |
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

## Send sneak peek

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `send_sneak_peek` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id` | Yes | Id of the chat that we want to send the sneak peek to |
| `sneak_peek_text` | Yes | Sneak peek text |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"sneak_peek_text": "hello world"
}
```

No response payload.

## Close thread

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `close_thread` | ✓ | ✓ | [`thread_closed`](#thread-closed) |

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

## Update chat properties

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_chat_properties` | ✓ | ✓ | [`chat_properties_updated`](#chat-properties-updated) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id`      | Yes      | Id of the chat that we want to set property for |
| `properties`   | Yes      | Chat properties to set |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"properties": {
		"rating": {
			"score": 1,
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

**Request payload**

| Request object | Required | Notes                                              |
|----------------|----------|----------------------------------------------------|
| `chat_id`      | Yes      | Id of the chat that we want to set property for    |
| `thread_id`    | Yes      | Id of the thread that we want to set property for  |
| `properties  ` | Yes      | Chat properties to set                             |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "EW2WQSA8",
	"properties": {
		"rating": {
			"score": 1,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

## Update event properties

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_event_properties` | ✓ | ✓ | [`event_properties_updated`](#event-properties-updated) |

**Request payload**

| Request object | Required | Notes                                              |
|----------------|----------|----------------------------------------------------|
| `chat_id`      | Yes      | Id of the chat that we want to set property for    |
| `thread_id`    | Yes      | Id of the thread that we want to set property for  |
| `event_id`     | Yes      | Id of the event that we want to set property for  |
| `properties  ` | Yes      | Chat properties to set                             |

**Sample request payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "EW2WQSA8",
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

No response payload.

## Update last seen timestamp

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_last_seen_timestamp` | ✓ | ✓ | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated) |

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `chat_id`      | Yes      |       |
| `timestamp` | No | |


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

## Update customer

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_customer` | ✓ | ✓ | [`customer_updated`](#customer-updated) |


**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `name`      | No      |  |
| `email`      | No      |  |
| `fields`      | No      | key value object |

**Sample request payload**
```js
{
	"name": "John Doe",
	"fields": {
		"company_size": "10-100"
	}
}
```

**Sample response payload**
```js
{
	"customer": {
		// "User > Customer" object
	}
}
```


## Update customer page

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `update_customer_page` | ✓ | - | [`customer_page_updated`](#customer-page-updated) |

User agent and referrer is updated by default using the browser’s headers.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `url`      | Yes      |  |
| `title`      | No      |  |

**Sample request payload**
```js
{
	"url": "https://livechatinc.com/pricing"
	"title": "Livechat - Pricing",
}
```

## Check goals

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `check_goals` | - | ✓ | - |

This method is used to check goals when customer is offline. You should call this method to provide goals params for server when customers limit is reached. 
Works only for offline customers.

**Request payload**

| Request object | Required | Notes |
|----------------|----------|-------|
| `page_url`     |  Yes     |       |
| `customer_fields` | Yes 	| 		|
| `group_id`	 |  Yes     |       |


**Sample request payload**
```js
{
	`page_url`: "https://mypage.com",
	`customer_fields`: {
		"field1": "value1"
	},
	`group_id`: 0
}
```

No response payload.

# Pushes
Server => Client methods are used for keeping the application state up-to-date. They are available only in `websocket` transport.

## Incoming chat thread

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_chat_thread` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat` | |

**Sample push payload**
```js
{
	"chat": {
		"id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
		"users": [
			// array of "User" objects
		],
		"properties": {
			// "Properties" object
		},
		"scopes": {
			// "Scopes" object
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

| Object | Notes |
|--------------------|-------------|
| `chat_id`   | |
| `thread_id` | |
| `event`     | |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0a",
	"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
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

| Object         | Notes    |
|----------------|----------|
| `author_id`       |          |
| `content`       |          |


**Sample push payload**
```js
{
	"author_id": "jack@gmail.com",
	"content": {
		"example": {
			"nested": "json"
		}
	}
}
```

## Incoming typing indicator

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `incoming_typing_indicator` | ✓ | - |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `thread_id` | |
| `typing_indicator` | |

**Sample request payload**
```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "123-123-123-321",
	"typing_indicator": {
		// "Typing indicator" object
	}
}
```

## Customer disconnected

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_disconnected` | ✓ | - |

**Push payload**

| Object | Notes |
|--------|------------------|
| `reason` | |

**Sample push payload**
```js
{
	"reason": "misdirected_request",
	"data": { // optional
		"region": "fra"
	}
}
```

### Possible reasons
| Type | Notes |
|--------|----------------|
| `customer_banned` | Customer has been banned |
| `too_many_connections` | Customer reached max number of connections |
| `license_not_found` | License with specified ID doesn't exist |
| `unsupported_version` | Connecting to unsupported version of Customer API |
| `ping_timeout` | Not receiving ping for some time from customer |
| `inactivity_timeout` | Customer didn't chat nor did change page in past 30 min |
| `internal_error` | Internal error |
| `misdirected_request` | Customer connected to server in wrong region |

\* Reason `misdirected_request` returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

## Thread closed

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `thread_closed` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `thread_id` | |
| `user_id` | Missing if thread was closed by router |

**Sample payload**
```js
{
	"chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"thread_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d" // optional
}
```

## Access set

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `access_set` | ✓ | ✓ |

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

## Customer updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_updated` | ✓ | - |

**Push payload**

| Object | Notes |
|--------|------------------|
| `customer` | |


**Sample push payload**
```js
{
	"customer": {
		// "User > Customer" object
	}
}
```

## Customer page updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_page_updated` | ✓ | - |

**Push payload**

| Object | Notes |
|--------|------------------|
| `url` |  |
| `title` |  |
| `timestamp` | |

**Sample payload**
```js
{
	"url": "https://livechatinc.com/pricing",
	"title": "pricing",
	"timestamp": 123456789
}
```


## Customer side storage updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `customer_side_storage_updated` | ✓ | |

Content of `customer_side_storage` map should be kept on client side (for example in browsers local storage) and sent in [login](#login).

**Push payload**

| Object | Notes |
|--------|------------------|
| `customer_side_storage` | map in `"key": "value"` format |

**Sample payload**
```js
{
	'customer_side_storage': {
		"customer_visits": "1"
	}
}
```


## Chat properties updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_properties_updated` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently updated |

**Sample payload**
```js
{
	"chat_id": "123-123-123-123",
	"properties": {
		"rating": {
			"comment": {
				"value": "gooood"
			}
		}
	}
}
```


## Chat thread properties updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `chat_thread_properties_updated` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `thread_id` | |
| `properties` | this is not full properties object, this push shows only properties wchich was recently updated |

**Sample payload**
```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "E2WDHA8A",
	"properties": {
		"rating": {
			"comment": {
				"value": "goooood"
			}
		}
	}
}
```

## Event properties updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `event_properties_updated` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `thread_id` | |
| `event_id` | |
| `properties` | this is not full properties object, this push shows only properties wchich was recently updated |

**Sample payload**
```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "E2WDHA8A",
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

## Last seen timestamp updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `last_seen_timestamp_updated` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `user_id` | |
| `chat_id` | |
| `thread_id` | |
| `timestamp` | |

**Sample payload**
```js
{
	"user_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"chat_id": "123-123-123-123",
	"thread_id": "123-123-123-321",
	"timestamp": 123456789
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
| `thread_id`       |          |
| `user`       |          |
| `user_type`       | possible values are `agent`, `customer`          |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"thread_id": "85f3bfc9-06c1-434e-958b-2a5239b07df3",
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
| `thread_id`       |          |
| `user_id`       |          |
| `user_type`       | possible values are `agent`, `customer`          |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"thread_id": "85f3bfc9-06c1-434e-958b-2a5239b07df3",
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
| `thread_id`       |          |
| `requester_id` | |
| `type`       | `agent` or `group` |
| `ids`       | `group` or `agent` ids array  |

**Sample push payload**
```js
{
	"chat_id": "75a90b82-e6a4-4ded-b3eb-cb531741ee0d",
	"thread_id": "85f3bfc9-06c1-434e-958b-2a5239b07df3",
	"requester_id" : "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"type": "agent",
	"ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
}
```
