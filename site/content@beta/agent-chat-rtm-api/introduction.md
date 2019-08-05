---
weight: 10
---


# Introduction

## Versioning

This documentation describes the version **v3.0** of the **Agent Chat Real-Time Messaging API**.

## What is RTM API
Real-Time Messaging API (RTM API) is based on a websocket-like connection. Client can send a **request message** that results in getting a **response message**. It's also possible to get **push messages**.

## When to use RTM API
If you're wondering which API to use - Agent Chat **RTM API** or **Web API**, keep on reading.

**Real-Time Messaging API** allows for building stateful integrations that require **logging in** and **maintaining the connection**. Since connection maintenance is required, the implementation might be more challanging than with Web API.

Agent Chat RTM API enables communication in real time. It supports pushes like `sneak peek`, `typing indicator`, and other. Web API doesn’t have equivalent webhooks, which means you won't be informed about certain events using Web API. 

Also, RTM API will be a better choice if you want to avoid time delays or presume significant traffic. 

**Not what you're looking for?** Perhaps, you need to use [**Agent Chat Web API**](../agent-chat-web-api) instead.

## Authentication

**Agent authentication** is handled by access tokens. Find out how to get an **access token** from [Agent authorization flows](../authorization/#agent-authorization-flows). Client must authorize himself by [logging in](#login) within 30 seconds, otherwise the connection will be closed.

After successful authorization, client should **ping the server** each 15 seconds, otherwise the connection will be closed after about 30 seconds of inactivity. If the [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2) is unavailable (in web browsers), client should use a protocol message with the ping action. Until authorization is completed, ping is a no-op. 

All authorization scopes are listed in the [Scopes](#scopes) section. If a method requires certain scopes, you'll find them included in the method description. 

Given that the connection is continuosly maintained, you only need to authorize once. 