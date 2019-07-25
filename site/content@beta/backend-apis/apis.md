---
weight: 40
---

# Agent Chat API

## Use cases

The [**Agent Chat API**](../agent-chat-api) allows for: 

- interaction with the chat as Agent (joining a chat, posting messages)
- interact with the chat by Bot Agents (acting as Agents) 
- building a custom Agent App
- browsing chat archives
- banning Customers 
- and much more

## Chatting as Agent

The number of chats an Agent can participate in is not limited. It can be configured in the Agent App by the licence Owner or Admin.

# Customer Chat API

## Use cases

The [**Customer Chat API**](../customer-chat-api) allows for:

- interacting with the chat as Customer (join a chat, post messages)
- building a custom Chat Widget
- implementing new conversation channels (Facebook Messenger or Twitter)

## Chatting as Customer

By default, a Customer can only have one chat started, unless he chats with Agents who use different licences. The licence Owner or Admin can change that default value, modifying the `routing.max_customer_chats_count` property. However, in order to support this functionality, you would need to build a custom Chat Widget. For now, the LiveChat Chat Widget doesn't support it. You can build a Chat Widget from the ground up using the [Chat Widget Customer SDK](../customer-sdk/).

Chats are continuous so Customers can always preview their chats' history. Yet, with **multiple concurrent chats** Customers can sort their chats out thematically, making sure they know what each chat is about. 

# Configuration API

## Use cases

The [**Configuration API**](../configuration-api) allows for:

- storing license configurations, 
- creating chat, thread, and event [properties](#properties)
- managing [webhooks](#webhooks), for example registering and unregistering
- managing [Bot Agents](#bot-agents), for example creating and removing

In the near future, it will allow for groups configuration. For now, refer to [**Platform REST API**](https://developers.livechatinc.com/docs/rest-api/) to manage groups properties.

<!-- Czy ten przyklad wnosi jakas wartosc i w ogole jest dzialajacy? Pozbylabym sie go zupelnie i przyjela, ze w tym dokumencie nie ma kodu. Wtedy mozna sie pozbyc tego szarego bloku na kod po prawej i lepiej wyswietlac grafiki i animacje ktore dojda. -->

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
<!-- Szkoda zostawiac caly szary blok na kod tylko po to, zeby wysietlic maly fragmencik prezentujacy properties. Moze zamiast tego przykladu dac
link do repo? Albo wstawic to jako obrazek? Chyba ze jest jakis inny sposob formatowania, zeby to nie uciekalo na prawo. -->
Properties are key-value storages. They can be set within a chat, a thread, or an event. 



In our example, `routing` is the namespace, while `pinned` and `count` are properties names.


#### Configuration

<!-- > **Example: using properties to create a basic chat rating.** 

> We need two properties: `rating_score` and `rating_comment`. They should be writable by a Customer, and readable by an Agent in a chat.

> First, we create our properties configuration using the Configuration API.

```json
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
``` -->

You can create properties within a license and configure them using the [Configuration API](../configuration-api/). They are grouped in namespaces, which helps distinguishing which property belongs to a given integration. Your namespace is always named after your `application id`.

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

<!-- > The two properties are within the namespace named after your `application id`. If you don't know your `application id`, you can check it with the request below.
> In this case, `client_id` is your `application id`. You can find the `client_id` in [**Developers Console**](https://developers.livechatinc.com/console/) **>> the Authorization building block** of your app.

```json
curl https://accounts.livechatinc.com/info -H "Authorization: Bearer c5e4f61e1a6c3b1521b541bc5c5a2ac5"
{
    "access_token":"c5e4f61e1a6c3b1521b541bc5c5a2ac5",
    "client_id":"58737b5829e65621a45d598aa6f2ed8e",
    ...
}
```

> Now, you can set up the properties within the existing chat from the customer's perspective using the Agent/Customer Chat API method: [update_chat_properties](../customer-chat-api/#update-chat-properties).

```json
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
``` -->

## Webhooks

LiveChat provides a number of webhooks. You can manage them via the [Configuration API](../beta-docs/configuration-api/#webhooks).
We can distinguish **global webhooks** and **bot-specific webhooks**. Once **global webhooks** are set up, you will always receive them. **Bot-specific** webhooks are strongly coupled with the bot's status (`accepting chats`, `not accepting chats`, `offline`). If the bot is offline, webhooks won't be received. 

## Bot Agents

Bot Agents are similar to their human counterparts. They can join chats and post messages, but they also have a special feature: you can attach [webhooks](../configuration-api/#webhooks) to them.

<img src="images/bot-agent.jpg" alt="LiveChat Bot Agent" class="has-border"/>

<!-- Zmienic ta grafike!!! -->

Bot Agents are created and managed with the use of the  [Configuration API](../configuration-api/#bot-agent). They communicate with the [Agent Chat API](../agent-chat-api/) by the [**Web API**](../agent-chat-api/#web-api) or [**websocket connection**](#rtm-api-vs-web-api). They listen to incoming webhooks (or pushes) and react to them.

#### Reacting to keywords

Bot Agents can react to specific keywords appearing in the chat. Let's say you set a _pizza_ keyword. Your Bot Agent will join the chat whenever the keyword is used and send the _"Woohoo!"_ message to all agents in the chat. Then, it'll leave the chat.

#### Bots vs. regular Agents

Here are the major differences between Bot Agents and regular Agents:

* You can't log in to a Bot Agent account.
* You can't set password for a Bot Agent account.
* Bot Agents don't have email addresses. Their <code>agent_id</code> is a random hash.
* You can assign webhooks to Bot Agents as a communication channel for [pushes](../agent-chat-api/#pushes).

<!-- ### Technical notes

* Bot Agents use the [Agent Chat API](../agent-chat-api/) to post messages to chats as Agents, so you can use them to write your own integrations. 

* When logged in, a Bot Agent is connected to the Agent's SSO access token, which creates and updates the Bot. A Bot Agent is logged out when the access token is revoked.

* Each Bot Agent is **a resource** owned by an application (identified by `client_id`) in the [Developers Console](https://developers.livechatinc.com/console/). **My Bot Agents** are the Bots owned by the application with a given `client_id`. -->