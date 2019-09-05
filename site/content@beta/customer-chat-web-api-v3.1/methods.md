---
weight: 50
---


# Methods

#### The API enpoint

| HTTP method  | Base URL |
|-------|--------|
| `POST`|`https://api.livechatinc.com/v3.1/customer/action/<action>`   |

If you specify the API version in the URL, you don't have to include the optional `"X-API-Version: 3.1"` header.

> **Web API request format**

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
		    // payload
      }'
```

#### Required headers

| Header   |      Value      |  Notes |
|----------|:-------------:|------:|
| `Content-Type`	 |  `multipart/form-data; boundary=<boundary>`  | Valid for the `upload_file` method |
| `Content-Type` |  `application/json`	    |   Valid for every method except for `upload_file ` |
| `Authorization` |  `Bearer <token>`	    |   Access token |


#### Required parameters

Every request to Customer Chat API needs to have the following query string parameters.

| Parameter   |      Data type      |  Notes |
|----------|:-------------:|------:|
| `license_id`	 |  `integer`  | LiveChat account ID |

<a href="https://www.getpostman.com/collections/07cbb1599d95db0c7d85" target="_blank"><img src="https://run.pstmn.io/button.svg"></a>

---------------------------------------------------------------


|   |  |
|-------|--------| 
| **chats** | [`get_chats_summary`](#get-chats-summary) [`get_chat_threads_summary`](#get-chat-threads-summary) [`get_chat_threads`](#get-chat-threads) [`start_chat`](#start-chat) [`activate_chat`](#activate-chat) [`close_thread`](#close-thread)  |
| **events** | [`send_event`](#send-event) [`send_file`](#send-file) [`upload_file`](#upload-file) [`send_rich_message_postback`](#send-rich-message-postback) [`send_sneak_peek`](#send-sneak-peek) |
| **properties (chat/thread/event)** | [`update_chat_properties`](#update-chat-properties) [`delete_chat_properties`](#delete-chat-properties) [`update_chat_thread_properties`](#update-chat-thread-properties) [`delete_chat_thread_properties`](#delete-chat-thread-properties) [`update_event_properties`](#update-event-properties) [`delete_event_properties`](#delete-event-properties)|  
| **customers** | [`update_customer`](#update-customer)  [`set_customer_fields`](#set-customer-fields) |
| **status** | [`get_groups_status`](#get-groups-status)  |
| **other** | [`get_form`](#get-form) [`get_predicted_agent`](#get-predicted-agent) [`get_url_details`](#get-url-details) [`update_last_seen_timestamp`](#update-last-seen-timestamp)   | 


## chats

### `get_chats_summary`

It returns summaries of the chats a Customer participated in.

--------------------------------------------------------------

> **`get_chats_summary`** sample **request** with required params only

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/get_chats_summary?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{}'
```

<!-- > **`get_chats_summary`** sample **request** with optional params

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/get_chats_summary?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "offset": 0,
      "limit": 25
      }'
``` -->

> **`get_chats_summary`** sample **response** 

```json
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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_chats_summary`  |
| **RTM API equivalent**|[`get_chats_summary`](../customer-chat-rtm-api-v3.1/#get_chats_summary) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_chats_summary)</sup>|
| **Webhook**| - |

#### Request


| Parameter           | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `offset`                | No       | `number` |  Default is 0, maximum is 100 |
| `limit` 				  | No       | `number`   | Default is 10, maximum is 25 |



### `get_chat_threads_summary`

> **`get_chat_threads_summary`** sample **request** with required params only


```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/get_chat_threads_summary?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
		  "chat_id": "PJ0MRSHTDG"
      }'
```


<!-- > **`get_chat_threads_summary`** sample **request** with optional params

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/get_chat_threads_summary?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
      "offset": 0,
      "limit": 100
      }'
``` -->

> **`get_chat_threads_summary`** sample **response** 

