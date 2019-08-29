---
weight : 40
---

# Webhooks

Webhooks notify you when events are triggered.

-------------------------------------------------------------------------------------------------------------------------

> **The general webook format**

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    // payload from push action
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

## Available webhooks

|   |  |
|-------|--------| 
| **chats** | [`incoming_chat_thread`](#incoming-chat-thread) [`thread_closed`](#thread-closed)|
| **chat users** |[`chat_user_added`](#chat-user-added) [`chat_user_removed`](#chat-user-removed)   | 
| **events** | [`incoming_event`](#incoming-event) [`incoming_rich_message_postback`](#incoming-rich-message-postback) |
| **properties (chat/thread/event)** | [`chat_properties_updated`](#chat-properties-updated) [`chat_properties_deleted`](#chat-properties-deleted) [`chat_thread_properties_updated`](#chat-thread-properties-updated) [`chat_thread_properties_deleted`](#chat-thread-properties-deleted)  |  
| **thread tags** | [`chat_thread_tagged`](#chat-thread-tagged) [`chat_thread_untagged`](#chat-thread-untagged) | 
| **status** | [`agent_status_changed`](#agent-status-changed) [`agent_deleted`](#agent-deleted)| 
| **other** | [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)  | 

### chats

-------------------------------------------------------------------------------------------------------------------------

#### `incoming_chat_thread`

> **`incoming_chat_thread`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
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
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### `thread_closed`

> **`thread_closed`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c" // optional
    },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `user_id`   | Missing if a thread was closed by the router |

### chat users

-------------------------------------------------------------------------------------------------------------------------

#### `chat_user_added`

> **`chat_user_added`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user": {
		// "User > Customer" or "User > Agent" object
	    },
	"user_type": "agent"
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | possible values: `agent`, `customer`    |


#### `chat_user_removed`

> **`chat_user_removed`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"user_id": "agent1@example.com",
	"user_type": "agent"
    },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object      | Notes                                   |
| ----------- | --------------------------------------- |
| `user_type` | possible values: `agent`, `customer`    |


### events

-------------------------------------------------------------------------------------------------------------------------

#### `incoming_event`

> **`incoming_event`** webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event": {
		// "Event" object
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### `incoming_rich_message_postback`

> **`incoming_rich_message_postback`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
	"postback": {
		"id": "action_yes",
		"toggled": true
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

### properties

-------------------------------------------------------------------------------------------------------------------------

#### `chat_properties_updated`

> **`chat_properties_updated`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": {
			"score": {
				"value": 1
			},
			"comment": {
				"value": "Very good, veeeery good"
			}
		}
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |

#### `chat_properties_deleted`

> **`chat_properties_deleted`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"properties": {
		"rating": ["score", "comment"]
		}
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```
#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |


#### `chat_thread_properties_updated`

> **`chat_thread_properties_updated`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
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
		}
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |


#### `chat_thread_properties_deleted`

> **`chat_thread_properties_deleted`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
	"chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"properties": {
		"rating": ["score", "comment"]
		}
	}
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object       | Notes                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `properties` | Not a full `properties` object. This push shows only the properties, which have been recently updated. |


### thread tags

-------------------------------------------------------------------------------------------------------------------------

#### `chat_thread_tagged`

> **`chat_thread_tagged`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### `chat_thread_untagged`

> **`chat_thread_untagged`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "chat_id": "PJ0MRSHTDG",
	"thread_id": "K600PKZON8",
	"tag": "bug_report"
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

### status

-------------------------------------------------------------------------------------------------------------------------

#### `agent_status_changed`

> **`agent_status_changed`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "agent_id":"5c9871d5372c824cbf22d860a707a578",
    "status": "accepting chats"
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

#### Webhook payload

| Object      | Notes                                  |
| ----------- | -------------------------------------- |
| `status`   | Possible values: `accepting chats`, `not accepting chats`, `offline` | 

#### `agent_deleted`

> **`agent_deleted`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
    "agent_id": "5c9871d5372c824cbf22d860a707a578"
  },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```

### other

-------------------------------------------------------------------------------------------------------------------------

#### `last_seen_timestamp_updated`

> **`last_seen_timestamp_updated`** sample webhook

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<secret_key>",
  "action": "<action>",
  "data": {
	"user_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
	"chat_id": "PJ0MRSHTDG",
    "timestamp": 123456789  
    },
  "additional_data": {
    "chat_properties": { //optional
        // chat properties
    }
  }
}
```


## Methods

**The API endpoint**

`https://api.livechatinc.com/v3.0/configuration/action/<action>`


### `register_webhook`

> **`register_webhook`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/register_webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "url": "http://myservice.com/webhooks",
        "description": "Test webhook",
        "action": "thread_closed",
        "secret_key": "laudla991lamda0pnoaa0"  
            }
		}'
