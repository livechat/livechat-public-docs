---
title: 'Agent API Guide'
weight: 10
---

# Introduction

## Overview

LiveChat Agent API allows you to join a chat as **an agent**. It has a different set of methods than the [Customer API](/beta-docs/customer-api/). The main reason to have separate APIs for both Customer and Agent are their specific use cases.

## Use cases

With LiveChat Agent API you can do the following:

- build a custom Agent App
- interact with a chat as an agent (join a chat, post messages)
- browse chat archives
- ban customers

## Important notes

To use this tool you need to have basic knowledge of REST or websocket APIs, OAuth 2.0 protocol and your technology of choice. We've got examples ready in JavaScript, Go and Python.

If you want to perform a chat from the customer perspective, you should use [Customer API](/beta-docs/customer-api/).

<div class="callout type-warning">This API is under <strong>heavy development</strong>. We introduce changes every month. If you want to stay updated, follow the changelog below.</div>

# Getting started

## Prerequisites

To start off with LiveChat Agent API, follow these steps:

1. Sign up or sign in to the [Developers Console](https://developers.livechatinc.com/console/).
2. Create a new app ("Backend" type).
3. Copy the Client Secret and Client ID.

<!--
## Working example

>_I've prepared the workspace. What do I need to do, to see it running?_

There is a ready-to-use example... To see the online demo... Do X to see it working...

# Basic usage

>_Now, once I saw it in action, I want to see more._

## Extended example

>_What else can I do with this tool?_

To better understand the power of this tool, check out following guides. To explore all of the functionalites, go to the API reference...

### Guide on creating

...

### Using this tool to

...

### Guide on preparing

...

# Advanced usage

>_I've already worked with this tool. I've mastered its basic use case. I want more._

## Advanced example
>_What are the most advanced / complex / hard use cases of this tool?_

Although this tool is dedicated to... we've seen people successfully using it to... To find out the advanced use cases, check this guides below.

### Guide on building your own

...

### Creating X from the ground up

...

## How it works
>_How this tool works internally? Can I modify or extend this tools' functionalities?_

If you want to tailor this tool for your very specific use case...

# Help and Support

>_I still have some questions. I've scrolled here impatiently. Where should I go?_

## Feedback

>_I ~hate~ love this tool! Where can I leave some feedback?_

The best way to leave the feedback is... We're always open for changes... Let us know if...

## Contributing

>_How can I help to improve this tool?_

If you want to help us out...

# API reference

>_I'm here every day for the last week. Just let me know what this method does._

## Methods, Callbacks, Objects definitions

>_I expect here to see the full technical index of all methods, callbacks and objects._

-->