```json
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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_chat_threads_summary`  |
| **RTM API equivalent**| [`get_chat_threads_summary`](../customer-chat-rtm-api-v3.1/#get-chat-threads-summary) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get-chat-threads-summary)</sup> |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `offset`      | No      | `number` | Default is 0 |
| `limit`      | No      | `number` | Default: 25, maximum: 100      |

#### Response

| Parameter  | Notes     |  |
| -------------- | -------- | ----- |
| `threads_summary`   |  Sorted descendingly by `order` |     |


### `get_chat_threads`

> **`get_chat_threads`** sample **request** with required params only

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
		  "thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
      }'
```

<!-- > **`get_chat_threads`** sample **request** with optional params

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
		  "thread_ids": ["a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5"]
      }'
``` -->

> **`get_chat_threads`** sample **response** 

```json
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

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_chat_threads`  |
| **RTM API equivalent**| [`get_chat_threads`](../customer-chat-rtm-api-v3.1/#get_chat_threads)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_chat_threads)</sup> |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `thread_ids`      | No      | `array` |   |


### `start_chat`

Starts a chat.

-------------------------------------------------------------------------------------------

> **`start_chat`** sample **request** with required params only

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{}'
```

<!-- > **`start_chat`** sample **request** with optional params 

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
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
		    		}
		    	}
	      },
      "continuous": true
        }
      }'
``` -->

> **`start_chat`** sample **response** 

```json
{
    "chat_id": "W54XYD1O",
    "thread_id": "Z635Z9WH",
    "event_ids": [
      // array of Events ids
    ]
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/start_chat`  |
| **RTM API equivalent**| [`start_chat`](../customer-chat-rtm-api-v3.1/#start-chat)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#start-chat)</sup> |
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |


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

#### Response

| Parameter  | Data type |
|-------|--------|
| `chat_id` | `string` |
| `thread_id` | `string` |
| `event_ids`   | `[]string` |



### `activate_chat`

Used to restart an archived chat.

-------------------------------------------------------------------------------------------------------------------


> **`activate_chat`** sample **request** with required params only

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat": {
            "id": "PWLW03ICW7"
          }
      }'
```


<!-- > **`activate_chat`** sample **request** with optional params 

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
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
                    }
                  }
                }
              }
            }
      }'
```-->

> **`activate_chat`** sample **response** 

