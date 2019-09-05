---
weight : 10
---

# Introduction

## Versioning

This documentation describes the version **v3.0** of the **Customer Chat Real-Time Messaging API**.

## What is RTM API
Real-Time Messaging API (RTM API) is based on a websocket-like connection. Client can send a **request message** that results in getting a **response message**. It's also possible to get **push messages**.

## When to use RTM API
If you're wondering which API to use - Customer Chat **RTM API** or **Web API**, keep on reading.

**Real-Time Messaging API** allows for building stateful integrations that require **logging in** and **maintaining the connection**. Since connection maintenance is required, the implementation might be more challenging than with Web API.

Customer Chat RTM API enables communication in real time. It supports pushes like `sneak peek`, `typing indicator`, and other. Web API doesn’t have equivalent webhooks, which means you won't be informed about certain events using Web API. 

Also, the RTM API will be a better choice if you want to avoid time delays or presume significant traffic. 

**Not what you're looking for?** Perhaps, you need to use [**Customer Chat Web API**](../customer-chat-web-api)<sup>[![LiveChat Link](link.svg)](../customer-chat-web-api)</sup> instead.

## Authentication

**Customer authentication** is handled by access tokens. Find out how to get an **access token** from [Customer authorization flows](https://developers.livechatinc.com/docs/authorization/)<sup>[![LiveChat Link](link.svg)](../authorization/#customer-authorization-flows)</sup>. Client must authorize himself by [logging in](#login) within 30 seconds, otherwise the connection will be closed.

After successful authorization, client should **ping the server** each 15 seconds, otherwise the connection will be closed after about 30 seconds of inactivity. If the [control frame ping](https://tools.ietf.org/html/rfc6455#section-5.5.2)<sup>[![LiveChat Link](link.svg)](https://tools.ietf.org/html/rfc6455#section-5.5.2)</sup> is unavailable (in web browsers), client should use a protocol message with the ping action. Until authorization is completed, ping is a no-op. 

If a method requires particular authorization scopes, you'll find them included in the method description. 

Given that the connection is continuosly maintained, you only need to authorize once. 