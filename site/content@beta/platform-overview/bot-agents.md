---
weight: 50
---

# BOT Agents

<img src="images/bot-agent.jpg" alt="LiveChat BOT Agent" class="has-border"/>

BOT Agents are similar to their human counterparts. They can join chats and post messages, but they also have a special feature: you can attach [webhooks](../configuration-api/#webhooks) to them.

## What can BOT Agents do?

BOT Agents are created with the [Configuration API](../configuration-api/). Then, BOT Agents communicate with the [Agent Chat API](../agent-chat-api/) by the [Web API](../agent-chat-api/#web-api) or websocket connection, listening to incoming webhooks (or pushes) and reacting to them.

### Post messages and react to keywords

BOT Agents can react to specific keywords during chats. For example, if you set the keyword to "pizza", the BOT Agent will join the chat where the keyword was used, send "Pizza is on the way!" to all agents in the chat and then leave the chat.

## Differences between BOT Agents and regular Agents

* You can't log in to a BOT Agent account.
* You can't set password for a BOT Agent account.
* BOT Agents don't have email addresses. Their <code>agent_id</code> is a random hash.
* You can assign webhooks to BOT Agents as a communication channel for [pushes](../agent-chat-api/#pushes).

## Technical notes

* BOT Agents use the [Agent Chat API](../agent-chat-api/) to post messages to chats as Agents, so you can use them to write your own integrations. 

* When logged in, a BOT Agent is connected to the agent SSO access token that creates and updates the BOT. A BOT Agent is logged out when the access token is revoked.

* Each BOT Agent is **a resource** owned by an application (identified by `client_id`) in the [Developers Console](https://developers.livechatinc.com/console/). "My BOT Agents" are the BOTs owned by the application with a given `client_id`.

## Configuring BOT agents

You can create and manage BOT agents using the [Configuration API](../configuration-api/#bot-agent).

<div class="callout type-warning">Currently we doesnt's support group management. All agents belong to group 0 by default.</div>

<!--

## A sample BOT Agent

We have created a sample Pizza Bot to illustrate the concept of BOT Agents. 

* [Pizza Bot at Github](https://github.com/livechat/chat.io-integrations/tree/master/python/pizzabot_example)

-->
