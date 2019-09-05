---
weight: 30
---

# APIs Overview

There are two primary Chat APIs:

- **Agent Chat API**, which serves to join a chat as Agent.
- **Customer Chat API**, which serves to join a chat as Customer.

The separation of Chat APIs helps you decide which set of methods you should use. It depends on the role of the chat user. Want to join a chat as Agent? Refer to the Agent Chat API. Want to send messages as Customer? Use the Customer Chat API.

To use both APIs, you need to be _authorized_. This topic is thoroughly explained in the [**Authorizing API calls**](../authorization) document.

## RTM API vs. Web API

Agent Chat API and Customer Chat API can be used either as **Real-Time Messaging APIs (RTM APIs)** or **Web APIs**. 

To learn about differences between these two API types, see the comparison below:


|**Characteristics**|     **RTM API**      | **Web API**               |
|:-----------------:|:--------------------:|:-------------------------:|
|**connection type**|   stateful  e.g. websocket        |  stateless, via XHR requests     |
| **finds out about state changes via**  |   [pushes](../agent-chat-rtm-api/pushes)      |    [webhooks]((../agent-chat-web-api/pushes))   |
|**used by** |Agent App, Chat Widget|external apps, integrations|
|**documentation** |[Agent Chat RTM API](../agent-chat-rtm-api/#when-to-use-rtm-api) & [Customer Chat RTM API](../customer-chat-api/#real-time-messaging-api) |[Agent Chat Web API](../agent-chat-web-api/#when-to-use-web-api) & [Customer Chat Web API](../customer-chat-api/#web-api)|

If you're not sure, which implementation to choose, we suggest reading about particular APIs. You'll find the **When to use RTM/Web API** section in each document - refer to the table above for links.

