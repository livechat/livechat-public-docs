---
weight: 10
---

# Introduction

Hello there! 👋

This article explains the basic concepts behind the new LiveChat Platform APIs.

## What is new?

New Platform APIs introduce new features and multiple improvements over 2.0 APIs. There are three main areas we can see major improvements: Messaging Protocol, LiveChat App and Chat Widget.

The most important improvement is that new APIs let you **handle online conversations**. It means you can send and receive messages, exchange events and perform all variety of actions within the LiveChat ecosystem.

### New Messaging Protocol

The protocol describes an entire conversation. It is a common language for a chat widget, agent app, and backend infrastructure. It defines the structure of messages (rich and plain text), events (pre-chat surveys, start, and end of the chat).

It is the very core of the LiveChat product. It defines how messages are formatted (what data can be sent), the transport (how the data is sent) and participants (who can send and receive data).

Previously the protocol was closed. There was no easy way to intercept the message on the fly or participate in the conversation. New protocol is extensible by design and handles various kinds of information: rich messages, events or nested data structures.

> Where ⚠️ means partial or cumbersome implementation, ❌no support at all and ✅ full support with complete documentation.

| Feature                          | Old APIs | New APIs |
| -------------------------------- | -------- | -------- |
| text messaging APIs              | ✅       | ✅       |
| rich messaging APIs              | ️️⚠️     | ✅       |
| asynchronous transport (Web API) | ️⚠️      | ✅       |
| real-time transport (sockets)    | ❌       | ✅       |
| continuous, threaded chat        | ❌       | ✅       |
| chatbots                         | ❌       | ✅       |
| concurrent chats of customer     | ❌       | ✅       |
| custom chat events               | ️❌      | ✅       |
| editable chat events             | ❌       | ✅       |
| chat routing APIs                | ️⚠️      | ✅       |
| unlimited visitors tracking      | ❌       | ✅       |

#### New Chat APIs Overview

There are two primary chat APIs available:

- [Agent Chat API](../agent-chat-api)<br/>to send chat messages as an agent,
- [Customer Chat API](../customer-chat-api)<br/> to send chat messages as a customer (visitor) .

Both APIs have much in common. However, their use cases are different, which is reflected in their methods.

See the diagram below to understand the basic flow of information between the services. The animation explains the basic chat flow: from logging in, through starting a chat, to sending [events](#events).

<video loop width="750" height="500" style="height: auto;" controls>
<source type="video/mp4" src="/beta-docs/platform-overview/images/simple_event_schema.mp4">
</video>

#### New Configuration APIs Overview

New Configuration API is a service for storing configuration of license. It allows to set up different types of features such as properties or webhooks. It also enables you to create chatbots.

### New LiveChat App

LiveChat App is primary tool for customer representatives, marketers, managers and business owners. Home for all relations of customers of LiveChat customers.

With new Platform APIs also come new extension possibilites in the LiveChat App.

> Where ⚠️ means partial or cumbersome implementation, ❌no support at all and ✅ full support with complete documentation.

| Feature                        | Old APIs | New APIs |
| ------------------------------ | -------- | -------- |
| embeddable modules and widgets | ️️⚠️     | ✅       |
| stateless conversations        | ❌       | ✅       |
| customizable customer list     | ️️❌     | ✅       |
| full-screen app modules        | ️️❌     | 🔜       |

### New LiveChat Chat Widget

The very face of LiveChat for customers, the most heavy-loaded piece of LiveChat ecosystem. Web-app with text messaging, file sharing and other live messaging functionalities. New Platform APIs empower Chat Widget to receive and send variety of rich messages, introduce apps and new theming system.

> Where ⚠️ means partial or cumbersome implementation, ❌no support at all and ✅ full support with complete documentation.

| Feature              | Old APIs | New APIs |
| -------------------- | -------- | -------- |
| text messages        | ✅       | ✅       |
| rich messages        | ️️⚠️     | ✅       |
| apps                 | ❌       | ✅       |
| customization wizard | ❌       | ✅       |

### New app types

In short, new Platform APIs enable developers to build brand new types of apps and entire products. To name just a few:

- chatbots, conversational interfaces,
- external channels integrations including email, SMS, ABC or RCS,
- advanced reporting apps for managers, custom dashboards or email reporting
- custom engagement metrics, customer scoring, customer and lead managment, supervision tools,
- live translation, natural language processing and ML/AI implementations,
- agent workflow automations, advanced chat routing, shortcut and macros.

## Basic usage

The most basic use cases of the LiveChat APIs are listing and performing chats. This section describes the general concept of both. For working examples in JavaScript, Go and Python head to the API references:

- [Agent Chat API examples](../agent-chat-api/#examples)
- [Customer Chat API examples](../customer-chat-api/#examples)

### Listing chats

When you log in to the Agent or Customer API you will receive one of the following reponses:

- `chats_summary`
- `last_chats_summary`

These objects contain chat and thread IDs. The IDs can be used to retrieve chat history.

If you want to retrieve chats from the customer perspective, you should use [Customer Chat API](../customer-chat-api). When you log in as an agent, you should go with [Agent Chat API](../agent-chat-api).

### Performing a chat

You can start a chat both as a customer and as an agent. If you are an agent you can also [join](../agent-chat-api/#add-user-to-chat) a chat. When you are in a chat you can send events to it via [send_event](../agent-chat-api/#send-event) method.

Currently all new events and chats are sent to all agents within the license. In the future, _scopes_ will define which groups of users have access to chats/events and other types of data.
