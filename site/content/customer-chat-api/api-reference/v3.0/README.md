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
  * [Access](#access)
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
  * [Activate chat](#activate-chat)
  * [Send event](#send-event)
  * [Send file](#send-file)
  * [Upload file](#upload-file)
  * [Send rich message postback](#send-rich-message-postback)
  * [Send sneak peek](#send-sneak-peek)
  * [Close thread](#close-thread)
  * [Update chat properties](#update-chat-properties)
  * [Update chat thread properties](#update-chat-thread-properties)
  * [Update event properties](#update-event-properties)
  * [Update last seen timestamp](#update-last-seen-timestamp)
  * [Update customer](#update-customer)
  * [Update customer page](#update-customer-page)
  * [Set customer fields](#set-customer-fields)
  * [Check goals](#check-goals)
  * [Delete chat properties](#delete-chat-properties)
  * [Delete chat thread properties](#delete-chat-thread-properties)
  * [Delete event properties](#delete-event-properties)
  * [Get form](#get-form)
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
  * [Chat properties deleted](#chat-properties-deleted)
  * [Chat thread properties deleted](#chat-thread-properties-deleted)
  * [Event properties deleted](#event-properties-deleted)
  * [Event updated](#event-updated)
</div>

# Introduction

This documentation describes version **v3.0** of customer-api.

<div class="callout type-info">Throughout the text we will use the term <strong>"client"</strong> to describe a service (an application, a script, an integration, etc.) which uses LiveChat Agent API.</div>

## Web API

Web API is similar to REST API. A client can send a **request message** that results in getting a **response message**.

### Requests

**API endpoint**

| HTTP method | Endpoint                                                    |
| ----------- | ----------------------------------------------------------- |
| `POST`      | `https://api.livechatinc.com/v3.0/customer/action/<action>` |

**Required headers**

| Header          | Value                                      | Notes                                     |
| --------------- | ------------------------------------------ | ----------------------------------------- |
| `Content-Type`  | `multipart/form-data; boundary=<boundary>` | Valid for `send_file` action              |
|                 | `application/json`                         | Valid for every action except `send_file` |
| `Authorization` | `Bearer <token>`                           | Access token                              |

A client should send query string params in every request to Web API:

| Param        | Required | Type    | Notes               |
| ------------ | -------- | ------- | ------------------- |
| `license_id` | Yes      | Integer | LiveChat account ID |

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

| Transport   | Endpoint                                         |
| ----------- | ------------------------------------------------ |
| `websocket` | `wss://api.livechatinc.com/v3.0/customer/rtm/ws` |

Client must send query string param when connecting to RTM API:

| Param        | Required | Type    | Notes               |
| ------------ | -------- | ------- | ------------------- |
| `license_id` | Yes      | Integer | LiveChat account ID |

**Example**

```
https://api.livechatinc.com/v3.0/customer/rtm/ws?license_id=123456789
```

#### Authorization

A client must authorize himself by [logging in](#login) in 30 seconds, otherwise the connection will be closed. 


#### Ping

After successful authorization, client should ping the server each 15 seconds, otherwise the connection will be closed after about 30 seconds of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (in web browsers), a client should use a protocol message with `ping` action.
Until authorization is completed, ping is a no-op.

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
Customer authentication is handled by access tokens. See how to obtain an access token in [Authorization](https://developers.livechatinc.com/beta-docs/authorization/#customer-authorization-flow) section.

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
	"id": "K600PKZON8",
	"active": true,
	"order": 3,
	"user_ids": ["agent1@example.com"],
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
	"id": "PJ0MRSHTDG",
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
	"email": "customer1@example.com",
	"avatar": "https://domain.com/avatars/1.jpg",
	"fields": {
		"custom field name": "custom field value"
	},
	"present": true,
	"last_seen_timestamp": 1473433500
}
```
* `avatar` is optional
* `fields` is optional

When chat is archived `fields` field is not present.

### Agent

```js
{
	"id": "agent1@example.com",
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
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "message",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"postback": {
		"id": "action_call",
		"thread_id": "K600PKZON8",
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
* `text` max raw text size is 16KB (it't not equal to text characters count - one UTF-8 character like emoji 😁 can use up to 4 bytes), if you want to send more, please split it into more messages

### System message

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"order": 1, // generated server-side
	"type": "system_message",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"system_message_type": "thread_archived",
	"text_vars": {
		"var1": "value1"
	}
}
```
* `recipients` can take the following values: `all` (default for system events), `agents`
* `system_message_type` is required
* `text_vars` is optional

### Annotation

An annotation does not create a new thread. It just adds an event to the last thread without extending thread duration.

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
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
* `text` is optional, max raw text size is 16KB (it't not equal to text characters count - one UTF-8 character like emoji 😁 can use up to 4 bytes), if you want to send more, please split it into more messages

### Filled form
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 4, // generated server-side
	"type": "filled_form",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"properties": {
		// "Properties" object
	},
	"form_id": "154417206262605962",
	"fields": [{
		"type": "name",
		"id": "154417206262603539",
		"label": "Your name",
		"answer": "Jan Kowalski"
	}, {
		"type": "email",
		"id": "154417206262601584",
		"label": "Your email",
		"answer": "jan.kowalski@gmail.com"
	}, {
		"type": "radio",
		"id": "154417206262602571",
		"label": "Chat purpose",
		"answer": {
				"id": "0",
				"label": "Support"
		}
	}, {
		"type": "checkbox",
		"id": "154417206262604640",
		"label": "Company industry",
		"answers": [{
			"id": "0"
			"label": "automotive"
		}, {
			"id": "1"
			"label": "it"
		}]
	}, {
		"type": "group_chooser",
		"id": "154417206262605324",
		"label": "Choose department",
		"answer": {
			"group_id": 1,
			"label": "Marketing"
		}
	}]
}
```
* `custom_id` and `properties` are optional
* supported field types:
  * for open questions (text answer): `name`, `email`, `question` and `textarea`
  * for single choice questions: `radio`, `select`
  * for multiple choice questions: `checkbox`
  * for group choice questions: `group_chooser`

### File
```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "file",
	"author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"timestamp": 1473433500, // generated server-side
	"properties": {
		// "Properties" object
	},
	"name": "image25.png", // generated server-side
	"url": "https://domain.com/asdsfdsf.png",
	"thumbnail_url": "https://domain.com/thumbnail.png", // generated server-side
	"thumbnail2x_url": "https://domain.com/thumbnail2x.png", // generated server-side
	"content_type": "image/png", // generated server-side
	"size": 123444, // generated server-side
	"width": 640, // generated server-side
	"height": 480 // generated server-side
}
```
* `custom_id` is optional
* `properties` is optional
* `url` must point to LiveChat CDN (see [`upload_file`](#upload-file))
* `width`, `height`, `thumbnail_url` and `thumbnail2x_url` is optional and available only for images
* supported images types: `png`, `jpeg` and `gif`

### Custom

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
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
	"custom_id": "31-0C-1C-07-DB-16",
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
			"user_ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
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
`group_ids` is required, group 0 means that all agents can see it.

```js
{
	"access": {
		"group_ids": [1, 2]
	}
}
```

## Properties

<div class="callout type-info">This section describes properties object format only, to read more about properties click [here](https://developers.livechatinc.com/beta-docs/platform-overview/#properties).</div>

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

| Type                    | Default Message              | Notes                                                  |
| ----------------------- | ---------------------------- | ------------------------------------------------------ |
| `internal`              | Internal server error        |                                                        |
| `customer_banned`       | Customer is banned           |                                                        |
| `validation`            | Wrong format of request      |                                                        |
| `authorization`         | Authorization error          | Customer is not allowed to perform action              |
| `authentication`        | Authentication error         | Invalid / expired access token                         |
| `license_expired`       | License expired              |                                                        |
| `request_timeout`       | Request timed out            | Timeout threshold is 15 seconds                        |
| `unsupported_version`   | Unsupported version          | Unsupported version of protocol                        |
| `misdirected_request`   | Wrong region                 | Client's request should be performed to another region |
| `group_unavailable`     | Group unavailable            | No agent available for group                           |
| `entity_too_large`      | Upload limit exceeded (10MB) | Client's request is to large                           |
| `group_offline`         | Group offline                | Group is offline (has no online agents)                |
| `users_limit_reached`   | users limit reached          | customers limit reached                                |
| `wrong_product_version` | Wrong product version        |                                                        |
| `license_not_found`     | License not found            | License with specified ID doesn't exist                |
| `group_not_found`       | Group not found              | Requested group with given id could not be found       |


\* `misdirected_request` error returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

# Methods

## Login

| Action  | RTM API | Web API | Push message |
| ------- |:-------:|:-------:|:------------:|
| `login` |    ✓    |    -    |      -       |

**Request payload**

| Request object          | Required | Type     | Notes                                              |
| ----------------------- | -------- | -------- | -------------------------------------------------- |
| `token`                 | Yes      | `string` | OAuth token from customer accounts                 |
| `group_id`              | No       | `number` |                                                    |
| `customer`              | No       | `object` |                                                    |
| `customer.name`         | No       | `string` |                                                    |
| `customer.email`        | No       | `string` |                                                    |
| `customer.avatar`       | No       | `string` | url to customer avatar                             |
| `customer.fields`       | No       | `object` | map in `"key": "value"` format                     |
| `customer_page.url`     | No       | `string` |                                                    |
| `customer_page.title`   | No       | `string` |                                                    |
| `referrer`              | No       | `string` |                                                    |
| `customer_side_storage` | No       | `object` | map in `"key": "value"` format                     |
| `is_mobile`             | No       | `bool`   | Indicator if login is performed from mobile device |


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

## Get chats summary

| Action              | RTM API | Web API | Push message |
| ------------------- |:-------:|:-------:|:------------:|
| `get_chats_summary` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type     | Notes                        |
| -------------- | -------- | -------- | ---------------------------- |
| `offset`       | No       | `number` | Default is 0, maximum is 100 |
| `limit`        | No       | `number` | Default is 10, maximum is 25 |

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
```


## Get chat threads

| Action             | RTM API | Web API | Push message |
| ------------------ |:-------:|:-------:|:------------:|
| `get_chat_threads` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`   | Yes      | `array`  |       |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
}
```

**Sample response payload**
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
		"threads": [
			// array of "Thread" objects
		]
	}
}
```

## Get chat threads summary

| Action                     | RTM API | Web API | Push message |
| -------------------------- |:-------:|:-------:|:------------:|
| `get_chat_threads_summary` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type     | Notes                         |
| -------------- | -------- | -------- | ----------------------------- |
| `chat_id`      | Yes      | `string` |                               |
| `offset`       | No       | `number` | Default is 0                  |
| `limit`        | No       | `number` | Default is 25, maximum is 100 |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"offset": 0,
	"limit": 100
}
```

**Sample response payload**
```js
{
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
```

\* `threads_summary` is sorted descending by `order`

## Get groups status

| Action              | RTM API | Web API | Push message |
| ------------------- |:-------:|:-------:|:------------:|
| `get_groups_status` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type    | Notes                                                  |
| -------------- | -------- | ------- | ------------------------------------------------------ |
| `all`          | No       | `bool`  | If set to true then you will get status for all groups |
| `groups`       | No       | `array` | table of group id's                                    |

**Sample request payload**
```js
{
	"groups": [1, 2, 3, 4]
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

**Group Not Found:** If you send `group_id` of group that does not exists, then this `id` won't be included in resposne payload, like `id` 4 in example above.

## Get predicted agent

| Action                | RTM API | Web API | Push message |
| --------------------- |:-------:|:-------:|:------------:|
| `get_predicted_agent` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `group_id`     | No       | `number` | limit agents to selected group |

**Sample request payload**
```js
{
}
```

**Sample response payload**
```js
{
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

## Get URL details

| Action            | RTM API | Web API | Push message |
| ----------------- |:-------:|:-------:|:------------:|
| `get_url_details` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object | Required | Type     | Notes             |
| -------------- | -------- | -------- | ----------------- |
| `url`          | Yes      | `string` | Valid website url |

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

| Action       | RTM API | Web API |                  Push message                   |
| ------------ |:-------:|:-------:|:-----------------------------------------------:|
| `start_chat` |    ✓    |    ✓    | [`incoming_chat_thread`](#incoming-chat-thread) |

**Request payload**

| Request object           | Required | Type     | Notes                                                                    |
| ------------------------ | -------- | -------- | ------------------------------------------------------------------------ |
| `chat`                   | No       | `object` |                                                                          |
| `chat.access`            | No       | `object` | Chat access to set, defaults to all agents                               |
| `chat.properties`        | No       | `object` | Initial chat properties                                                  |
| `chat.thread`            | No       | `object` |                                                                          |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                                |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                                           |
| `continuous`             | No       | `bool`   | Start chat as continuous (online group is not required), default `false` |

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
}
```

**Sample response payload**
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

## Activate chat

| Action          | RTM API | Web API |                  Push message                   |
| --------------- |:-------:|:-------:|:-----------------------------------------------:|
| `activate_chat` |    ✓    |    ✓    | [`incoming_chat_thread`](#incoming-chat-thread) |

**Request payload**

| Request object           | Required | Type     | Notes                                                       |
| ------------------------ | -------- | -------- | ----------------------------------------------------------- |
| `chat`                   | Yes      | `object` |                                                             |
| `chat.id`                | Yes      | `string` | ID of the chat will be activated                            |
| `chat.access`            | No       | `object` | Chat access to set, defaults to all agents                  |
| `chat.properties`        | No       | `object` | Initial chat properties                                     |
| `chat.thread`            | No       | `object` |                                                             |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                   |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                              |
| `continuous`             | No       | `bool`   | Set chat continuous mode. When unset leaves mode unchanged. |

**Sample request payload**
```js
{
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
}
```

**Sample response payload**
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
		]
	}
}
```

\* `threads` array contains only newly created thread

## Send event

| Action       | RTM API | Web API |                                           Push message                                            |
| ------------ |:-------:|:-------:|:-------------------------------------------------------------------------------------------------:|
| `send_event` |    ✓    |    ✓    | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`](#incoming-chat-thread)* |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Request payload**

| Request object          | Required | Type     | Notes                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"event": {
		"type": "message",
		"text": "hello world",
		"custom_id": "31-0C-1C-07-DB-16",
	}
}
```

**Sample response payload**
```js
{
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

## Send file

| Action      | RTM API | Web API |                                           Push message                                            |
| ----------- |:-------:|:-------:|:-------------------------------------------------------------------------------------------------:|
| `send_file` |    -    |    ✓    | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`](#incoming-chat-thread)* |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Request payload**

| Request object                  | Required | Type     | Notes                                                                   |
|---------------------------------|----------|----------|-------------------------------------------------------------------------|
| `payload.chat_id`               | Yes      | `string` | Id of the chat that we want to send the file to                         |
| `payload.require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false` |
| `payload.custom_id`             | No       | `string` |                                                                         |
| `payload.file`                  | Yes      | `binary` | max 10MB                                                                |

* Content-Type header in form `Content-Type: multipart/form-data; boundary=<boundary>` is required.

**Sample request payload**
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

## Upload file

| Action        | RTM API | Web API | Push message |
| ------------- |:-------:|:-------:|:------------:|
| `upload_file` |    -    |    ✓    |       -      |

**Request payload**

| Request object | Required | Type     | Notes    |
|----------------|----------|----------|----------|
| `payload.file` | Yes      | `binary` | max 10MB |

* Content-Type header in form `Content-Type: multipart/form-data; boundary=<boundary>` is required.
* Uploaded file will be removed after 24 hours if not used in [`file`](#file) event.

**Sample request payload**
```
	payload.file=test.png
```

**Sample response payload**
```js
{
	"url": "https://cdn.livechat-static.com/api/file/lc/tmp/attachments/345678/test.png"
}
```

## Send rich message postback

| Action                       | RTM API | Web API |                             Push message                             |
| ---------------------------- |:-------:|:-------:|:--------------------------------------------------------------------:|
| `send_rich_message_postback` |    ✓    |    ✓    | [`incoming_rich_message_postback`](#incoming-rich-message-postback)* |

\* `incoming_rich_message_postback` will be sent only for active threads.

**Request payload**

| Request object     | Required | Type     | Notes                       |
| ------------------ | -------- | -------- | --------------------------- |
| `chat_id`          | Yes      | `string` |                             |
| `thread_id`        | Yes      | `string` |                             |
| `event_id`         | Yes      | `string` |                             |
| `postback`         | Yes      | `object` |                             |
| `postback.id`      | Yes      | `string` | Postback name of the button |
| `postback.toggled` | Yes      | `bool`   | Postback toggled true/false |

**Sample request payload**
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

No response payload.

## Send sneak peek

| Action            | RTM API | Web API | Push message |
| ----------------- |:-------:|:-------:|:------------:|
| `send_sneak_peek` |    ✓    |    ✓    |      -       |

**Request payload**

| Request object    | Required | Type     | Notes                                                 |
| ----------------- | -------- | -------- | ----------------------------------------------------- |
| `chat_id`         | Yes      | `string` | Id of the chat that we want to send the sneak peek to |
| `sneak_peek_text` | Yes      | `string` | Sneak peek text                                       |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"sneak_peek_text": "hello world"
}
```

No response payload.

## Close thread

| Action         | RTM API | Web API |                                    Push message                                     |
| -------------- |:-------:|:-------:|:-----------------------------------------------------------------------------------:|
| `close_thread` |    ✓    |    ✓    | [`incoming_event`](#incoming_event) <br> and <br> [`thread_closed`](#thread-closed) |

**Request payload**

| Request object | Required | Type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

No response payload.

## Update chat properties

| Action                   | RTM API | Web API |                     Push message                      |
| ------------------------ |:-------:|:-------:|:-----------------------------------------------------:|
| `update_chat_properties` |    ✓    |    ✓    | [`chat_properties_updated`](#chat-properties-updated) |

**Request payload**

| Request object | Required | Type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to set property for |
| `properties`   | Yes      | `object` | Chat properties to set                          |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
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

| Action                          | RTM API | Web API |                            Push message                             |
| ------------------------------- |:-------:|:-------:|:-------------------------------------------------------------------:|
| `update_chat_thread_properties` |    ✓    |    ✓    | [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

**Request payload**

| Request object | Required | Type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to set property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to set property for |
| `properties  ` | Yes      | `object` | Chat properties to set                            |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
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

| Action                    | RTM API | Web API |                      Push message                       |
| ------------------------- |:-------:|:-------:|:-------------------------------------------------------:|
| `update_event_properties` |    ✓    |    ✓    | [`event_properties_updated`](#event-properties-updated) |

**Request payload**

| Request object | Required | Type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to set property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to set property for |
| `event_id`     | Yes      | `string` | Id of the event that we want to set property for  |
| `properties  ` | Yes      | `object` | Chat properties to set                            |

**Sample request payload**
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

No response payload.

## Update last seen timestamp

| Action                       | RTM API | Web API |                         Push message                          |
| ---------------------------- |:-------:|:-------:|:-------------------------------------------------------------:|
| `update_last_seen_timestamp` |    ✓    |    ✓    | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated) |

**Request payload**

| Request object | Required | Type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `timestamp`    | No       | `number` |       |


**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
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

| Action            | RTM API | Web API |              Push message               |
| ----------------- |:-------:|:-------:|:---------------------------------------:|
| `update_customer` |    ✓    |    ✓    | [`customer_updated`](#customer-updated) |


**Request payload**

| Request object | Required | Type     | Notes                  |
| -------------- | -------- | -------- | ---------------------- |
| `name`         | No       | `string` |                        |
| `email`        | No       | `string` |                        |
| `avatar`       | No       | `string` | url to customer avatar |
| `fields`       | No       | `object` | key value object       |

**Sample request payload**
```js
{
	"name": "John Doe",
	"avatar": "https://domain.com/avatars/1.jpg",
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

| Action                 | RTM API | Web API |                   Push message                    |
| ---------------------- |:-------:|:-------:|:-------------------------------------------------:|
| `update_customer_page` |    ✓    |    -    | [`customer_page_updated`](#customer-page-updated) |

User agent and referrer is updated by default using the browser’s headers.

**Request payload**

| Request object | Required | Type     | Notes |
| -------------- | -------- | -------- | ----- |
| `url`          | Yes      | `string` |       |
| `title`        | No       | `string` |       |

**Sample request payload**
```js
{
	"url": "https://livechatinc.com/pricing"
	"title": "Livechat - Pricing",
}
```

## Set customer fields

| Action                | RTM API | Web API |              Push message               |
| --------------------- |:-------:|:-------:|:---------------------------------------:|
| `set_customer_fields` |    ✓    |    ✓    | [`customer_updated`](#customer-updated) |

User agent and referrer is updated by default using the browser’s headers.

**Request payload**

| Request object | Required | Type     | Notes            |
| -------------- | -------- | -------- | ---------------- |
| `fields`       | Yes      | `object` | key value object |

**Sample request payload**
```js
{
	"fields": {
		"company_size": "10-100"
	}
}
```

**Sample response payload**
```js
{
}
```

## Check goals

| Action        | RTM API | Web API | Push message |
| ------------- |:-------:|:-------:|:------------:|
| `check_goals` |    -    |    ✓    |      -       |

This method is used to check goals when customer is offline. You should call this method to provide goals params for server when customers limit is reached.
Works only for offline customers.

**Request payload**

| Request object    | Required | Type     | Notes |
| ----------------- | -------- | -------- | ----- |
| `page_url`        | Yes      | `string` |       |
| `customer_fields` | Yes      | `string` |       |
| `group_id`        | Yes      | `number` |       |


**Sample request payload**
```js
{
	"page_url": "https://mypage.com",
	"customer_fields": {
		"field1": "value1"
	},
	"group_id": 0
}
```

No response payload.

## Delete chat properties

| Action                   | RTM API | Web API |                     Push message                      |
| ------------------------ |:-------:|:-------:|:-----------------------------------------------------:|
| `delete_chat_properties` |    ✓    |    ✓    | [`chat_properties_deleted`](#chat-properties-deleted) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for |
| `properties`   | Yes      | `object` | Chat properties to delete                          |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": ["score", "comment"],
		...
	}
}
```

No response payload.

## Delete chat thread properties

| Action                          | RTM API | Web API |                            Push message                             |
| ------------------------------- |:-------:|:-------:|:-------------------------------------------------------------------:|
| `delete_chat_thread_properties` |    ✓    |    ✓    | [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

**Permissions**

* `chats.conversation--all:write` - write access for conversation data of all license chats
* `chats.conversation--my:write` - write access for conversation data of chats requester belong to

**Request payload**

| Request object | Required | Type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `properties  ` | Yes      | `object` | Chat thread properties to delete                     |

**Sample request payload**
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

No response payload.

## Delete event properties

| Action                    | RTM API | Web API |                      Push message                       |
| ------------------------- |:-------:|:-------:|:-------------------------------------------------------:|
| `delete_event_properties` |    ✓    |    ✓    | [`event_properties_deleted`](#event-properties-deleted) |

**Request payload**

| Request object | Required | Type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete property for   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete property for |
| `event_id`     | Yes      | `string` | Id of the event that we want to delete property for  |
| `properties  ` | Yes      | `object` | Event properties to delete                           |

**Sample request payload**
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

No response payload.

## Get form

| Action | RTM API | Web API | Push message |
| --- | :---: | :---: | :---: |
| `get_form` | ✓ | ✓ | - |

**Request payload**

| Request object | Required | Type | Notes |
| --- | --- | --- | --- |
| `group_id` | Yes | `number` | Id of the group that we want form |
| `type` | Yes | `string` | Type of form. Possible values: `prechat` or `postchat` |

**Sample request payload**
```js
{
	"group_id": 0,
	"type": "prechat"
}
```

**Sample response payload**
```js
{
	"enabled": true,
	"form": {
		"id": "154417206262605962",
		"fields": [{
			"id": "154417206262601237",
			"type": "header",
			"label": "Welcome to our LiveChat! Please fill in the form below before starting the chat."
		}, {
			"id": "154417206262603539",
			"type": "name",
			"label": "Name:",
			"required": false
		}, {
			"id": "154417206262601584",
			"type": "email",
			"label": "E-mail:",
			"required": false
		}, {
			"id": "154417206262602571",
			"type": "radio",
			"label": "Chat purpose:",
			"required": false,
			"options": [{
				"id": "0",
				"label": "Support",
				"checked": false
			}, {
				"id": "1",
				"label": "Sales",
				"checked": false
			}]
		}, {
			"id": "154417206262604640",
			"type": "checkbox",
			"label": "Company industry:",
			"required": false,
			"options": [{
				"id": "0",
				"label": "automotive",
				"checked": false
			}, {
				"id": "1",
				"label": "it",
				"checked": false
			}]
		}, {
			"id": "154417206262605324",
			"type": "group_chooser",
			"label": "Choose department",
			"required": true,
			"options": [{
				"group_id": 0,
				"label": "Finance",
				"checked": false
			}, {
				"group_id": 1,
				"label": "Marketing",
				"checked": false
			}]
		}, {
			"id": "154417206262607356",
			"type": "rating",
			"label": "How would you rate this chat?",
			"comment_label": "Thank you for the rating! You can leave a comment in the box below:",
			"required": false
		}]
	}
}
```

* if form is disabled, there will be no `form` object
* supported field types:
  * for headers (no answer, not in `filled_form` event): `header`
  * for open questions (text answer): `name`, `email`, `question` and `textarea`
  * for single/multiple choice questions: `radio`, `select`, `checkbox`
  * for group choice questions: `group_chooser`
  * for rating (not in `filled_form` event): `rating`


# Pushes
Server => Client methods are used for keeping the application state up-to-date. They are available only in `websocket` transport.

## Incoming chat thread

| Action                 | RTM API | Webhook |
| ---------------------- |:-------:|:-------:|
| `incoming_chat_thread` |    ✓    |    ✓    |

**Push payload**

| Object | Notes |
| ------ | ----- |
| `chat` |       |

**Sample push payload**
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

## Incoming event

| Action           | RTM API | Webhook |
| ---------------- |:-------:|:-------:|
| `incoming_event` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
| ----------- | ----- |
| `chat_id`   |       |
| `thread_id` |       |
| `event`     |       |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

## Incoming rich message postback

| Action                           | RTM API | Webhook |
| -------------------------------- |:-------:|:-------:|
| `incoming_rich_message_postback` |    ✓    |    ✓    |

**Push payload**

| Object             | Notes |
| ------------------ | ----- |
| `user_id`          |       |
| `chat_id`          |       |
| `thread_id`        |       |
| `event_id`         |       |
| `postback.id`      |       |
| `postback.toggled` |       |

**Sample push payload**
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

## Incoming multicast

| Action               | RTM API | Webhook |
| -------------------- |:-------:|:-------:|
| `incoming_multicast` |    ✓    |    -    |

**Push payload**

| Object      | Notes |
| ----------- | ----- |
| `author_id` |       |
| `content`   |       |


**Sample push payload**
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

## Incoming typing indicator

| Action                      | RTM API | Webhook |
| --------------------------- |:-------:|:-------:|
| `incoming_typing_indicator` |    ✓    |    -    |

**Push payload**

| Object             | Notes |
| ------------------ | ----- |
| `chat_id`          |       |
| `thread_id`        |       |
| `typing_indicator` |       |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"typing_indicator": {
		// "Typing indicator" object
	}
}
```

## Customer disconnected

| Action                  | RTM API | Webhook |
| ----------------------- |:-------:|:-------:|
| `customer_disconnected` |    ✓    |    -    |

**Push payload**

| Object   | Notes |
| -------- | ----- |
| `reason` |       |

**Sample push payload**
```js
{
	"reason": "misdirected_connection",
	"data": { // optional
		"region": "fra"
	}
}
```

### Possible reasons
| Type                                | Notes                                                                                       |
|-------------------------------------|---------------------------------------------------------------------------------------------|
| `customer_banned`                   | Customer has been banned                                                                    |
| `too_many_connections`              | Customer reached max number of connections                                                  |
| `too_many_unauthorized_connections` | Max number of unauthorized connections has been reached                                     |
| `customer_temporarily_blocked`       | Customer tried connecting too often after `too_many_connections` error occurred             |
| `license_not_found`                 | License with specified ID doesn't exist                                                     |
| `unsupported_version`               | Connecting to unsupported version of Customer API                                           |
| `connection_timeout`                | Not receiving ping for some time from client or connection was not authorized for some time |
| `inactivity_timeout`                | Customer didn't chat nor did change page in past 30 min                                     |
| `internal_error`                    | Internal error                                                                              |
| `misdirected_connection`            | Customer connected to server in wrong region                                                |
| `access_token_expired`              | Access token life time has elapsed                                                          |
| `product_version_changed`           | Product version has changed                                                                 |

\* Reason `misdirected_connection` returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

\* Reason `customer_temporarily_blocked` returns also correct `timeout` in optional `data` object.
With this information client is able to figure out how much time customer should wait before attempting to reconnect again.

## Thread closed

| Action          | RTM API | Webhook |
| --------------- |:-------:|:-------:|
| `thread_closed` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `chat_id`   |                                        |
| `thread_id` |                                        |
| `user_id`   | Missing if thread was closed by router |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c" // optional
}
```

## Access set

| Action       | RTM API | Webhook |
| ------------ |:-------:|:-------:|
| `access_set` |    ✓    |    ✓    |

**Push payload**

| Object     | Notes         |
| ---------- | ------------- |
| `resource` | Resource type |
| `id`       | Resource id   |
| `access`   |               |

**Sample push payload**
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

## Customer updated

| Action             | RTM API | Webhook |
| ------------------ |:-------:|:-------:|
| `customer_updated` |    ✓    |    -    |

**Push payload**

| Object     | Notes |
| ---------- | ----- |
| `customer` |       |


**Sample push payload**
```js
{
	"customer": {
		// "User > Customer" object
	}
}
```

## Customer page updated

| Action                  | RTM API | Webhook |
| ----------------------- |:-------:|:-------:|
| `customer_page_updated` |    ✓    |    -    |

**Push payload**

| Object      | Notes |
| ----------- | ----- |
| `url`       |       |
| `title`     |       |
| `timestamp` |       |

**Sample payload**
```js
{
	"url": "https://livechatinc.com/pricing",
	"title": "pricing",
	"timestamp": 123456789
}
```


## Customer side storage updated

| Action                          | RTM API | Webhook |
| ------------------------------- |:-------:|:-------:|
| `customer_side_storage_updated` |    ✓    |         |

Content of `customer_side_storage` map should be kept on client side (for example in browsers local storage) and sent in [login](#login).

**Push payload**

| Object                  | Notes                          |
| ----------------------- | ------------------------------ |
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

| Action                    | RTM API | Webhook |
| ------------------------- |:-------:|:-------:|
| `chat_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                            |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently updated |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
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

| Action                           | RTM API | Webhook |
| -------------------------------- |:-------:|:-------:|
| `chat_thread_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                 |
| `thread_id`  |                                                                                                 |
| `properties` | this is not full properties object, this push shows only properties wchich was recently updated |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
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

| Action                     | RTM API | Webhook |
| -------------------------- |:-------:|:-------:|
| `event_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                 |
| `thread_id`  |                                                                                                 |
| `event_id`   |                                                                                                 |
| `properties` | this is not full properties object, this push shows only properties wchich was recently updated |

**Sample payload**
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

## Last seen timestamp updated

| Action                        | RTM API | Webhook |
| ----------------------------- |:-------:|:-------:|
| `last_seen_timestamp_updated` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
| ----------- | ----- |
| `user_id`   |       |
| `chat_id`   |       |
| `thread_id` |       |
| `timestamp` |       |

**Sample payload**
```js
{
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"timestamp": 123456789
}
```

## Chat user added

| Action            | RTM API | Webhook |
| ----------------- |:-------:|:-------:|
| `chat_user_added` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `chat_id`   |                                         |
| `thread_id` |                                         |
| `user`      |                                         |
| `user_type` | possible values are `agent`, `customer` |

**Sample push payload**
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

## Chat user removed

| Action              | RTM API | Webhook |
| ------------------- |:-------:|:-------:|
| `chat_user_removed` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `chat_id`   |                                         |
| `thread_id` |                                         |
| `user_id`   |                                         |
| `user_type` | possible values are `agent`, `customer` |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

## Chat transferred

| Action             | RTM API | Webhook |
| ------------------ |:-------:|:-------:|
| `chat_transferred` |    ✓    |    -    |

**Push payload**

| Object         | Notes                        |
| -------------- | ---------------------------- |
| `chat_id`      |                              |
| `thread_id`    |                              |
| `requester_id` |                              |
| `type`         | `agent` or `group`           |
| `ids`          | `group` or `agent` ids array |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"requester_id" : "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"type": "agent",
	"ids": ["agent1@example.com"]
}
```

## Chat properties deleted

| Action                    | RTM API | Webhook |
| ------------------------- |:-------:|:-------:|
| `chat_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                            |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently deleted |

**Sample push payload**
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

## Chat thread properties deleted

| Action                           | RTM API | Webhook |
| -------------------------------- |:-------:|:-------:|
| `chat_thread_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                            |
| `thread_id`  |                                                                                                            |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently deleted |

**Sample push payload**
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


## Event properties deleted

| Action                     | RTM API | Webhook |
| -------------------------- |:-------:|:-------:|
| `event_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `chat_id`    |                                                                                                |
| `thread_id`  |                                                                                                |
| `event_id`   |                                                                                                |
| `properties` | this is not full properties object, this push shows only properties which was recently deleted |

**Sample payload**
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

## Event updated

| Action | RTM API | Webhook |
| --- | :---: | :---: |
| `event_updated` | ✓ | ✓ |

**Push payload**

| Object | Notes |
|--------|------------------|
| `chat_id` | |
| `thread_id` | |
| `event` | |

**Sample payload**
```js
{
	"chat_id": "123-123-123-123",
	"thread_id": "E2WDHA8A",
	"event": {
		// "Event" object
	}
}
```
