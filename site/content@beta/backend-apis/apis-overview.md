---
weight: 30
---

# APIs Overview

There are two primary Chat APIs:

- [Agent Chat API](https://developers.livechatinc.com/beta-docs/agent-chat-api/), which serves to join a chat as an agent.
- [Customer Chat API](https://developers.livechatinc.com/beta-docs/customer-chat-api/), which serves to join a chat as a customer.

The **Agent Chat API** contains a different set of methods than the **Customer Chat API**. We separated both APIs as they cover different use cases. 

To use those APIs, you need to be _authorized_. This topic is thoroughly explained in the [**Authorizing API calls**](../authorization) document.

### RTM API vs. Web API

Agent Chat API and Customer Chat API can be used either as **Real Time Messaging APIs (RTM APIs)** or **Web API**. 

To learn about differences between these two API types, see the comparison below:


|**Characteristics**|     **RTM API**      | **Web API**               |
|:-----------------:|:--------------------:|:-------------------------:|
|**connection type**|   stateful  e.g. websocket        |  stateless, via XHR requests     |
| **finds out about state changes via**  |   [pushes](#pushes)      |    [webhooks](#webhooks)   |
|**used by** |Agent App, Chat Widget|external apps, integrations|


<!-- RTM API enables real-time communication. Websocket transport allows for **pushes**, which are server-client methods used to keep application state up-to-date. In case of the Agent App and the Chat Widget, the continuous connection is crucial. That's why they both implement RTM API. 

Integrations built upon the LiveChat Platform don't usually need to keep the connection open continuously. In the context of app functioning, short delays are insignificant. It's the reason why **Web API** is more commonly used than **RTM API** when building an integration. Just like REST API, Web API is based on sending the **request** and getting the **response**. Instead of pushes, Web API makes use of **webhooks**.
-->

## Events

**Events** are portions of data sent to a chat using the [send_event](https://developers.livechatinc.com/beta-docs/agent-chat-api/#send-event) method. 

See reference for a particular event type, either in the Agent or Customer Chat API: 

| Agent  | Customer | Description |
|-------|--------| --------| 
| [message](../agent-chat-api/#message)   |   [message](../customer-chat-api/#message)   | sending a text messages to other chat users|
| [system message](../agent-chat-api/#system-message) |   [system message](../customer-chat-api/#system-message)   | a server-generated event|
| [filled form](../agent-chat-api/#filled-form) |   [filled form](../customer-chat-api/#filled-form)   | contains data from a form |
| [file](../agent-chat-api/#file) |   [file](../customer-chat-api/#file)   | informs about a file upload |
| [custom](../agent-chat-api/#custom) |   [custom](../customer-chat-api/#custom)   | an event with the customizable payload |
| [rich message](../agent-chat-api/#rich-message) |   [rich message](../customer-chat-api/#rich-message)   | sending a rich message |

## Pushes

Events coming **from a server to a client** are called **pushes**. They are used to keep the application state up-to-date. Pushes are available only in the websocket transport.

As a logged in user, you'll receive server pushes whenever a chat or a thread is started, closed, etc. It applies to both the Agent and Customer Chat API. 

The [incoming event](../agent-chat-api/#incoming-event) push will inform you about the events sent to the chat (on both the agent and customer side).


| Resource  | Agent | Customer |
|-------|--------| --------| 
| **access**   | `access_granted` `access_revoked` `access set` | `access_set` |
| **ban** | `customer_banned` | |
| **chat** | `chat_transferred`      | `chat_transferred` |
| **event** |`incoming_event`  `event_updated`| `incoming_event`  `event_updated` |
| **properties** | `chat_properties_updated` `chat_properties_deleted` `event_properties_updated` `event _properties_deleted` `chat_thread_properties_deleted` `chat_thread_properties_updated`| `chat_properties_updated` `chat_properties_deleted` `event_properties_updated` `chat_thread_properties_deleted` `event _properties_deleted` `chat_thread_properties_updated` |
| **sneak peak** | `incoming_sneak_peek`  |  |
| **thread** | `incoming_chat_thread` `thread closed` `chat_thread_tagged` `chat_thread_untagged` `last_seen_timestamp_updated` | `incoming_chat_thread` `thread closed` `last_seen_timestamp_updated` |
| **typing indicator** | `incoming_typing_indicator`  | `incoming_typing_indicator` |
| **user** | `agent_updated` `agent_disconnected` `chat_user_added` `chat_user_removed` `customer_created` `customer_updated` `customer_visit_started` `customer_visit_ended` `customer_page_updated` | `chat_user_added` `chat_user_removed` `customer_updated` `customer_page_updated` `customer_side_storage_updated` `customer_disconnected`|

<!-- Gdzie dac: incoming_rich_message_postback oraz incoming_multicast? -->