```json
{
  "thread_id": "Z2HDF2F9D",
  "event_ids": [
    // array of Events ids
  ]
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/activate_chat`  |
| **RTM API equivalent**|[`activate_chat`](../customer-chat-rtm-api-v3.1/#activate-chat) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#activate-chat)</sup>|
| **Webhook**| [`incoming_chat_thread`](#incoming-chat-thread) |


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

#### Response

| Parameter  | Data type |
|-------|--------|
| `event_ids`   | `[]string` |
| `thread_id` | `string` |

### `close_thread`

Closes the thread. Sending messages to this thread will no longer be possible. 

------------------------------------------------------------------------------------------------

> **`close_thread`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/close_thread??license_id=<license_id>' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
        "chat_id": "PWLW03ICW7"
      }'
```


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/close_thread`  |
| **RTM API equivalent**| [`close_thread`](../customer-chat-rtm-api-v3.1/#close-thread) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#close-thread)</sup> |
| **Webhook**| [`incoming_event`](#incoming-event) and [`thread_closed`](#thread-closed)  |

#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |


#### Response

No response payload (`200 OK`).


## events

### `send_event`

> **`send_event`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/send_event?license_id=<license_id>' \
  -H 'Content-Type: application/json' \
  -d '{
      "chat_id": "PWLW03ICW7",
      "event": {
          "type": "message",
          "text": "hello world",
          "recipients": "all"
        }
    }'
```

<!-- > **`send_event`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/send_event?license_id=<license_id>' \
  -H 'Content-Type: application/json' \
  -d '{
      "chat_id": "PWLW03ICW7",
      "event": {
          "type": "message",
          "text": "hello world",
          "recipients": "all"
          }
      }'   
``` -->

> **`send_event`** sample **response** 

```json
{
    "event_id" : "Z587K8OP21"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/send_event`  |
| **RTM API equivalent**| [`send_event`](../customer-chat-rtm-api-v3.1/#send_event)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#send_event)</sup> |
| **Webhook**| [`incoming_event`](#incoming-event) and [`incoming_chat_thread`](#incoming-chat-thread)__*__ |

__*)__ `incoming_chat_thread` will be sent instead of `incoming_event` only if the event starts a new thread.


#### Request


| Parameters         | Required | Data type     | Notes                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `chat_id`               | Yes      | `string` | Id of the chat that we want to send the message to                               |
| `event`                 | Yes      | `object` | Event object                                                                     |
| `attach_to_last_thread` | No       | `bool`   | If `true`, adds event to last thread, otherwise creates new one, default `false` |
| `require_active_thread` | No       | `bool`   | If `true`, returns error when all threads are inactive, default `false`          |


#### Response

| Parameter   |      Data type      |  Notes |
|----------|:-------------:|------:|
| `event_id` |  string | Id of the created event object |


### `send_file`

Sends the file directly to the chat.  

**Warning:** the `send_file` method is no longer recommended for use. Please use `upload_file` instead.

> **`send_file`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/<action>?license_id=<license_id>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F chat_id=PWJ8Y4THAV \
  -F require_active_thread=false \
  -F 'file=@/Users/MyAccount/Downloads/file.jpg'
```

> **`send_file`** sample **response** 

```json
{
    "url": "https://cdn.livechat-static.com/api/file/lc/att/file.jpg"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/send_file`  |
| **RTM API equivalent**| - |
| **Webhook**| [`incoming_event`](#incoming-event) or [`incoming_chat_thread`](#incoming-chat-thread) __*__|

__*)__ The `incoming_chat_thread` webhook will be sent instead of `incoming_event` only if the event starts a new thread.


#### Request

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `chat_id`       | Yes       | `string` |  Id of the chat that you want to send the file to       |
| `file`      | Yes       | `binary` | maximum size: 10MB    	   |
| `custom_id`      | No       | `string` | 							   |
| `require_active_thread` | No       | `bool` | If set to `true`, it returns an error when all threads are inactive; Default: `false` |


### `upload_file`

Uploads a file to the server as a temporary file. It returns a URL, which expires after 24 hours. 

------------------------------------------------------------------------------------------------------------------------

> **`upload_file`** sample **request**

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/send_file?license_id=<license_id>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: multipart/form-data; boundary=--------------------------626049643947557285427720' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F chat_id=PXF9EA5UWA \
  -F require_active_thread=false \
  -F 'file=@/Users/MyAccount/Downloads/file.jpg'
```

> **`upload_file`** sample **response**

```js
{
  "url": "https://cdn.livechat-static.com/api/file/lc/att/8948324/45a3581b59a7295145c3825c86ec7ab3/file.jpg"
}
  ```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/upload_file`  |
| **RTM API equivalent**| - |
| **Webhook**| [`incoming_event`](#incoming-event) __*__ |

__*)__
`incoming_event` returns a URL that never expires. 

#### Request

| Parameter | Required | Data type     | Notes                     |
| -------------- | -------- | -------- | ------------------------- |
| `file`      | Yes       | `binary` | maximum size: 10MB    	   |


### `send_rich_message_postback`

> **`send_rich_message_postback`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/send_rich_message_postback?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
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

<!-- > **`send_rich_message_postback`** sample **request** with optional params

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/send_rich_message_postback?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
        "thread_id": "K600PKZON8",
        "event_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f7",
        "postback": {
            "id": "Method URL_yes",
            "toggled": true
          }
      }'
``` -->



#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/send_rich_message_postback`  |
| **RTM API equivalent**| [`send_rich_message_postback`](../customer-chat-rtm-api-v3.1/#send-rich-message-postback)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#send-rich-message-postback)</sup> |
| **Webhook**| [`incoming_rich_message_postback`](#incoming-rich-message-postback)__*__|

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

#### Response

No response payload (`200 OK`).

### `send_sneak_peek`

> **`send_sneak_peek`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/send_sneak_peek?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
		  "sneak_peek_text": "hello world"
          }
      }'
```

<!-- > **`send_sneak_peek`** sample **request** with optional params

```shell
curl -X POST \
  https://api.livechatinc.com/v3.1/customer/action/send_sneak_peek?license_id=<license_id> \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
		  "sneak_peek_text": "hello world"
      }'
``` -->


#### Specifics
|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/send_sneak_peek`  |
| **RTM API equivalent**| [`send_sneak_peek`](../customer-chat-rtm-api-v3.1/#send_sneak_peek)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#send_sneak_peek)</sup> |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a sneak peek to|
| `sneak_peek_text` | Yes      | `string` | Sneak peek text |

#### Response

No response payload (`200 OK`).



## properties (chat/thread/event)


### `update_chat_properties`

> **`update_chat_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_chat_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": {
              "score": 10,
              "comment": "Thank you!"
              }
          }
      }'
```

<!-- > **`update_chat_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_chat_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": {
                "score": 10,
                "comment": "Thank you!"
              }
          }
      }'
``` -->



#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/update_chat_properties`  |
| **RTM API equivalent**| [`update_chat_properties`](../customer-chat-rtm-api-v3.1/#update-chat-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#update-chat-properties)</sup> |
| **Webhook**| [`chat_properties_updated`](#chat-properties-updated) |

#### Request

| Parameter | Required | Data type     | Notes                                           |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you to set a property for.|
| `properties`   | Yes      | `object` | Chat properties to set                          |

#### Response

No response payload (`200 OK`).


### `delete_chat_properties`

> **`delete_chat_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_chat_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": [
              "score",
              "comment"
              ]
          }
      }'
```

<!-- > **`delete_chat_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_chat_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
        "properties": {
            "bb9e5b2f1ab480e4a715977b7b1b4279": [
                "score",
                "comment"
              ]
          }
      }'
``` -->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/delete_chat_properties`  |
| __Required scopes*__| `chats.conversation--all:write` `chats.conversation--my:write`|
| **RTM API equivalent**| [`delete_chat_properties`](../customer-chat-rtm-api-v3.1/#delete-chat-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#delete-chat-properties)</sup> |
| **Webhook**| [`chat_properties_deleted`](#chat-properties-deleted) |

__*)__ 

- `chats.conversation--all:write` - write access for conversation data of all license chats
- `chats.conversation--my:write` - write access for conversation data of chats the requester belongs to

#### Request


| Parameter | Required | Data type     | Notes                                              |
| -------------- | -------- | -------- | -------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to delete properties of |
| `properties`   | Yes      | `object` | Chat properties to delete                          |


#### Response

No response payload (`200 OK`).


### `update_chat_thread_properties`


> **`update_chat_thread_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_chat_thread_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": {
              "score": 10,
              "comment": "Thank you!"
              }
          }
      }'
```

<!-- > **`update_chat_thread_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_chat_thread_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": {
              "score": 10,
              "comment": "Thank you!"
              }
          }
      }'
``` -->



#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/update_chat_thread_properties`  |
| **RTM API equivalent**|[`update_chat_thread_properties`](../customer-chat-rtm-api-v3.1/#update-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#update-chat-thread-properties)</sup> |
| **Webhook**| [`chat_thread_properties_updated`](#chat-thread-properties-updated) |

#### Request


| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | The id of the chat that you want to set properties for|
| `thread_id`    | Yes      | `string` | The id of the thread that you want to set properties for |
| `properties`   | Yes      | `object` | Chat properties to set                            |

#### Response

No response payload (`200 OK`).


### `delete_chat_thread_properties`

> **`delete_chat_thread_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_chat_thread_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": [
              "score",
              "comment"
              ]
          }
      }'
```

<!-- > **`delete_chat_thread_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_chat_thread_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": [
              "score",
              "comment"
              ]
          }
      }'
``` -->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/delete_chat_thread_properties`  |
| __Required scopes*__| `chats.conversation--all:write` `chats.conversation--my:write`|
| **RTM API equivalent**| [`delete_chat_thread_properties`](../customer-chat-rtm-api-v3.1/#delete-chat-thread-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#delete-chat-thread-properties)</sup> |
| **Webhook**| [`chat_thread_properties_deleted`](#chat-thread-properties-deleted) |

__*)__ 

- `chats.conversation--all:write` - write access for conversation data of all license chats
- `chats.conversation--my:write` - write access for conversation data of chats the requester belongs to

#### Request


| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to delete the properties of   |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to delete the properties of |
| `properties`   | Yes      | `object` | Chat thread properties to delete                     |


#### Response

No response payload (`200 OK`).

### `update_event_properties`

> **`update_event_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_event_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "event_id": "2_EW2WQSA8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": {
              "score": 10,
              "comment": "Thank you!"
              }
          }
      }'
```

<!-- > **`update_event_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_event_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PW94SJTGW6",
      "thread_id": "K600PKZON8",
      "event_id": "2_EW2WQSA8",
      "properties": {
          "bb9e5b2f1ab480e4a715977b7b1b4279": {
              "score": 10,
              "comment": "Thank you!"
              }
          }
      }'
