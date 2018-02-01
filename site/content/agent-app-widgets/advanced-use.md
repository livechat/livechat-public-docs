---
weight: 20
---

# Advanced use

## Sample widgets

We've prepared two example repositories for your convenience. Both examples show how to receive data from [Events](#events) and display them within the sidebar.

<img class="framed" src="../assets/images/agent-app-sample-extension.png" width="500" />

You can take it from there and use the visitor's email to query your own service or provide contextual help for the agent based on visitor details.

### PHP and Silex

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

> The content of the extension should be available at [https://localhost:3333](https://localhost:3333).

> You can now [turn on the extension](#turn-on-the-extension).

## Hosting the widget

You can host your widget locally or on a dedicated server. The hosted content has to be served over **HTTPS Protocol**. You can use a self-signed certificate for `localhost` or upload your widget to an SSL-enabled host. If you go for the [Webpack Example](#webpack-js), you'll get the setup out of-the-box.

## Developing your own widget

If you want to build your own widget, be sure to include both the [LiveChat Boilerplate](/boilerplate) and [JavaScript Widget API](#javascript-api):

> Our widget SDK package is hosted on NPM. You can get it with following command:

```
npm install --save @livechat/agent-app-widget-sdk
```

After your widget content is loaded, fire the `LiveChat.init()` method. It will let the Agent App know when to hide the spinning loader.

> Fire `LiveChat.init()`

```js
import LiveChat from '@livechat/agent-app-widget-sdk';

LiveChat.init();
```

## Layout and Styling

We ship a [LiveChat Boilerplate](/boilerplate) – it's a lightweight CSS stylesheet to help you lift off with creating the widget interface.

> Place this tag within the `<head></head>` section:

```html
<link rel="stylesheet" href="//cdn.livechatinc.com/boilerplate/1.1.css">
```