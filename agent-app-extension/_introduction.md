# Introduction

## What is an Agent App Extension?

Agent App Extensions are web applications loaded inside the LiveChat Agent App. All agents can interact with the extension during chats with customers. The extension itself is displayed in the Agent's App sidebar:

<img src="../__images/agent-app-extension.png" width="500" style="margin-top: 20px;"/>

## Before you start

This guide describes the flow of development. Once your extension is ready to deploy let us know and we'll guide you to the production.

## Layout & Styling

We ship a [LiveChat Boilerplate](/boilerplate) – it's a lightweight CSS stylesheet to help you lift off with creating the extension interface.

## Example extensions

We've prepared two example repositories for your convenience. Both examples show how to receive data from [Events](#events) and display them within the sidebar. 

<img class="framed" src="../__images/agent-app-sample-extension.png" width="500" />

You can take it from there and use the visitor's email to query your own service or provide contextual help for the agent based on visitor details.

### PHP & Silex

> Set up the environment

```shell
git clone https://github.com/livechat/agent-app-sample-extension.git
cd agent-app-sample-extension
composer install
```

> Configure your local web server to serve content over HTTPS and [turn on the extension](#turn-on-the-extension).

A basic backend application example written with the use of [Silex](http://silex.sensiolabs.org/).

<a class="button green" href="https://github.com/livechat/agent-app-sample-extension" target="_blank"><span>GitHub Repository</span></a>

### Webpack (JS)

> Set up the environment

```shell
git clone https://github.com/livechat/agent-app-sample-extension-webpack.git
cd agent-app-sample-extension-webpack
npm install
```

> Run the webpack server

```
npm start
```

A basic static application example served from [Webpack Server](https://webpack.github.io/).

<a class="button green" href="https://github.com/livechat/agent-app-sample-extension-webpack" target="_blank"><span>GitHub Repository</span></a>

> The content of extension should be available at [https://localhost:3333](https://localhost:3333).

> You can now [turn on the extension](#turn-on-the-extension).

### Core functionality

> Place this tag within `<head></head>` section:

```html
<link rel="stylesheet" href="//cdn.livechatinc.com/boilerplate/1.0.css">
<script src="//cdn.livechatinc.com/boilerplate/1.0.js"></script>
```

If you want to build your own environment, be sure to include both the [LiveChat Boilerplate](/boilerplate) and [JavaScript Extension API](#javascript-api).

### Extension hosting

You can either host your extension locally or on a dedicated server. The hosted content has to be served over **HTTPS Protocol**. You can use a self-signed certificate for `localhost` or upload your extension to an SSL-enabled host. If you go for the [Webpack Example](#webpack) you'll get the setup out of-the-box. 

## Turn on the extension

> Paste following snippet inside the developers console:

```js
App.collections.Integrations.add({
  id: 'sandbox',
  url: 'https://localhost:3333'
})
```

> A green **Sandbox App** button should appear:

> <img src="../__images/agent-app-extension.gif" width="400" />

To activate the extension, login to the [Agent App](https://my.livechatinc.com/) and simply paste this snippet within developers console in your browser of choice. The `id` has to be `sandbox`, but you can go with `url` of your own environment. 

<aside class="notice">Keep in mind that a random URL won't work! For the extension to load completely, the Init method needs to be fired. </aside>

Your extension should be ready to use. In the upper right corner of Agent App appear a button labelled "Sandbox App".
