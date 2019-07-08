---
weight: 10
---

# Introduction

Hello developers!

This tutorial will help you build a LiveChat webhook integration and get it listed in [LiveChat Marketplace](http://www.livechatinc.com/marketplace/).

## Use cases

A typical use case for webhook integration is connecting LiveChat to an external CRM, marketing automation tools, or data analytics platforms.

Follow this tutorial if you're developing a LiveChat integration that reacts to internal LiveChat events, such as a new incoming chat or queued visitor.

For instance, if you're integrating a marketing automation tool, you could add a new contact every time a LiveChat visitor starts a chat.

## Important notes

To use this tool you need to have basic knowledge about [webhooks](https://en.wikipedia.org/wiki/Webhook) and LiveChat [authorization protocol](/docs/authorization/) (OAuth2.0). 

This tutorial won't be helpful for building integrations that pull data on demand (not in reaction to some LiveChat event). If you just want to pull LiveChat reports on user request, you'd rather just use [REST API](/docs/rest-api/).

# Getting started


## Prerequisites

You'll need a LiveChat Developers Account. [Sign up](https://developers.livechatinc.com/console/) to your Developers Console.

## I. Create and configure app

> Go to Developers Console > Apps and create new app.

> <img src="../assets/images/build-integration/livechat-developers-console-create-app.png" alt="Create LiveChat App" width="500" style="margin-top: 10px; margin-bottom: 20px;"/>

<!--
> Create new Settings widget.

> <img src="../assets/images/build-integration/livechat-developers-console-create-widget.png" alt="Create LiveChat App" width="500" style="margin-top: 10px; margin-bottom: 20px;"/>

> Create new server-side Authorization block.

> <img src="../assets/images/build-integration/livechat-developers-console-create-auth.png" alt="Create LiveChat App" width="500" style="margin-top: 10px;"/>

-->


1. Sign in to [Developers Console](https://developers.livechatinc.com/console/apps/)
2. Create new app.

3. In Building Blocks section:
  1. Create new Agent App Widget with `App Settings` placement. This widget will be displayed as a settings page for your app.
  2. Create new `Server-side app` Authorization Block. Save the highlighted `Client ID` &ndash; you'll need it later!

## II. Create a simple settings page

Settings page is the place where you can:

- ask users to connect their accounts with your OAuth2.0 provider,
- display configuration options,
- inform users about additional installation steps (if there are any).

 If you need to access LiveChat user data, we recommend using [Sign in with LiveChat SDK](/docs/sign-in-with-livechat/).

 For instance if you're building an integration that binds LiveChat data with an external service, you should create a settings page that:

 - imports [Sign in with LiveChat SDK](/docs/sign-in-with-livechat/) and inits authorization with data from Authorization Block created in step I.3.2
 - imports your sign in form or other authorization flow (e.g. "Connect with..." button)
 - binds both informations and stores new user in your database
 - displays a confirmation screen when the integration is up and running

 The settings page will be available right after LiveChat user installs your app in the Marketplace. 

## III. Create the webhook listener

Once you have LiveChat credentials from II. you can register your LiveChat webhooks with [Webhook REST API](/docs/rest-api/#create-a-new-webhook/). For development purposes we recommend setting your webhooks from within [LiveChat Agent App](#set-up-the-webhooks-for-development).

