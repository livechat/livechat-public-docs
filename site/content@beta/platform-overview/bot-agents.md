---
weight: 50
---

# Bot Agents (chatbots)

<img src="images/bot-agent.jpg" alt="LiveChat Bot Agent" class="has-border"/>

Bot Agents are similar to their human counterparts. They can join chats and post messages, but they also have a special feature: you can attach [webhooks](../configuration-api/#webhooks) to them.

## What can Bot Agents do?

Bot Agents are created with the [Configuration API](../configuration-api/). Then, Bot Agents communicate with the [Agent Chat API](../agent-chat-api/) by the [Web API](../agent-chat-api/#web-api) or websocket connection, listening to incoming webhooks (or pushes) and reacting to them.

### Post messages and react to keywords

Bot Agents can react to specific keywords during chats. For example, if you set the keyword to "pizza", the Bot Agent will join the chat where the keyword was used, send "Pizza is on the way!" to all agents in the chat and then leave the chat.

## Differences between Bot Agents and regular Agents

* You can't log in to a Bot Agent account.
* You can't set password for a Bot Agent account.
* Bot Agents don't have email addresses. Their <code>agent_id</code> is a random hash.
* You can assign webhooks to Bot Agents as a communication channel for [pushes](../agent-chat-api/#pushes).

## Technical notes

* Bot Agents use the [Agent Chat API](../agent-chat-api/) to post messages to chats as Agents, so you can use them to write your own integrations. 

* When logged in, a Bot Agent is connected to the agent SSO access token that creates and updates the Bot. A Bot Agent is logged out when the access token is revoked.

* Each Bot Agent is **a resource** owned by an application (identified by `client_id`) in the [Developers Console](https://developers.livechatinc.com/console/). "My Bot Agents" are the Bots owned by the application with a given `client_id`.

## Configuring Bot Agents

You can create and manage Bot Agents using the [Configuration API](../configuration-api/#bot-agent).

<div class="callout type-warning">Currently we doesnt's support group management. All agents belong to group 0 by default.</div>

<!--

## A sample Bot Agent

We have created a sample Pizza Bot to illustrate the concept of Bot Agents. 

* [Pizza Bot at Github](https://github.com/livechat/chat.io-integrations/tree/master/python/pizzabot_example)

-->
