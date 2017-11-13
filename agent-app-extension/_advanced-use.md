# Advanced use

## Sample extensions

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

> The content of the extension should be available at [https://localhost:3333](https://localhost:3333).

> You can now [turn on the extension](#turn-on-the-extension).

## Hosting the extension

You can host your extension locally or on a dedicated server. The hosted content has to be served over **HTTPS Protocol**. You can use a self-signed certificate for `localhost` or upload your extension to an SSL-enabled host. If you go for the [Webpack Example](#webpack-js), you'll get the setup out of-the-box.

## Developing your own extension

If you want to build your own extension, be sure to include both the [LiveChat Boilerplate](/boilerplate) and [JavaScript Extension API](#javascript-api):

> Place this tag within the `<head></head>` section:

```html
<link rel="stylesheet" href="//cdn.livechatinc.com/boilerplate/1.1.css">
<script src="//cdn.livechatinc.com/boilerplate/1.1.js"></script>
```

After your extension content is loaded, fire the `LiveChat.init()` method. It will let the Agent App know when to hide the spinning loader.

> Fire `LiveChat.init()` method after body is loaded (e.g. using jQuery):

```js
// If you authorize using "Basic authorization flow":
$(document).ready(function () {
    LiveChat.init();
});

// If you authorize using "Sign in with LiveChat":
$(document).ready(function () {
    LiveChat.init({
      authorize: false
    });
});
```

## Layout & Styling

We ship a [LiveChat Boilerplate](/boilerplate) – it's a lightweight CSS stylesheet to help you lift off with creating the extension interface.
