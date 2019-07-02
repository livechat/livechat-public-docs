---
weight: 20
---

# About our APIs

There are two primary Chat APIs:

- [Agent Chat API](https://developers.livechatinc.com/beta-docs/agent-chat-api/), which serves to join a chat as an agent.
- [Customer Chat API](https://developers.livechatinc.com/beta-docs/customer-chat-api/), which serves to join a chat as a customer.

The **Agent Chat API** contains a different set of methods than the **Customer Chat API**. We separated both APIs as they cover different use cases. 

## RTM API vs. Web API

Both APIs have much in common. One similarity is that they're both **Real Time Messaging APIs (RTM APIs)**, which translates to enabling real-time communication. Websocket transport allows for **pushes**, which are server-client methods used to keep application state up-to-date. In case of the Agent App and the Chat Widget, the continuous connection is crucial. That's why they both implement RTM API.

|**Characteristics**|     **RTM API**      | **Web API**               |
|:-----------------:|:--------------------:|:-------------------------:|
|**connection type**|   websocket          |  independent requests     |
| **makes use of**  |   pushes             |    webhooks               |
|**implemented by** |Agent App, Chat Widget|external apps, integrations|

Integrations built upon the LiveChat Platform don't usually need to keep the connection open continuously. In the context of app functioning, short delays are insignificant. It's the reason why **Web API** is more commonly used than **RTM API** when building an integration. Just like REST API, Web API is based on sending the **request** and getting the **response**. Instead of pushes, Web API makes use of **webhooks**.

## Events

**Events** are portions of data sent to a chat using the [send_event](https://developers.livechatinc.com/beta-docs/agent-chat-api/#send-event) method. 

There are the following event types:

- [message](#message)
- [annotation](#annotation)
- [filled form](#filled-form)
- [system message](#system-message)
- [file](#file)
- [custom event](#custom-event)


All event types share the following fields:

| name         | puprose                                                                      | filled by | type              |
| ------------ | ---------------------------------------------------------------------------- | --------- | ----------------- |
| `id`         | the ID of the event                                                          | server    | string            |
| `custom_id`  | the ID that you can set for your own purposes                                | client    | string            |
| `order`      | events with a lower `order` will appear first                                | server    | int               |
| `author_id`  | the ID of the sender of an event                                             | server    | string            |
| `text`       | the payload that you can send whithin an event (for example message content) | client    | string            |
| `recipients` | the posibble values are `"all"`(default) and `"agents"`                      | client    | string            |
| `properties` | event [properties](#properties)                                              | client    | properties object |



### Message

> A sample **message**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12345-bhdsa",
  "order": 1,
  "type": "message",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "hello there",
  "recipients": "all",
  "properties": {
    // "Properties" object
  }
}
```
A **message** is the most common event type. It allows you to send textual content to other chat users.

### Annotation

> A sample **annotation**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "annotation",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "Sample annotation",
  "annotation_type": "rating",
  "properties": {
    // "Properties" object
  }
}
```
This event type adds an annotation to the last thread. Sending an annotation **cannot** start a new thread, even when there's no active thread in a chat. It always goes to the latest already existing thread.

The `annotation_type` field defines the type of annotation. It **cannot be empty**. It's customizable, so you can have your own annotation types. We used the `rating` type in the example.



### Filled form

A **filled form** is an event containing data from a form, such as the one in the picture below.


> A sample **filled form**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 4,
  "type": "filled_form",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "properties": {
    // "Properties" object
  }
  "fields": [{
      "type": "text",
      "name": "name",
      "label": "Your name:",
      "required": true,
      "value": "John Doe"
    },
    {
      "type": "email",
      "name": "email",
      "label": "E-mail:",
      "required": true,
      "value": "john.doe@gmail.com"
    },
    {
      "name": "Chat window title",
      "type": "title",
      "label": "Let's talk!",
    },
    {
      "name": "Chat window form info",
      "type": "information",
      "label": "Before we start, we'd like to know a few details about you.",
    }]
}
```
![Filled Form](filled_form.png "filled form example")

To send the data from this form, you can use the **filled form** event. The code sample introduces all currently available field types:

- `type`
- `name`
- `label`
- `required`
- `value`

### System message

> A sample **system message**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "order": 1,
  "type": "system_message",
  "timestamp": 1473433500,
  "text": "Mike joined the chat",
  "system_message_type": "agent_joined"
}
```
A **system message** is an event generated by a server. It doesn't contain the `author_id`, `custom_id`, or the `properties` field.

System messages can be triggered by:

- a user action within a chat 
- a router (router messages are covered in the [Router system messages](#router-system-messages) section) 

Each action triggers a system message with a different `system_message_type` and a different `text` message.

| system_message_type | text                             |
| ------------------- | -------------------------------- |
| `agent_joined`      | `<agent_name> joined the chat`   |
| `agent_left`        | `<agent_name> left the chat`     |
| `manual_archived`   | `<agent_name> archived the chat` |


### File

> A sample **file**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "file",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "properties": {
    // "Properties" object
  }
  "name": "image25.png",
  "url": "https://domain.com/asdsfdsf.png",
  "content_type": "image/png",
  "size": 123444,
  "width": 640,
  "height": 480
}
```
A **file** event indicates that a file has been uploaded. It can be only generated by a server when the [send file](../customer-chat-api/#send-file) method from the Customer Chat API is called.

| field name            | field content                                                                                                     |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------: |
| `size`                | file size in bytes; max. 10 MB                                                                                    |
| `content-type`        | any [MIME media type](https://en.wikipedia.org/wiki/Media_type)                                                   |
| `width`,     `height` | present only for `"image/png"`, `"image/gif"` and `"image/jpg"` content-types<br>no maximum value for width or height</br>|



### Custom event

> A sample **custom event**:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "custom",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "content": {
    //any json object
  },
  "properties": {
    // "Properties" object
  }
}
```
A **custom event** conatins a payload that is entirely customizable. It can be used to send any JSON.

## Pushes

Events coming **from a server to a client** are called **pushes**. They are used to keep the application state up-to-date. Pushes are available only in the websocket transport.

As a logged in user, you'll receive server pushes whenever a chat or a thread is started, closed, etc. It applies to both the Agent and Customer Chat API. 

The [incoming event](../agent-chat-api/#incoming-event) push will inform you about the events sent to the chat (on both the agent and customer side).


## Properties

> Sample **properties**: 

```js
{
    "properties": {
        "routing": {
            "pinned": true,
            "count": 3
        }
    }
}
```
Properties are key-value storages. They can be set within a chat, a thread, or an event. 

In our example, `routing` is the namespace, while `pinned` and `count` are properties names.


### Configuration

> **Example: using properties to create a basic chat rating.** 

> We need two properties: `rating_score` and `rating_comment`. They should be writable by a Customer, and readable by an Agent in a chat.

> First, we create our properties configuration using the Configuration API.

```
curl -v https://api.livechatinc.com/configuration/properties/create_properties \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer c5e4f61e1a6c3b1521b541bc5c5a2ac5" \
    -X POST -d '
{
    "rating_score" : {
        "type" : "int",
        "locations" : {
            "chat" : {
                "access" : {
                    "agent" : {
                        "read" : true,
                        "write" : false
                    },
                    "customer" : {
                        "read" : true,
                        "write" : true
                    }
                }
            }
        }
    },
    "rating_comment" : {
        "type" : "string",
        "locations" : {
            "chat" : {
                "access" : {
                    "agent" : {
                        "read" : true,
                        "write" : false
                    },
                    "customer" : {
                        "read" : true,
                        "write" : true
                    }
                }
            }
        }
    }
}'
```
<!-- Description -->
You can create properties within a licence and configure them using the [Configuration API](../configuration-api/). They are grouped in namespaces, which helps distinguishing which property belongs to a given integration. Your namespace is always named after your `application id`.

You can configure the property [type](#property-types), [location](#property-locations), and [domain](#property-domain).

#### Property types

There are four property types:

- `int` (int32)
- `bool`
- `string`
- `tokenized_string`

The `tokenized_string` type is a string split to tokens before indexing in our search engine. It can be useful when using a property as a filter in certain methods, for example in [get_archives](../agent-chat-api/#get-archives).

#### Property locations

Properties can be set for the following locations:

- chat
- thread
- event

You can configure access to properties within those locations. For example, you could create a property visible only to agents in a chat and thread, but not in an event. For more details, see [Configuration API docs](../configuration-api/#properties).

#### Property domain

A **property domain** is a set of values that a property can be assigned to.

Property domain can be configured in two ways:

- by defining a set of values explicitly allowed in this property (for example `[1, 2, 3]`).
- by defining a range. All values within the range are allowed in this property. It works only for numeric types (for example a range from `1` to `3`).
<!-- End of description -->

> The two properties are within the namespace named after your `application id`. If you don't know your `application id`, you can check it with the request below.
> In this case, `client_id` is your `application id`.

```
curl https://accounts.livechatinc.com/info -H "Authorization: Bearer c5e4f61e1a6c3b1521b541bc5c5a2ac5"
{
    "access_token":"c5e4f61e1a6c3b1521b541bc5c5a2ac5",
    "client_id":"58737b5829e65621a45d598aa6f2ed8e",
    ...
}
```

> Now, you can set up the properties within the existing chat from the customer's perspective using the Agent/Customer Chat API method: [update_chat_properties](../customer-chat-api/#update-chat-properties).

```
curl -v https://api.livechatinc.com/customer/v0.5/action/update_chat_properties \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer c5e4f61e1a6c3b1521b541bc5c5a2ac5" \
    -X POST -d ' \
    {
        "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
        "properties": {
            "58737b5829e65621a45d598aa6f2ed8e": {
                "rating_score": 10,
                "rating_comment": "This guy is a support hero, he helped me a lot."
            }
        }
    }'
```


> The properties will be visible from the agent's perspective in the chat object as a return element (in the sample response from the [get_archives](../agent-chat-api/#get-archives) method).

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
			},
            "properties": {
                "58737b5829e65621a45d598aa6f2ed8e": {
                    "rating_score": 10,
                    "rating_comment": "This guy is a support hero, he helped me a lot."
                }
                //other namespaces
            }
		}
	}],
	"pagination": {
		"page": 1,
		"total": 3
	}
}
```

> They will also be visible in the [chat_properties_updated](../customer-chat-api/#chat-properties-updated) push.

```js
{
   "chat_id": "a0c22fdd-fb71-40b5-bfc6-a8a0bc3117f5",
"properties": {
	"58737b5829e65621a45d598aa6f2ed8e": {
           "rating_score": 10,
           "rating_comment": "This guy is a support hero, he helped me a lot.",
       }
}
}
```




## Webhooks

LiveChat provides a number of webhooks. You can manage them via the [Configuration API](../beta-docs/configuration-api/#webhooks).
We can distinguish **global webhooks** and **bot-specific webhooks**. Once **global webhooks** are set up, you will always receive them. **Bot-specific** webhooks are strongly coupled with the bot's status (`accepting chats`, `not accepting chats`, `offline`). If the bot is offline, webhooks won't be received. 