``` -->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/update_event_properties`  |
| **RTM API equivalent**| [`update_event_properties`](../customer-chat-rtm-api-v3.1/#update-event-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#update-event-properties)</sup> |
| **Webhook**| [`event_properties_updated`](#event-properties-updated) |

#### Request


| Parameter | Required | Data type     | Notes                                             |
| -------------- | -------- | -------- | ------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that you want to set properties for |
| `thread_id`    | Yes      | `string` | Id of the thread that you want to set properties for|
| `event_id`     | Yes      | `string` | Id of the event that you want to set properties for |
| `properties`   | Yes      | `object` | Chat properties to set                            |

#### Response

No response payload (`200 OK`).


### `delete_event_properties`

> **`delete_event_properties`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_event_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PWLW03ICW7",
      "thread_id": "PWNWW5N6A8",
      "event_id": "PWNWW5N6A8_1",
      "properties": {
          "rating": [
              "score",
              "comment"
            ]
        }
    }'
```

<!-- > **`delete_event_properties`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/delete_event_properties?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PWLW03ICW7",
      "thread_id": "PWNWW5N6A8",
      "event_id": "PWNWW5N6A8_1",
      "properties": {
          "rating": [
              "score",
              "comment"
              ]
          }
      }'
``` -->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/delete_event_properties`  |
| **RTM API equivalent**| [`delete_event_properties`](../customer-chat-rtm-api-v3.1/#delete-event-properties)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#delete-event-properties)</sup> |
| **Webhook**| [`event_properties_deleted`](#event-properties-deleted) |


#### Request

| Parameter | Required | Data type     | Notes                                                |
| -------------- | -------- | -------- | ---------------------------------------------------- |
| `chat_id`      | Yes      | `string` | Id of the chat that we want to delete the properties of   |
| `thread_id`    | Yes      | `string` | Id of the thread that we want to delete the properties of |
| `event_id`     | Yes      | `string` | Id of the event that we want to delete the properties of  |
| `properties`   | Yes      | `object` | Event properties to delete                           |

#### Response

No response payload (`200 OK`).

## customers

### `update_customer`

> **`update_customer`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_customer?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "name": "John Doe"
      }'
```

<!-- > **`update_customer`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_customer?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "name": "John Doe",
      "avatar": "https://domain.com/avatars/1.jpg",
      "fields": {
        "score": "low"
          }
      }'
