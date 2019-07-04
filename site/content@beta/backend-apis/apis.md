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

## Chatting as Customer

By default, a Customer can only have one chat started, unless he chats with Agents who use different licences. The licence Owner or Admin can change that default value, modifying the `routing.max_customer_chats_count` property (link to REST API needed). However, in order to support this functionality, you would need to build a custom Chat Widget. For now, the LiveChat Chat Widget doesn't support it. You can build a Chat Widget from the ground up using the [Chat Widget Customer SDK](../customer-sdk/).

From the Customer's perspective, having multiple concurrent chats isn't needed, as chats are continuous. Customers can always go back to the history of their chats. 

# Configuration API

## Use cases

The [**Configuration API**](../configuration-api) allows for:

- setting up licence properties
- configuring Agent's properties
- setting up webhooks
- creating and configuring Bot Agents

In the near future, it will allow for groups configuration. For now, refer to [**Platform REST API**](https://developers.livechatinc.com/docs/rest-api/) to manage groups properties.
