---
weight: 10
---

# Introduction

Hello there! 👋

This article explains the basic concepts behind the LiveChat APIs.

The LiveChat APIs let you **handle online conversations**. It means you can send and receive messages, exchange events and perform other actions within the LiveChat system. 

The communication protocol handles various kinds of information: rich messages, events or nested data structures.

## APIs Overview

There are two primary APIs available:

- [Agent Chat API](../agent-chat-api)<br/>to send chat messages as an agent,
- [Customer Chat API](../customer-chat-api)<br/> to send chat messages as a customer (visitor) .

Both APIs have much in common. However, their use cases are different, which is reflected in their methods. 

See the diagram below to understand the basic flow of information between the services. The animation explains the basic chat flow: from logging in, through starting a chat, to sending [events](#events).

<video loop width="750" height="500" controls>
<source type="video/mp4" src="/beta-docs/platform-overview/images/simple_event_schema.mp4">
</video>


## Basic usage 

The most basic use cases of the LiveChat APIs are listing and performing chats. This section describes the general concept of both. For working examples in JavaScript, Go and Python head to the API references:

- [Agent Chat API examples](../agent-chat-api/api-reference/v0.3#examples)
- [Customer Chat API examples](../customer-chat-api/api-reference/v0.3#examples)

### Listing chats

When you log in to the Agent or Customer API you will receive one of the following reponses: 

- `chats_summary` 
- `last_chats_summary`

These objects contain chat and thread IDs. The IDs can be used to retrieve chat history.

If you want to retrieve chats from the customer perspective, you should use [Customer Chat API](../customer-chat-api). When you log in as an agent, you should go with [Agent Chat API](../agent-chat-api).

### Performing a chat

You can start a chat both as a customer and as an agent. If you are an agent you can also [join](../agent-api/api-reference/#join-chat) a chat. When you are in a chat you can send events to it via [send_event](../agent-api/api-reference/#send-event) method.

Currently all new events and chats are sent to all agents within the license. In the future, *scopes* will define which groups of users have access to chats/events and other types of data.