```-->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/update_customer`  |
| **RTM API equivalent**| [`update_customer`](../customer-chat-rtm-api-v3.1/#update-customer) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#update-customer)</sup> |
| **Webhook**| [`customer_updated`](#customer-updated) |

#### Request


| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `name`         | No       | `string` |                                |
| `email`        | No       | `string` |                                |
| `avatar`       | No       | `string` | URL of the Customer's avatar         |
| `fields`       | No       | `object` | `"key": "value"` object |

At least one optional parameter needs to be included in the request. 

#### Response

No response payload (`200 OK`).

### `set_customer_fields`

> **`set_customer_fields`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/set_customer_fields?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "fields": {
		    "company_size": "10-100"
      		}
      }'
```

<!-- > **`set_customer_fields`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/set_customer_fields?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "fields": {
		    "company_size": "10-100"
      		}
      }'
```-->


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/set_customer_fields`  |
| **RTM API equivalent**| [`get_customers`](../customer-chat-rtm-api-v3.1/#get-customers) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get-customers)</sup> |
| **Webhook**| [`customer_updated`](#customer-updated) |

#### Request

| Parameter | Required | Data type     | Notes                          |
| -------------- | -------- | -------- | ------------------------------ |
| `fields`      | Yes       | `string` |  `key:value` object        |

Users Agent and referrer are updated by default using the browser’s headers.

#### Response

No response payload (`200 OK`).

## status


### `get_groups_status`

> **`get_groups_status`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_groups_status?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "all": true
      }'
```

<!-- > **`get_groups_status`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_groups_status?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "groups": [1, 2, 3, 4]
      }'
