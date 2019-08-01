---
weight: 10
---

# Getting started

## Introduction

The Chat Widget JavaScript API lets you interact with the Chat Widget embedded on your site.
It might come in handy whenever you would like to gather some additional data using LiveChat, show or hide your Chat Widget on certain occasions or amend its behaviour the way which is not provided by the standard settings.

Documentation presented here is focused rather on the Developers and requires a basic knowledge of JavaScript. however if you would have any questions don't hesitate to start a chat with our Support Team or just add a new topic on [Developers Community](https://www.livechatinc.com/community/c/developers-api).

This API works only with the [new Chat Widget](https://developers.livechatinc.com/blog/new-chat-window-look/).

## Simple usage

The API is accessed through the `LiveChatWidget` object.
It is being initialized within the LiveChat tracking code, which is used to install our Chat Widget on your site.
If you haven't installed the code already, you can find it directly in the [LiveChat app](https://my.livechatinc.com/settings/code). The API requires the newest version of the code snippet, so if you had installed the code a while ago and the API presented here doesn't work, you should either update the code or use the [old version of JS API](https://developers.livechatinc.com/docs/js-api/#introduction).

This object comes with four methods:

- `on` and `off` which are responsible for handling callbacks,
- `call` which allows you to trigger functions,
- `get` which makes it possible to fetch data.

Using these methods is based on passing the correct arguments in the following pattern: `LiveChatWidget.method('method', 'data')`.
For example, if you would like to set your Customer's name to `John Doe`, this is how it would look like:

`LiveChatWidget.call('set_visitor_name', 'John Doe')`
