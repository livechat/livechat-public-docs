---
weight: 70
---

# Properties

Properties are simple key-value storages. They can be set within a chat, a thread or an event. They appear in these objects in the following format:

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

In this example `routing` is a namespace, while `pinned` and `count` are properties names.

## Configuration

Properties are configurable via [Configuration API](../configuration-api/). They can be created whithin a license and they are grouped in namespaces, which help distinguish which property belongs to a given integration.
Your namespace will be named after your application id.

There are several things that you can configure:

### Property types

There are three property types:

* `int` (int32)
* `bool`
* `string`
* `tokenized_string`

#### Note about tokenized_string

`tokenized_string` is string that is split to tokens before indexing in our search engine. This can be useful if you want to use that property as a filter in the methods like [get_archives](../agent-chat-api/#get-archives).

### Property locations

Properties can be set within three locations:

* chat
* thread
* event

You can configure access to properties within those locations. You can, for example, create a property that is visible for agents within a chat and a thread, and not visible within an event. For more details, see [Configuration API docs](../configuration-api/#properties).

### Property domain

<div class=“callout type-info”>Property domain is a set of values that property can be assigned to.</div>

Property domain can be configured in 2 different ways:

* by defining a set of values allowed in this property explicitly (for example `[1, 2, 3]`)
* by defining a range, all values in this range are allowed in this property, this setting works only for numeric types (for example range from `1` to `3`)

## Example

In this example we want to use properties to create a basic chat rating. For this purpose we need two properties: rating_score and rating_comment. Those properties should be writable by customer, and readable by agent within a chat.

First we need to create our properties configuration using Configuration API.

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

Now you have properties `rating_score` and `rating_comment` in namespace named after your application id. If you don't know your application id you can check it with this request:

```
curl https://accounts.livechatinc.com/info -H "Authorization: Bearer c5e4f61e1a6c3b1521b541bc5c5a2ac5"
{
    "access_token":"c5e4f61e1a6c3b1521b541bc5c5a2ac5",
    "client_id":"58737b5829e65621a45d598aa6f2ed8e",
    ...
}
```

`client_id` is your application id.

Now, you can set those properties within the existing chat from customer perspective via agent/customer api method [update_chat_properties](../customer-chat-api/#update-chat-properties)
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

And they will appear from the agent's perspective either in chat object as a return element (in the sample response from [get_archives](../agent-chat-api/#get-archives) method)

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

 or in push [chat_properties_updated](../customer-chat-api/#chat-properties-updated)

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
