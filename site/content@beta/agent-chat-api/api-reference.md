<div class="hide">

# Agent Chat API

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
  * [Thread](#thread)
  * [User](#user)
  * [Event](#event)
  * [Typing indicator](#typing-indicator)
  * [Sneak peek](#sneak-peek)
  * [Ban](#ban)
  * [Access](#access)
  * [Properties](#properties)
* [Errors handling](#errors-handling)
  * [Format](#format)
  * [Possible errors](#possible-errors)
* [Methods](#methods)
  * [Login](#login)
  * [Logout](#logout)
  * [Get archives](#get-archives)
  * [Get chats summary](#get-chats-summary)
  * [Get chat threads](#get-chat-threads)
  * [Get chat threads summary](#get-chat-threads-summary)
  * [Start chat](#start-chat)
  * [Activate chat](#activate-chat)
  * [Add user to chat](#add-user-to-chat)
  * [Remove user from chat](#remove-user-from-chat)
  * [Send event](#send-event)
  * [Send file](#send-file)
  * [Send rich message postback](#send-rich-message-postback)
  * [Multicast](#multicast)
  * [Send typing indicator](#send-typing-indicator)
  * [Ban customer](#ban-customer)
  * [Close thread](#close-thread)
  * [Transfer chat](#transfer-chat)
  * [Grant access](#grant-access)
  * [Revoke access](#revoke-access)
  * [Set access](#set-access)
  * [Set away status](#set-away-status)
  * [Update agent](#update-agent)
  * [Change push notifications](#change-push-notifications)
  * [Update chat properties](#update-chat-properties)
  * [Update chat thread properties](#update-chat-thread-properties)
  * [Update event properties](#update-event-properties)
  * [Update last seen timestamp](#update-last-seen-timestamp)
  * [Upload image](#upload-image)
  * [Get customers](#get-customers)
  * [Create customer](#create-customer)
  * [Update customer](#update-customer)
  * [Delete chat properties](#delete-chat-properties)
  * [Delete chat thread properties](#delete-chat-thread-properties)
  * [Delete event properties](#delete-event-properties)
  * [Tag chat thread](#tag-chat-thread)
  * [Untag chat thread](#untag-chat-thread)
  * [Follow chat](#follow-chat)
  * [Unfollow chat](#unfollow-chat)
* [Pushes](#pushes)
  * [Incoming chat thread](#incoming-chat-thread)
  * [Incoming event](#incoming-event)
  * [Incoming rich message postback](#incoming-rich-message-postback)
  * [Incoming multicast](#incoming-multicast)
  * [Incoming typing indicator](#incoming-typing-indicator)
  * [Incoming sneak peek](#incoming-sneak-peek)
  * [Customer banned](#customer-banned)
  * [Thread closed](#thread-closed)
  * [Access granted](#access-granted)
  * [Access revoked](#access-revoked)
  * [Access set](#access-set)
  * [Agent updated](#agent-updated)
  * [Agent disconnected](#agent-disconnected)
  * [Chat properties updated](#chat-properties-updated)
  * [Chat thread properties updated](#chat-thread-properties-updated)
  * [Event properties updated](#event-properties-updated)
  * [Last seen timestamp updated](#last-seen-timestamp-updated)
  * [Customer created](#customer-created)
  * [Customer updated](#customer-updated)
  * [Customer visit started](#customer-visit-started)
  * [Customer visit ended](#customer-visit-ended)
  * [Customer page updated](#customer-page-updated)
  * [Chat user added](#chat-user-added)
  * [Chat user removed](#chat-user-removed)
  * [Chat transferred](#chat-transferred)
  * [Chat properties deleted](#chat-properties-deleted)
  * [Chat thread properties deleted](#chat-thread-properties-deleted)
  * [Event properties deleted](#event-properties-deleted)
  * [Event updated](#event-updated)
  * [Chat thread tagged](#chat-thread-tagged)
  * [Chat thread untagged](#chat-thread-untagged)
</div>

# Using API

This documentation describes version **v3.0** of agent-api.

<div class="callout type-info">Throughout the text we will use the term <strong>"client"</strong> to describe a service (an application, a script, an integration, etc.) which uses LiveChat Agent API.</div>

## Web API

Web API is similar to REST API. A client can send a **request message** that results in getting a **response message**.

### Requests

#### API endpoint

| HTTP method | Endpoint                                                 |
|-------------|----------------------------------------------------------|
| `POST`      | `https://api.livechatinc.com/v3.0/agent/action/<action>` |

#### Required headers

| Header          | Value                                      | Notes                                                        |
|-----------------|--------------------------------------------|--------------------------------------------------------------|
| `Content-Type`  | `multipart/form-data; boundary=<boundary>` | Valid for `send_file` and `upload_image` action              |
|                 | `application/json`                         | Valid for every action except `send_file` and `upload_image` |
| `Authorization` | `Bearer <token>`                           | Access token                                                 |

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

| Transport   | Endpoint                                      |
|-------------|-----------------------------------------------|
| `websocket` | `wss://api.livechatinc.com/v3.0/agent/rtm/ws` |

#### Authorization

A client must authorize himself by [logging in](#login) in 30 seconds, otherwise the connection will be closed.

#### Ping

After successful authorization, client should ping the server each 15 seconds, otherwise the connection will be closed after about 30 seconds of inactivity. If [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (in web browsers), a client should use a protocol message with `ping` action.
Until authorization is completed, ping is a no-op.

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
Agent authentication is handled by access tokens. See how to obtain an access token in [Authorization](https://developers.livechatinc.com/beta-docs/authorization/) section.

All authorization scopes are defined [here](https://developers.livechatinc.com/beta-docs/agent-chat-api/#scopes-list). Each action in Agent API describes required scopes.

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
	"id": "K600PKZON8",
	"timestamp": 1473433500,
	"active": true,
	"user_ids": ["agent1@example.com"],
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
	},
	"tags": ["bug_report"]
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
	"email": "agent1@example.com",
	"avatar": "domain.com/avatars/1.png",
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

Optional properties: `name`, `email`, `avatar`, `last_visit`, `fields`, `statistics`, `created_at`, `agent_last_event_created_at`, `customer_last_event_created_at`, `last_seen_timestamp` and `present`

When chat is archived `fields` field is not present.

### Agent
```js
{
	"id": "agent1@example.com",
	"type": "agent",
	"name": "Support Team",
	"email": "agent1@example.com",
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
	"id": "agent1@example.com",
	"type": "agent",
	"name": "Support Team",
	"email": "agent1@example.com",
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
	"recipients": "all",
	"properties": {
		// "Properties" object
	}
}
```
* `recipients` can take the following values: `all` (default), `agents`
* `postback` is optional
* `postback.type` is required only if `postback.value` is present and vice versa
* `custom_id` is optional
* `properties` is optional
* `text` is required, max raw text size is 16KB (it't not equal to text characters count - one UTF-8 character like emoji 😁 can use up to 4 bytes), if you want to send more, please split it into more messages

### System message

```js
{
	"id": "0affb00a-82d6-4e07-ae61-56ba5c36f743", // generated server-side
	"custom_id": "31-0C-1C-07-DB-16",
	"order": 1, // generated server-side
	"type": "system_message",
	"timestamp": 1473433500, // generated server-side
	"text": "hello there",
	"system_message_type": "routing.assigned",
	"text_vars": {
		"agent": "John Doe"
	}
}
```
* `recipients` can take the following values: `all` (default for system events), `agents` (for events sent via [Send event](#send-event))
* `system_message_type` is required
* `text_vars` is optional
* `custom_id` is optional

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
	"recipients": "all",
	"properties": {
		// "Properties" object
	},
	"form_id": "1473433500211",
	"fields": [{
		"type": "name",
		"id": "154417206262603539",
		"label": "Your name",
		"answer": "John Doe"
	}, {
		"type": "email",
		"id": "154417206262601584",
		"label": "Your email",
		"answer": "customer1@example.com"
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
* `recipients` can take the following values: `all` (default), `agents`
* `custom_id` and `properties` are optional
* supported field types:
  * for open questions (text answer): `name`, `email`, `question` and `textarea`
  * for single choice questions: `radio` and `select`
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
	"custom_id": "31-0C-1C-07-DB-16",
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
			"user_ids": ["b7eff798-f8df-4364-8059-649c35c9ed0c"]
		}, {
			"text": "no",
			"postback_id": "action_no",
			"user_ids": []
		}, {
			"type": "phone",
			"text": "value",
			"value": "790034890",
			"webview_height": "tall", // optional, one of compact, tall, full
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

| Type                        | Default Message              | Notes                                                  |
|-----------------------------|------------------------------|--------------------------------------------------------|
| `internal`                  | Internal server error        |                                                        |
| `validation`                | Wrong format of request      |                                                        |
| `authorization`             | Authorization error          | Agent is not allowed to perform action                 |
| `authentication`            | Authentication error         | Invalid / expired access token                         |
| `request_timeout`           | Request timed out            | Timeout threshold is 15 seconds                        |
| `license_expired`           | License expired              |                                                        |
| `unsupported_version`       | Unsupported version          | Unsupported version of protocol                        |
| `misdirected_request`       | Wrong region                 | Client's request should be performed to another region |
| `entity_too_large`          | Upload limit exceeded (10MB) | Client's request is too large                          |
| `wrong_product_version`     | Wrong product version        | License is not LiveChat 3 (probably still LiveChat 2)  |
| `license_not_found`         | License not found            | License with specified ID doesn't exist                |
| `requester_already_offline` | Requester is already offline | Could not find active agent connection on server       |

\* `misdirected_request` error returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

# Methods

## Login
It returns current agent's initial state.

| Action  | RTM API | Web API | Push message |
|---------|:-------:|:-------:|:------------:|
| `login` |    ✓    |    -    |      -       |

No persmission is required to perform this action.

**Request payload**

| Request object                      | Required | Type     | Notes                                                                                                                       |
|-------------------------------------|----------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `token`                             | Yes      | `string` | SSO Token                                                                                                                   |
| `timezone`                          | No       | `string` |                                                                                                                             |
| `reconnect`                         | No       | `bool`   | Reconnecting sets status to last known state instead of default                                                             |
| `push_notifications`                | No       | `object` |                                                                                                                             |
| `push_notifications.firebase_token` | No       | `string` | Firebase device token to allow connecting this instance with existing push notification instance (to be seen as 1 instance) |
| `push_notifications.platform`       | Yes      | `string` | OS platform                                                                                                                 |
| `application`                       | No       | `object` |                                                                                                                             |
| `application.name`                  | No       | `string` | Application name                                                                                                            |
| `application.version`               | No       | `string` | Application version                                                                                                         |

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
			},
			"tags": ["bug_report"]
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
		},
		"is_followed": true
	}]
}
```
* `properties` is optional
* `access` is optional


## Logout
Logout agent

| Action   | RTM API | Web API | Push message |
|----------|:-------:|:-------:|:------------:|
| `logout` |    ✓    |    -    |      -       |

No request payload.

No response payload.


## Get archives
It returns active threads that the current agent has access to.

| Action         | RTM API | Web API | Push message |
|----------------|:-------:|:-------:|:------------:|
| `get_archives` |    ✓    |    ✓    |      -       |

**Permissions**

* `chats--all:ro`
* `chats--access:ro`
* `chats--my:ro`

**Request payload**

| Request object                                        | Required | Type     | Notes                               |
|-------------------------------------------------------|----------|----------|-------------------------------------|
| `filters`                                             | No       | `object` |                                     |
| `filters.query`                                       | No       | `string` |                                     |
| `filters.date_from`                                   | No       | `string` | `YYYY-MM-DD` format                 |
| `filters.date_to`                                     | No       | `string` | `YYYY-MM-DD` format                 |
| `filters.agent_ids`                                   | No       | `array`  | Array of agent IDs                  |
| `filters.group_ids`                                   | No       | `array`  | Array of group IDs                  |
| `filters.properties.<namespace>.<name>.<filter_type>` | No       | `any`    |                                     |
| `pagination`                                          | No       | `object` |                                     |
| `pagination.page`                                     | No       | `number` | Default is 1, min is 1, max is 1000 |
| `pagination.limit`                                    | No       | `number` | Default is 25, min is 0, max is 100 |

* `<filter_type>` can take the following values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)

**Sample request payload**
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

**Sample response payload**
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

## Get chats summary

| Action              | RTM API | Web API | Push message |
|---------------------|:-------:|:-------:|:------------:|
| `get_chats_summary` |    ✓    |    ✓    |      -       |

**Permissions**

* `chats--all:ro`
* `chats--access:ro`
* `chats--my:ro`

**Request payload**

| Request object                                        | Required | Type     | Notes                         |
|-------------------------------------------------------|----------|----------|-------------------------------|
| `page_id`                                             | No       | `string` |                               |
| `limit`                                               | No       | `number` | Default is 10, maximum is 100 |
| `order`                                               | No       | `string` | Default is `desc`             |
| `filters`                                             | No       | `object` |                               |
| `filters.include_active`                              | No       | `bool`   | Defaults to `true`            |
| `filters.properties.<namespace>.<name>.<filter_type>` | No       | `any`    |                               |

* `order` can take the following values:
  * `asc` - oldest chats first
  * `desc` - newest chats first
* `<filter_type>` can take the following values (only one is allowed for single property):
  * `exists` (`bool`)
  * `values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
  * `exclude_values` (`type[]` - array with specific type for property: `string`, `int` or `bool`)
* `filters` must not change between requests for subsequent pages, otherwise the behaviour is undefined
* `found_chats` in response is a ballpark figure (real number of found chats can differ from it a little)

**Sample request payload**
```js
{
	"filters": {
		"properties": {
			"rating": {
				"score": {
					"values": [1]
				}
			}
		},
		"include_active": false
	},
	"page_id": "MTUxNzM5ODEzMTQ5Ng=="
}
```

**Sample response payload**
```js
{
	"chats_summary": [{
		"id": "PJ0MRSHTDG",
		"users": [
			// array of "User" objects
		],
		"last_event_per_type": { // last event of each type in chat
			"message": {
				"thread_id": "K600PKZON8",
				"thread_order": 3,
				"event": {
					// "restricted_access": true
					// or
					// "Event > Message" object
				}
			},
			"system_message": {
				"thread_id": "K600PKZON6",
				"thread_order": 1,
				"event": {
					// "restricted_access": true
					// or
					// "Event > System message" object
				}
			},
			...
		},
		"last_thread_summary": {
			"id": "K600PKZON8",
			"order": 3,
			"timestamp": 1473433500,
			"user_ids": ["agent1@example.com"],
			"properites": {
			// "Properites" object
			},
			"tags": ["bug_report"]
		},
		"properites": {
			// "Properites" object
		},
		"access": {
			// "Access" object
		},
		"is_followed": false
	}],
	"found_chats": 2340,
	"next_page_id": "MTUxNzM5ODEzMTQ5Ng==", // optional
	"previous_page_id": "MTUxNzM5ODEzMTQ5Nw==" // optional
}
```

## Get chat threads
It returns threads that the current agent has access to in a given chat.

| Action             | RTM API | Web API | Push message |
|--------------------|:-------:|:-------:|:------------:|
| `get_chat_threads` |    ✓    |    ✓    |      -       |

**Permissions**

* `chats--all:ro`
* `chats--access:ro`

**Request payload**

| Request object | Required | Type     | Notes |
|----------------|----------|----------|-------|
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`   | No       | `array`  |       |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_ids": ["K600PKZON8"]
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
		},
		"is_followed": true
	}
}
```

## Get chat threads summary
Returns summary of threads in a given chat.

| Action                     | RTM API | Web API | Push message |
|----------------------------|:-------:|:-------:|:------------:|
| `get_chat_threads_summary` |    ✓    |    ✓    |      -       |

**Permissions**

* `chats--all:ro`
* `chats--access:ro`
* `chats--my:ro`

**Request payload**

| Request object | Required | Type     | Notes                         |
|----------------|----------|----------|-------------------------------|
| `chat_id`      | Yes      | `string` |                               |
| `page_id`      | No       | `string` |                               |
| `limit`        | No       | `number` | Default is 10, maximum is 100 |
| `order`        | No       | `string` | Default is `desc`             |

* `order` can take the following values:
  * `asc` - oldest chats first
  * `desc` - newest chats first
* `found_threads` Number of threads present in chat

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"limit": 25,
	"page_id": "MjpkZXNj"
}
```

**Sample response payload**
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

## Start chat
Starts a chat.

| Action       | RTM API | Web API |                  Push message                   |
|--------------|:-------:|:-------:|:-----------------------------------------------:|
| `start_chat` |    ✓    |    ✓    | [`incoming_chat_thread`](#incoming-chat-thread) |

**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--access:rw`
* `chats.conversation--my:rw`

When `chat.users` is defined one of above scopes is required:

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object           | Required | Type     | Notes                                                            |
|--------------------------|----------|----------|------------------------------------------------------------------|
| `chat`                   | No       | `object` |                                                                  |
| `chat.properties`        | No       | `object` |                                                                  |
| `chat.access`            | No       | `object` |                                                                  |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | List of initial chat events                                      |
| `chat.thread.properties` | No       | `object` |                                                                  |
| `chat.thread.tags`       | No       | `array`  | List of initial chat thread tags                                 |
| `continuous`             | No       | `bool`   | Start chat as continuous (online group is not required)          |

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

**Sample response payload**
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

## Activate chat

| Action          | RTM API | Web API |                  Push message                   |
|-----------------|:-------:|:-------:|:-----------------------------------------------:|
| `activate_chat` |    ✓    |    ✓    | [`incoming_chat_thread`](#incoming-chat-thread) |


**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--access:rw`
* `chats.conversation--my:rw`
* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`


When `chat.users` are defined, scopes `chats--all:rw`, `chats--access:rw` or `chats--my:rw` are required.

**Request payload**

| Request object           | Required | Type     | Notes                                                            |
|--------------------------|----------|----------|------------------------------------------------------------------|
| `chat`                   | Yes      | `object` |                                                                  |
| `chat.id`                | Yes      | `string` | ID of the chat will be activated                                 |
| `chat.access`            | No       | `object` | Chat access to set, defaults to all agents                       |
| `chat.properties`        | No       | `object` | Initial chat properties                                          |
| `chat.users`             | No       | `array`  | List of existing users. Only one user is allowed (type customer) |
| `chat.thread`            | No       | `object` |                                                                  |
| `chat.thread.events`     | No       | `array`  | Initial chat events array                                        |
| `chat.thread.properties` | No       | `object` | Initial chat thread properties                                   |
| `chat.thread.tags`       | No       | `array`  | Initial chat thread tags                                         |

**Sample request payload**
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
		],
		"is_followed": true
	}
}
```

## Add user to chat
Adds user to chat. Is't forbidden to add more than one `customer` user type to chat.

| Action             | RTM API | Web API |             Push message              |
|--------------------|:-------:|:-------:|:-------------------------------------:|
| `add_user_to_chat` |    ✓    |    ✓    | [`chat_user_added`](#chat-user-added) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                     |
|----------------|----------|----------|-------------------------------------------|
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | possible values are `agent` or `customer` |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

No response payload.

## Remove user from chat
Removes user from chat. Removing `customer` user type is forbidden.

| Action                  | RTM API | Web API |               Push message                |
|-------------------------|:-------:|:-------:|:-----------------------------------------:|
| `remove_user_from_chat` |    ✓    |    ✓    | [`chat_user_removed`](#chat-user-removed) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

Is't always possible to remove requester from chat.

**Request payload**

| Request object | Required | Type     | Notes                                     |
|----------------|----------|----------|-------------------------------------------|
| `chat_id`      | Yes      | `string` |                                           |
| `user_id`      | Yes      | `string` |                                           |
| `user_type`    | Yes      | `string` | possible values are `agent` or `customer` |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"user_id": "agent1@example.com",
	"user_type": "agent"
}
```

No response payload.

## Send event

| Action       | RTM API | Web API |                                           Push message                                            |
|--------------|:-------:|:-------:|:-------------------------------------------------------------------------------------------------:|
| `send_event` |    ✓    |    ✓    | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`*](#incoming-chat-thread) |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--access:rw`
* `chats.conversation--my:rw`

**Request payload**

| Request object          | Required | Type     | Notes                                                                            |
|-------------------------|----------|----------|----------------------------------------------------------------------------------|
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |

**Sample request payload**
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
|-------------|:-------:|:-------:|:-------------------------------------------------------------------------------------------------:|
| `send_file` |    -    |    ✓    | [`incoming_event`](#incoming-event) <br> or <br> [`incoming_chat_thread`](#incoming-chat-thread)* |

\* `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread

**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--access:rw`
* `chats.conversation--my:rw`

**Request payload**

| Request object                  | Required | Type     | Notes                                                                   |
|---------------------------------|----------|----------|-------------------------------------------------------------------------|
| `payload`                       | Yes      | `object` |                                                                         |
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

## Send rich message postback

| Action                       | RTM API | Web API |                             Push message                             |
|------------------------------|:-------:|:-------:|:--------------------------------------------------------------------:|
| `send_rich_message_postback` |    ✓    |    ✓    | [`incoming_rich_message_postback`](#incoming-rich-message-postback)* |

\* `incoming_rich_message_postback` will be sent only for active threads.

**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--my:rw`

**Request payload**

| Request object     | Required | Type     | Notes                       |
|--------------------|----------|----------|-----------------------------|
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

## Multicast

| Action      | RTM API | Web API |                Push message                 |
|-------------|:-------:|:-------:|:-------------------------------------------:|
| `multicast` |    ✓    |    ✓    | [`incoming_multicast`](#incoming-multicast) |

**Permissions**

* `multicast:rw`

**Request payload**

| Request object | Required | Type     | Notes                     |
|----------------|----------|----------|---------------------------|
| `scopes`       | Yes      | `object` | <access>                  |
| `content`      | Yes      | `any`    | JSON message to be sent   |
| `type`         | No       | `string` | Type of multicast message |

* `<access>` can take the following values:
  * `agents` (object) can take the following values:
	* `all` (`bool` - include all agents)
	* `ids` (`[]string` - array of agent's ids)
	* `groups` (`[]number` - array of group's ids)
  * `customers` (object) can take the following values:
	* `ids` (`[]string` - array of customer's ids)

At least one of `access` type (`agents.all`, `agents.ids`, `agents.groups`, `customers.ids`) is required.

**Sample request payload**
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

No response payload.

## Send typing indicator

| Action                  | RTM API | Web API | Push message |
|-------------------------|:-------:|:-------:|:------------:|
| `send_typing_indicator` |    ✓    |    ✓    |      -       |

**Permissions**

* `chats.conversation--all:rw`
* `chats.conversation--access:rw`
* `chats.conversation--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                                       |
|----------------|----------|----------|-------------------------------------------------------------|
| `chat_id`      | Yes      | `string` | Id of the chat that we want to send the typing indicator to |
| `recipients`   | No       | `string` | `all` (default), `agents`                                   |
| `is_typing`    | Yes      | `bool`   | Bool                                                        |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"recipients": "all",
	"is_typing": true
}
```

No response payload.

## Ban customer
Bans the customer for a specific period of time. It immediately disconnects all active sessions of this customer and does not accept new ones during the ban lifespan.

| Action         | RTM API | Web API |             Push message              |
|----------------|:-------:|:-------:|:-------------------------------------:|
| `ban_customer` |    ✓    |    ✓    | [`customer_banned`](#customer-banned) |

**Permissions**

* `customers.ban:rw`

**Request payload**

| Request object | Required | Type     | Notes |
|----------------|----------|----------|-------|
| `customer_id`  | Yes      | `string` |       |
| `ban`          | Yes      | `object` |       |
| `ban.days`     | Yes      | `number` |       |

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

| Action         | RTM API | Web API |           Push message            |
|----------------|:-------:|:-------:|:---------------------------------:|
| `close_thread` |    ✓    |    ✓    | [`thread_closed`](#thread-closed) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object               | Required | Type     | Notes           |
| ---------------------------- | -------- | -------- | --------------- |
| `chat_id`                    | Yes      | `string` |                 |
| `require_requester_presence` | No       | `bool`   | Default `false` |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

No response payload.

## Transfer chat

| Action          | RTM API | Web API |              Push message               |
|-----------------|:-------:|:-------:|:---------------------------------------:|
| `transfer_chat` |    ✓    |    ✓    | [`chat_transferred`](#chat-transferred) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                                                                                                 |
|----------------|----------|----------|-----------------------------------------------------------------------------------------------------------------------|
| `chat_id`      | Yes      | `string` | id of resource                                                                                                        |
| `target`       | No       | `object` | If missing, chat will be transferred within current group                                                             |
| `target.type`  | Yes      | `string` | `group` or `agent`                                                                                                    |
| `target.ids`   | Yes      | `array`  | `group` or `agent` ids array                                                                                          |
| `force`        | No       | `bool`   | If `true`, always transfers chat, otherwise fails when cannot assign any agent from requested groups, default `false` |

**Sample request payload**
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

No response payload.

## Grant access

| Action         | RTM API | Web API |            Push message             |
|----------------|:-------:|:-------:|:-----------------------------------:|
| `grant_access` |    ✓    |    ✓    | [`access_granted`](#access-granted) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                |
|----------------|----------|----------|----------------------|
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

**Sample request payload**
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

No response payload.

## Revoke access

| Action          | RTM API | Web API |            Push message             |
|-----------------|:-------:|:-------:|:-----------------------------------:|
| `revoke_access` |    ✓    |    ✓    | [`access_revoked`](#access-revoked) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                |
|----------------|----------|----------|----------------------|
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

**Sample request payload**
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

No response payload.

## Set access

| Action       | RTM API | Web API |        Push message         |
|--------------|:-------:|:-------:|:---------------------------:|
| `set_access` |    ✓    |    ✓    | [`access_set`](#access-set) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                |
|----------------|----------|----------|----------------------|
| `resource`     | Yes      | `string` | `chat` or `customer` |
| `id`           | Yes      | `string` | id of resource       |
| `access`       | Yes      | `object` |                      |
| `access.type`  | Yes      | `string` | `group` or `agent`   |
| `access.id`    | Yes      | `number` |                      |

**Sample request payload**
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

No response payload.


## Set away status

| Action            | RTM API | Web API | Push message |
|-------------------|:-------:|:-------:|:------------:|
| `set_away_status` |    ✓    |    -    |      -       |


**Permissions**
* `agents--my:rw`

**Request payload**

| Request object | Required | Type   | Notes |
|----------------|----------|--------|-------|
| `away`         | Yes      | `bool` | -     |

**Sample request payload**
```js
{
	"away": true
}
```

No response payload.

## Update agent
Updates agent properties.

| Action         | RTM API | Web API |           Push message            |
|----------------|:-------:|:-------:|:---------------------------------:|
| `update_agent` |    ✓    |    ✓    | [`agent_updated`](#agent-updated) |

**Permissions**

* `agents--my:rw`
* `agents--all:rw`

**Request payload**

| Request object   | Required | Type     | Notes                                                     |
|------------------|----------|----------|-----------------------------------------------------------|
| `agent_id`       | No       | `string` | Current agent is used by default                          |
| `routing_status` | No       | `string` | Possible values: `accepting_chats`, `not_accepting_chats` |

**Sample request payload**
```js
{
	"routing_status": "accepting_chats"
}
```

No response payload.

## Change push notifications
Change firebase push notifications properties.

| Action                      | RTM API | Web API | Push message |
|-----------------------------|:-------:|:-------:|:------------:|
| `change_push_notifications` |    ✓    |    -    |      -       |

No permissions is required to perform this action.

**Request payload**

| Request object   | Required | Type   | Notes                                                    |
|------------------|----------|--------|----------------------------------------------------------|
| `firebase_token` | Yes      | string | Firebase device token                                    |
| `platform`       | Yes      | string | OS platform                                              |
| `enabled`        | Yes      | bool   | Enable or disable push notifications for requested token |

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

| Action                   | RTM API | Web API |                     Push message                      |
|--------------------------|:-------:|:-------:|:-----------------------------------------------------:|
| `update_chat_properties` |    ✓    |    ✓    | [`chat_properties_updated`](#chat-properties-updated) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                           |
|----------------|----------|----------|-------------------------------------------------|
| `chat_id`      | Yes      | `string` | Id of the chat that we want to set property for |
| `properties`   | Yes      | `object` | Chat properties to set                          |

**Sample request payload**
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

No response payload.

## Update chat thread properties

| Action                          | RTM API | Web API |                            Push message                             |
|---------------------------------|:-------:|:-------:|:-------------------------------------------------------------------:|
| `update_chat_thread_properties` |    ✓    |    ✓    | [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                             |
|----------------|----------|----------|---------------------------------------------------|
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
			"score": 2,
			"comment": "Very good, veeeery good"
		},
		...
	}
}
```

No response payload.

## Update event properties

| Action                    | RTM API | Web API |                      Push message                       |
|---------------------------|:-------:|:-------:|:-------------------------------------------------------:|
| `update_event_properties` |    ✓    |    ✓    | [`event_properties_updated`](#event-properties-updated) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                             |
|----------------|----------|----------|---------------------------------------------------|
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
|------------------------------|:-------:|:-------:|:-------------------------------------------------------------:|
| `update_last_seen_timestamp` |    ✓    |    ✓    | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated) |

**Permissions**

* `chats--all:ro`
* `chats--access:ro`

**Request payload**

| Request object | Required | Type     | Notes |
|----------------|----------|----------|-------|
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

## Upload image

| Action         | RTM API | Web API | Push message |
|----------------|:-------:|:-------:|:------------:|
| `upload_image` |    -    |    ✓    |      -       |

No persmission is required to perform this action.

**Request payload**

| Request object  | Required | Type     | Notes    |
|-----------------|----------|----------|----------|
| `payload`       | Yes      | `object` | max 10MB |
| `payload.image` | Yes      | `binary` | max 10MB |

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

| Action          | RTM API | Web API | Push message |
|-----------------|:-------:|:-------:|:------------:|
| `get_customers` |    ✓    |    ✓    |      -       |

**Permissions**

* `customers:ro`

**Request payload**

| Request object                                                    | Required | Type     | Notes                         |
|-------------------------------------------------------------------|----------|----------|-------------------------------|
| `page_id`                                                         | No       | `string` |                               |
| `limit`                                                           | No       | `number` | Default is 10, maximum is 100 |
| `order`                                                           | No       | `string` | Default is `desc`             |
| `filters`                                                         | No       | `object` |                               |
| `filters.country.<string_filter_type>`                            | No       | `object` |                               |
| `filters.email.<string_filter_type>`                              | No       | `object` |                               |
| `filters.name.<string_filter_type>`                               | No       | `object` |                               |
| `filters.customer_id.<string_filter_type>`                        | No       | `object` |                               |
| `filters.chats_count.<range_filter_type>`                         | No       | `object` |                               |
| `filters.threads_count.<range_filter_type>`                       | No       | `object` |                               |
| `filters.visits_count.<range_filter_type>`                        | No       | `object` |                               |
| `filters.created_at.<date_range_filter_type>`                     | No       | `object` |                               |
| `filters.agent_last_event_created_at.<date_range_filter_type>`    | No       | `object` |                               |
| `filters.customer_last_event_created_at.<date_range_filter_type>` | No       | `object` |                               |


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

`filters` must not change between requests for subsequent pages, otherwise the behaviour is undefined.

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

| Action            | RTM API | Web API |              Push message               |
|-------------------|:-------:|:-------:|:---------------------------------------:|
| `create_customer` |    ✓    |    ✓    | [`customer_created`](#customer-created) |

**Permissions**

* `customers:rw`

**Request payload**

| Request object | Required | Type     | Notes                          |
|----------------|----------|----------|--------------------------------|
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |

**Sample request payload**
```js
{
	"email": "customer1@example.com",
	"avatar": "https://domain.com/avatars/1.jpg",
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

| Action            | RTM API | Web API |              Push message               |   |
|-------------------|:-------:|:-------:|:---------------------------------------:|---|
| `update_customer` |    ✓    |    ✓    | [`customer_updated`](#customer-updated) |   |

**Permissions**

`customers:rw`

**Request payload**

| Request object | Required | Type     | Notes                          |
|----------------|----------|----------|--------------------------------|
| `customer_id`  | Yes      | `string` | UUID v4 format is required     |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | url to customer avatar         |
| `fields`       | No       | `object` | Map in `"key": "value"` format |

**Sample request payload**
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

**Sample response payload**
```js
{
	// "User > Customer" object
}
```

## Delete chat properties

| Action                   | RTM API | Web API |                     Push message                      |
|--------------------------|:-------:|:-------:|:-----------------------------------------------------:|
| `delete_chat_properties` |    ✓    |    ✓    | [`chat_properties_deleted`](#chat-properties-deleted) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                              |
|----------------|----------|----------|----------------------------------------------------|
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
|---------------------------------|:-------:|:-------:|:-------------------------------------------------------------------:|
| `delete_chat_thread_properties` |    ✓    |    ✓    | [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                                |
|----------------|----------|----------|------------------------------------------------------|
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
|---------------------------|:-------:|:-------:|:-------------------------------------------------------:|
| `delete_event_properties` |    ✓    |    ✓    | [`event_properties_deleted`](#event-properties-deleted) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                                |
|----------------|----------|----------|------------------------------------------------------|
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

## Tag chat thread

| Action            | RTM API | Web API |                Push message                 |
|-------------------|:-------:|:-------:|:-------------------------------------------:|
| `tag_chat_thread` |    ✓    |    ✓    | [`chat_thread_tagged`](#chat-thread-tagged) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                       |
|----------------|----------|----------|---------------------------------------------|
| `chat_id`      | Yes      | `string` | Id of the chat that we want to add tag to   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to add tag to |
| `tag`          | Yes      | `string` | Tag name                                    |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

No response payload.

## Untag chat thread

| Action              | RTM API | Web API |                  Push message                   |
|---------------------|:-------:|:-------:|:-----------------------------------------------:|
| `untag_chat_thread` |    ✓    |    ✓    | [`chat_thread_untagged`](#chat-thread-untagged) |

**Permissions**

* `chats--all:rw`
* `chats--access:rw`
* `chats--my:rw`

**Request payload**

| Request object | Required | Type     | Notes                                            |
|----------------|----------|----------|--------------------------------------------------|
| `chat_id`      | Yes      | `string` | Id of the chat that we want to remove tag from   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to remove tag from |
| `tag`          | Yes      | `string` | Tag name                                         |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

No response payload.

## Follow chat

Marks the chat as followed. All changes to the chat will be sent to the requester until the chat is reactivated or unfollowed.
Chat members do not need to follow their chats as they should receive all chat pushes regardless of their follower status.

| Action         | RTM API | Web API |                  Push message                    |
|----------------|:-------:|:-------:|:------------------------------------------------:|
| `follow_chat`  |    ✓    |    ✓    | [`incoming_chat_thread`](#incoming-chat-thread)* |

\* It won't be sent when the requester already follows the chat or is its member.

**Permissions**

* `chats--all:ro`
* `chats--access:ro`

**Request payload**

| Request object               | Required | Type     | Notes           |
| ---------------------------- | -------- | -------- | --------------- |
| `chat_id`                    | Yes      | `string` |                 |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

No response payload.

## Unfollow chat

Removes the requester from the chat followers. After that only key changes to the chat (like [`transfer_chat`](#transfer-chat) or [`close_active_thread`](#close-active-thread)) will be sent to the requester.
Chat members cannot unfollow the chat.

| Action          | RTM API | Web API |           Push message            |
|-----------------|:-------:|:-------:|:---------------------------------:|
| `unfollow_chat` |    ✓    |    ✓    |                 -                 |

No persmission is required to perform this action.

**Request payload**

| Request object               | Required | Type     | Notes           |
| ---------------------------- | -------- | -------- | --------------- |
| `chat_id`                    | Yes      | `string` |                 |

**Sample request payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
}
```

No response payload.

# Pushes
Server => Client methods are used for keeping the application state up-to-date. They are available only in `websocket` transport.

## Incoming chat thread

| Action                 | RTM API | Webhook |
|------------------------|:-------:|:-------:|
| `incoming_chat_thread` |    ✓    |    ✓    |

**Push payload**

| Object   | Notes |
|----------|-------|
| `thread` |       |

**Sample push payload**
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
		},
		"is_followed": false
	}
}
```

## Incoming event

| Action           | RTM API | Webhook |
|------------------|:-------:|:-------:|
| `incoming_event` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
|-------------|-------|
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
|----------------------------------|:-------:|:-------:|
| `incoming_rich_message_postback` |    ✓    |    ✓    |

**Push payload**

| Object             | Notes |
|--------------------|-------|
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
|----------------------|:-------:|:-------:|
| `incoming_multicast` |    ✓    |    -    |

**Push payload**

| Object      | Required | Notes |
|-------------|----------|-------|
| `author_id` | No       |       |
| `content`   | Yes      |       |
| `type`      | No       |       |


**Sample push payload**
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

## Incoming typing indicator

| Action                      | RTM API | Webhook |
|-----------------------------|:-------:|:-------:|
| `incoming_typing_indicator` |    ✓    |    -    |

**Push payload**

| Object             | Notes |
|--------------------|-------|
| `chat_id`          |       |
| `thread_id`        |       |
| `typing_indicator` |       |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"typing_indicator": {
		// "Typing indicator" object
	}
}
```

## Incoming sneak peek

| Action                | RTM API | Webhook |
|-----------------------|:-------:|:-------:|
| `incoming_sneak_peek` |    ✓    |    -    |

**Push payload**

| Object       | Notes |
|--------------|-------|
| `chat_id`    |       |
| `thread_id`  |       |
| `sneak_peek` |       |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"sneak_peek": {
		// "Sneak peek" object
	}
}
```

## Customer banned

| Action            | RTM API | Webhook |
|-------------------|:-------:|:-------:|
| `customer_banned` |    ✓    |    -    |

**Push payload**

| Object        | Notes |
|---------------|-------|
| `customer_id` |       |
| `ban.days`    |       |

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

| Action          | RTM API | Webhook |
|-----------------|:-------:|:-------:|
| `thread_closed` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                  |
|-------------|----------------------------------------|
| `chat_id`   |                                        |
| `thread_id` |                                        |
| `user_id`   | Missing if thread was closed by router |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c" // optional
}
```

## Access granted

| Action           | RTM API | Webhook |
|------------------|:-------:|:-------:|
| `access_granted` |    ✓    |    ✓    |

**Push payload**

| Object     | Notes         |
|------------|---------------|
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

## Access revoked

| Action           | RTM API | Webhook |
|------------------|:-------:|:-------:|
| `access_revoked` |    ✓    |    ✓    |

**Push payload**

| Object     | Notes         |
|------------|---------------|
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

## Access set

| Action       | RTM API | Webhook |
|--------------|:-------:|:-------:|
| `access_set` |    ✓    |    ✓    |

**Push payload**

| Object     | Notes         |
|------------|---------------|
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


## Agent updated

| Action          | RTM API | Webhook |
|-----------------|:-------:|:-------:|
| `agent_updated` |    ✓    |    -    |

**Push payload**

| Object           | Notes |
|------------------|-------|
| `agent_id`       |       |
| `routing_status` |       |

**Sample push payload**
```js
{
	"agent_id": "agent1@example.com",
	"routing_status": "accepting_chats"
}
```

## Agent disconnected

| Action               | RTM API | Webhook |
|----------------------|:-------:|:-------:|
| `agent_disconnected` |    ✓    |    -    |

**Push payload**

| Object   | Notes |
|----------|-------|
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

#### Possible reasons
| Type                                | Notes                                                                                       |
|-------------------------------------|---------------------------------------------------------------------------------------------|
| `access_token_revoked`              | Agent access token has been revoked                                                         |
| `access_token_expired`              | Access token life time has elapsed                                                          |
| `license_expired`                   | License has expired                                                                         |
| `agent_deleted`                     | Agent account has ben deleted                                                               |
| `agent_logged_out_remotely`         | Agent has been logged out remotely                                                          |
| `agent_disconnected_by_server`      | Agent has been disconnected by server                                                       |
| `unsupported_version`               | Connecting to unsupported version of Agent API                                              |
| `connection_timeout`                | Not receiving ping for some time from client or connection was not authorized for some time |
| `internal_error`                    | Internal error                                                                              |
| `too_many_connections`              | Agent reached max number of connections                                                     |
| `too_many_unauthorized_connections` | Max number of unauthorized connections has been reached                                     |
| `misdirected_connection`            | Agent connected to server in wrong region                                                   |
| `product_version_changed`           | Product version has been changed                                                            |
| `license_not_found`                 | License with specified ID doesn't exist                                                     |

\* Reason `misdirected_connection` returns also correct `region` in optional `data` object.
With this information client is able to figure out where he should be connected.

## Chat properties updated

| Action                    | RTM API | Webhook |
|---------------------------|:-------:|:-------:|
| `chat_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
|--------------|------------------------------------------------------------------------------------------------------------|
| `chat_id`    |                                                                                                            |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently updated |

**Sample push payload**
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

## Chat thread properties updated

| Action                           | RTM API | Webhook |
|----------------------------------|:-------:|:-------:|
| `chat_thread_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
|--------------|------------------------------------------------------------------------------------------------------------|
| `chat_id`    |                                                                                                            |
| `thread_id`  |                                                                                                            |
| `properties` | this is not a full properties object, this push shows only the properties which have been recently updated |

**Sample push payload**
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


## Event properties updated

| Action                     | RTM API | Webhook |
|----------------------------|:-------:|:-------:|
| `event_properties_updated` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                           |
|--------------|-------------------------------------------------------------------------------------------------|
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
|-------------------------------|:-------:|:-------:|
| `last_seen_timestamp_updated` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
|-------------|-------|
| `user_id`   |       |
| `chat_id`   |       |
| `timestamp` |       |

**Sample push payload**
```js
{
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"timestamp": 123456789
}
```

## Customer created

| Action             | RTM API | Webhook |
|--------------------|:-------:|:-------:|
| `customer_created` |    ✓    |    ✓    |

**Push payload**

| Object     | Notes |
|------------|-------|
| `customer` |       |

**Sample push payload**
```js
{
	"customer": {
		// "User > Customer" object
	}
}
```

## Customer updated

| Action             | RTM API | Webhook |
|--------------------|:-------:|:-------:|
| `customer_updated` |    ✓    |    -    |

**Push payload**

| Object     | Notes |
|------------|-------|
| `customer` |       |

**Sample push payload**
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

## Customer visit started

| Action                   | RTM API | Webhook |
|--------------------------|:-------:|:-------:|
| `customer_visit_started` |    ✓    |    -    |

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

| Action                 | RTM API | Webhook |
|------------------------|:-------:|:-------:|
| `customer_visit_ended` |    ✓    |    -    |

**Sample push payload**
```js
{
	"customer_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"visit_id": 42,
	"ended_at": "2017-10-12T15:19:21.010200Z"
}
```

## Customer page updated

| Action                  | RTM API | Webhook |
|-------------------------|:-------:|:-------:|
| `customer_page_updated` |    ✓    |    -    |

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

| Action            | RTM API | Webhook |
|-------------------|:-------:|:-------:|
| `chat_user_added` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                   |
|-------------|-----------------------------------------|
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
|---------------------|:-------:|:-------:|
| `chat_user_removed` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes                                   |
|-------------|-----------------------------------------|
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
|--------------------|:-------:|:-------:|
| `chat_transferred` |    ✓    |    -    |

**Push payload**

| Object         | Notes                        |
|----------------|------------------------------|
| `chat_id`      |                              |
| `requester_id` |                              |
| `type`         | `agent` or `group`           |
| `ids`          | `group` or `agent` ids array |

**Sample push payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"requester_id" : "cb531744-e6a4-4ded-b3eb-b3eb4ded4ded",
	"type": "agent",
	"ids": ["agent1@example.com"]
}
```

## Chat properties deleted

| Action                    | RTM API | Webhook |
|---------------------------|:-------:|:-------:|
| `chat_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
|--------------|------------------------------------------------------------------------------------------------------------|
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
|----------------------------------|:-------:|:-------:|
| `chat_thread_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                                      |
|--------------|------------------------------------------------------------------------------------------------------------|
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
|----------------------------|:-------:|:-------:|
| `event_properties_deleted` |    ✓    |    ✓    |

**Push payload**

| Object       | Notes                                                                                          |
|--------------|------------------------------------------------------------------------------------------------|
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

| Action          | RTM API | Webhook |
|-----------------|:-------:|:-------:|
| `event_updated` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
|-------------|-------|
| `chat_id`   |       |
| `thread_id` |       |
| `event`     |       |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
}
```

## Chat thread tagged

| Action               | RTM API | Webhook |
|----------------------|:-------:|:-------:|
| `chat_thread_tagged` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
|-------------|-------|
| `chat_id`   |       |
| `thread_id` |       |
| `tag`       |       |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```

## Chat thread untagged

| Action                 | RTM API | Webhook |
|------------------------|:-------:|:-------:|
| `chat_thread_untagged` |    ✓    |    ✓    |

**Push payload**

| Object      | Notes |
|-------------|-------|
| `chat_id`   |       |
| `thread_id` |       |
| `tag`       |       |

**Sample payload**
```js
{
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
}
```