```-->

> **`get_groups_status`** sample **response** 

```json
{
		"groups_status": {

		//1,2,3 are group ids, online/offline/online_for_queue are statuses of the groups

		1: "online",
		2: "offline",
		3: "online_for_queue"
		}
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_groups_status`  |
| **RTM API equivalent**| [`get_groups_status`](../customer-chat-rtm-api-v3.1/#get_groups_status) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_groups_status)</sup> |
| **Webhook**| - |


#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `all`      | No      | `bool` | If set to `true`, then you will get statuses for all the groups.   |
| `groups`   | No       | `array`  | Table of a group's ids |

At least one optional parameter needs to be included in the request.

#### Response

No response payload (`200 OK`).

#### Response

|    |      |  |
| -------------- | -------- | ----- |
| `Group Not Found`   |  If you send `group_id` of a group that doesn't exists, then this id won't be included in the resposne.  |     |


## other

### `check_goals`

Customer can use this method to trigger checking if [goals](https://www.livechatinc.com/help/goals-set-up-and-use/) <sup>[![LiveChat Goals](link.svg)](https://www.livechatinc.com/help/goals-set-up-and-use/)</sup> were achieved. Then, Agents receive the information. You should call this method to provide goals parameters for the server when the customers limit is reached. Works only for offline Customers.

------------------------------------------------------------------------------------------------------------------------------------

> **`check_goals`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/check_goals?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "page_url": "https://mypage.com",
      "customer_fields": {
        "field1": "value1"
	      },
	    "group_id": 0
      }'
```

> **`check_goals`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/check_goals?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "page_url": "https://mypage.com",
      "customer_fields": {
        "field1": "value1"
	      },
	    "group_id": 0
      }'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/check_goals`  |
| **RTM API equivalent**| - |
| **Webhook**| - |

#### Request

| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `customer_fields`| Yes      | `string` |   |
| `group_id`   | Yes       | `number`  |  |
| `page_url`   | Yes       | `string`  |  |

#### Response

No response payload (`200 OK`).

### `get_form`

> **`get_form`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_form?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "group_id": 0,
		  "type": "prechat"
      }'
```

<!-- > **`get_form`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_form?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "group_id": 0,
		  "type": "prechat"
      }'
``` -->

> **`get_form`** sample **response** 

