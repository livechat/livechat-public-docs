---
weight: 40
---

# Agent Chat API

## Use cases

The **Agent Chat API** allows for: 

- interaction with the chat as Agent (joining a chat, posting messages)
- interact with the chat by Bot Agents (acting as Agents) 
- building a custom Agent App
- browsing chat archives
- banning Customers 
- and much more

If you plan on using the **Agent Chat API** as **RTM API**, refer to [Agent Chat RTM API](../agent-chat-rtm-api). For the **Web API** usage, read the [Agent Chat Web API](../agent-chat-web-api) document.

## Chatting as Agent

The number of chats an Agent can participate in is not limited. It can be configured in the Agent App by the licence Owner or Admin.

# Customer Chat API

## Use cases

The [**Customer Chat API**](../customer-chat-api) allows for:

- interacting with the chat as Customer (join a chat, post messages)
- building a custom Chat Widget
- implementing new conversation channels (Facebook Messenger or Twitter)

<!-- If you plan on using the **Customer Chat API** as **RTM API**, refer to [Customer Chat RTM API](../customer-chat-rtm-api). For the **Web API** usage, read the [Customer Chat Web API](../customer-chat-web-api) document. -->

The **Customer Chat API** can also be used either as RTM API or Web API. For now, both usages are described in [one document]((../customer-chat-api)). We're currently working on this document, so expect changes soon!

## Chatting as Customer

By default, a Customer can only have one chat started, unless he chats with Agents who use different licences. The licence Owner or Admin can change that default value, modifying the `routing.max_customer_chats_count` property. However, in order to support this functionality, you would need to build a custom Chat Widget. For now, the LiveChat Chat Widget doesn't support it. You can build a Chat Widget from the ground up using the [Chat Widget Customer SDK](../customer-sdk/).

Chats are continuous so Customers can always preview their chats' history. Yet, with **multiple concurrent chats** Customers can sort their chats out thematically, making sure they know what each chat is about. 

# Configuration API

## Use cases

The [**Configuration API**](../configuration-api) allows for:

- storing license configurations 
- creating chat, thread, and event [properties](#properties)
- managing [webhooks](#webhooks), for example registering and unregistering
- managing [Bot Agents](#bot-agents), for example creating and removing

In the near future, it will allow for groups configuration. For now, refer to [**Platform REST API**](https://developers.livechatinc.com/docs/rest-api/) to manage groups properties.


## Properties

Properties are **key-value storages**. They can be set within a chat, a thread, or an event. You can create properties within a license and configure them using the [Configuration API](../configuration-api/). It's possible to configure the property [type](../configuration-api-/#property-types), [location](../configuration-api-/#property-locations), and [domain](../configuration-api-/#property-domain).


Refer to the [Configuration API](../configuration-api/) document to read more about the [property format](../configuration-api/#property-data-structure) and available [endpoints](../configuration-api/#properties).


## Webhooks

LiveChat provides a number of webhooks. You can manage them via the [Configuration API](../beta-docs/configuration-api/#webhooks).
We can distinguish **global webhooks** and **bot-specific webhooks**. Once **global webhooks** are set up, you will always receive them. **Bot-specific** webhooks are strongly coupled with the bot's status (`accepting chats`, `not accepting chats`, `offline`). If the bot is offline, webhooks won't be received. 

## Bot Agents

Bot Agents are similar to their human counterparts. They can join chats and post messages, but they also have a special feature: you can attach [webhooks](../configuration-api/#webhooks) to them.

<!-- <img src="images/bot-agent.jpg" alt="LiveChat Bot Agent" class="has-border"/> -->

<!-- Zmienic ta grafike!!! -->

Bot Agents are created and managed via the [Configuration API](../configuration-api/#bot-agent). They communicate with the [Agent Chat API](../agent-chat-api/) by the [**Web API**](../agent-chat-api/#web-api) or [**websocket connection**](#rtm-api-vs-web-api). 
Bot Agents are authorized with the use of the Agent's token. Using Bot Agents requires sending the `author_id` property.
They can listen to incoming webhooks (or pushes) and react to them.

<!-- #### Reacting to keywords

Bot Agents can react to specific keywords appearing in the chat. Let's say you set a _pizza_ keyword. Your Bot Agent will join the chat whenever the keyword is used and send the _"Woohoo!"_ message to all agents in the chat. Then, it'll leave the chat.

#### Bots vs. regular Agents

Here are the major differences between Bot Agents and regular Agents:

* You can't log in to a Bot Agent account.
* You can't set password for a Bot Agent account.
* Bot Agents don't have email addresses. Their <code>agent_id</code> is a random hash.
* You can assign webhooks to Bot Agents as a communication channel for [pushes](../agent-chat-api/#pushes). -->

<!-- ### Technical notes

* Bot Agents use the [Agent Chat API](../agent-chat-api/) to post messages to chats as Agents, so you can use them to write your own integrations. 

* When logged in, a Bot Agent is connected to the Agent's SSO access token, which creates and updates the Bot. A Bot Agent is logged out when the access token is revoked.

* Each Bot Agent is **a resource** owned by an application (identified by `client_id`) in the [Developers Console](https://developers.livechatinc.com/console/). **My Bot Agents** are the Bots owned by the application with a given `client_id`. -->