```

> **`register_webhook`** sample response payload

```js
    {
        "webhook_id": "pqi8oasdjahuakndw9nsad9na"
    }
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/register_webhook`  |
| __Required scopes *__| `webhooks--my:rw`  |


| Request object                           | Required       | Data type | Notes                                                                    |
| ---------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------- |
| `action`__*__                            | Yes  |  `string`     | The triggerring action                                                                    |
| `secret_key`                             | Yes  |  `string`     | The secret key sent in webhooks to verify the source of a webhook                         |
| `url`                                    | Yes  |  `string`     | Destination URL for the webhook                                                           |
| `additional_data`__**)__                 | No   |  `[]string`   | Additional data that will arrive with the webhook                                         |
| `description`                            | No   |  `string`     | Webhook description                                                                       |
| `filters`                                | No   |  `object`     | Filters to check if a webhook should be triggered                                         |
| `filters.author_type`                    | No   |  `string`     | Possible values: `customer`, `agent`; allowed only for the `incoming_event` action        |
| `filters.only_my_chats`                  | No   |  `bool`       | `true` or `false`; triggers webhooks only for chats with the property `source.client_id` set to my `client_id` |
| `filters.chat_member_ids`                | No   |  `object`     | Only one filter (`agents_any` or `agents_exclude`) is allowed                              |
| `filters.chat_member_ids.agents_any`     | No   |  `[]string`   | Array of agent ids;; If any specified agent is in chat, webhook will be triggered.         |
| `filters.chat_member_ids.agents_exclude` | No   |  `[]string`   | Array of agent ids; If any specified agent is in chat, webhook will not be triggered.      |


##### __*)__ `action`

| Possible value        | Triggered by the push        | Available filters  |
| ------------- |:-------------:| -----:|
| `incoming_chat_thread` | [`incoming_chat_thread`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#incoming-chat-thread) | `chat_member_ids`, `only_my_chats` |
| `incoming_event`  | [`incoming_event`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#incoming-chat-thread)  |   `chat_member_ids` and `author_type`, `only_my_chats` |
| `incoming_rich_message_postback` | [`incoming_rich_message_postback`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#incoming-rich-message-postback) | `chat_member_ids`, `only_my_chats`   |
| `last_seen_timestamp_updated`| [`last_seen_timestamp_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#last_seen_timestamp_updated)   | `chat_member_ids`, `only_my_chats`   |
| `thread_closed`| [`thread_closed`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#thread_closed)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_properties_updated`  | [`chat_properties_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_properties_updated)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_properties_deleted`  | [`chat_properties_deleted`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_properties_deleted)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_thread_properties_updated`  | [`chat_thread_properties_updated`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_thread_properties_updated)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_thread_properties_deleted`  | [`chat_thread_properties_deleted`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_thread_properties_deleted)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_user_added`  | [`chat_user_added`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_user_added)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_user_removed`  | [`chat_user_removed`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_user_removed)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_thread_tagged`  | [`chat_thread_tagged`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_thread_tagged)   |  `chat_member_ids`, `only_my_chats`  |
| `chat_thread_untagged`  | [`chat_thread_untagged`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#chat_thread_untagged)   |  `chat_member_ids`, `only_my_chats`  |
| `agent_status_changed`  | [`agent_status_changed`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#agent_status_changed)   | `chat_member_ids`   |
| `agent_deleted`  | [`agent_deleted`](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/#agent_deleted)   |  `chat_member_ids`  |


##### __**)__ `additional_data`

| Possile value | Available for actions           |
| ------------- |:-------------:|
| `access`     | `incoming_event`, `chat_user_added`      |
| `chat_properties`      | All actions, except for `agent_status_changed` and `agent_deleted` |
| `thread_id` | `chat_user_added`     |



### `get_webhooks_config`

> **`get_webhooks_config`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/get_webhooks_config \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {}
		}'
```

> **`get_webhooks_config`** sample response payload

```js
{
  [
    {
      "webhook_id": "pqi8oasdjahuakndw9nsad9na",
      "url": "http://myservice.com/webhooks",
      "description": "Test webhook",
      "action": "thread_closed",
      "secret_key": "laudla991lamda0pnoaa0",
      "filters": {
        "chat_member_ids": {
          "agents_any": ["johndoe@mail.com"]
        }
      },
      "owner_client_id": "asXdesldiAJSq9padj"
    }
  ]
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/get_webhooks_config`  |
| __Required scopes *__| `webhooks--my:rw` `webhooks--all:ro`  |


### `unregister_webhook`

> **`unregister_webhook`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/unregister_webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
            "webhook_id": "pqi8oasdjahuakndw9nsad9na"
            }
		}'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/unregister_webhook`  |
| __Required scopes *__| `webhooks--my:rw` `webhooks--all:rw`  |


#### Request

| Parameter | Required     | Data type | Notes      |
| -------------- | -------- | -------- | ---------- |
| `webhook_id`   | Yes | `string`      | Webhook ID |


#### Response

No response payload