```json
{
  "form": {
      "id": "156630109416307809",
      "fields": [
          {
              "id": "15663010941630615",
              "type": "header",
              "label": "Welcome to our LiveChat! Please fill in the form below before starting the chat."
          },
          {
              "id": "156630109416307759",
              "type": "name",
              "label": "Name:",
              "required": false
          },
          {
              "id": "15663010941630515",
              "type": "email",
              "label": "E-mail:",
              "required": false
          }
      ]
  },
  "enabled": true
}
```
#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_form`  |
| **RTM API equivalent**| [`get_form`](../customer-chat-rtm-api-v3.1/#get_form) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_form)</sup> |
| **Webhook**| - |


#### Request

| Parameter | Required | Data type     | Notes |
| -------------- | -------- | -------- | ----- |
| `group_id`      | Yes   | `number` |  Id of the group from which you want the form |
| `type`    | Yes     | `string` |  Form type. Possible values: `prechat` or `postchat`  |

#### Response

| Parameter | Notes |     |  |
| -------------- | -------- | -------- | ----- |
| `form`      | If form is disabled, the `form` object won't be returned in the response.      |  |       |
| `headers`    | for headers (The field has no `answer` and is not sent in the `filled_form` event)    |  |       |
| `name, email, question, textarea`  |  for open questions (text area)    |  |       |
| `radio, select, checkbox`  | for single/multiple-choice questions     |  |       |
| `group_chooser`    |  for group-choice questions    |  |       |
| `rating`    | for rating  (The field isn't sent in the `filled_form` event.)    |  |       |


### `get_predicted_agent`

Gets the predicted Agent - the one the Customer will chat with when the chat starts. To use this method, the Customer needs to be logged in, which can be done via the [`login`](../customer-chat-rtm-api-v3.1/#login)<sup>[![LiveChat Login Method](link.svg)](../customer-chat-rtm-api-v3.1/#login)</sup> method.

---------------------------------------------------------------------------------------------------------------------------------------------

> **`get_predicted_agent`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_predicted_agent?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{}'
```

<!-- > **`get_predicted_agent`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_predicted_agent?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{}'
``` -->

> **`get_predicted_agent`** sample **response** 

```json
{
	"agent": {
        "id": "agent1@example.com",
        "name": "Name",
        "avatar": "https://example.avatar/example.com",
        "is_bot": false,
        "job_title": "support hero",
        "type": "agent"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_predicted_agent`  |
| **RTM API equivalent**| [`get_predicted_agent`](../customer-chat-rtm-api-v3.1/#get_predicted_agent) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_predicted_agent)</sup> |
| **Webhook**| - |

### `get_url_details`

It returns the info on a given URL.

-------------------------------------------------------------------------------------------------------------------------------------------------

> **`get_url_details`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_url_details?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "url": "https://livechatinc.com"
      }'
```

<!-- > **`get_url_details`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/get_url_details?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "url": "https://livechatinc.com"
      }'
``` -->

> **`get_url_details`** sample **response**

```json
{
	"title": "LiveChat | Live Chat Software and Help Desk Software",
	"description": "LiveChat - premium live chat software and help desk software for business. Over 24 000 companies from 150 countries use LiveChat. Try now, chat for free!",
	"image_url": "s3.eu-central-1.amazonaws.com/labs-fraa-livechat-thumbnails/96979c3552cf3fa4ae326086a3048d9354c27324.png",
	"image_width": 200,
	"image_height": 200,
	"url": "https://livechatinc.com"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/get_url_details`  |
| **RTM API equivalent**| [`get_url_details`](../customer-chat-rtm-api-v3.1/#get_url_details)<sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#get_url_details)</sup> |
| **Webhook**| - |


#### Request 

| Parameter     | Required | Data type     | Notes                               |
| ----------------------------------------------------- | -------- | -------- | ----------------------------------- |
| `url`          | Yes       | `string` |  Valid website URL                    |



### `update_last_seen_timestamp`

> **`update_last_seen_timestamp`** sample **request** with required params only

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_last_seen_timestamp?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG"
      }'
```

<!-- > **`update_last_seen_timestamp`** sample **request** with optional params

```shell
curl -X POST \
  'https://api.livechatinc.com/v3.1/customer/action/update_last_seen_timestamp?license_id=<license_id>' \
  -H 'Content-Type: <content-type>' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
      "chat_id": "PJ0MRSHTDG",
      "timestamp": 123456789
      }'
``` -->

> **`update_last_seen_timestamp`** sample **response** 

```json
{
		"timestamp": 123456789
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.1/customer/action/update_last_seen_timestamp`  |
| **RTM API equivalent**| [`update_last_seen_timestamp`](../customer-chat-rtm-api-v3.1/#update-last-seen-timestamp) <sup>[![LiveChat Link](link.svg)](../customer-chat-rtm-api-v3.1/#update-last-seen-timestamp)</sup> |
| **Webhook**| [`last_seen_timestamp_updated`](#last-seen-timestamp-updated)|


#### Request


| Parameter | Required | Data type     |  |
| -------------- | -------- | -------- | ----- |
| `chat_id`      | Yes      | `string` |       |
| `timestamp`    | No       | `number` |       |

































