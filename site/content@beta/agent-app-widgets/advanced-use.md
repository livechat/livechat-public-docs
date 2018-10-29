---
weight: 30
---

# Advanced use

## Developing your own widget

If you want to build your own widget, be sure to include the [JavaScript Widget API](#javascript-widgets-api):

> Our widget SDK package is hosted on NPM. You can get it with following command:

```
npm install --save @livechat/agent-app-widget-sdk
```

After the content of your widget is loaded, fire the `LiveChat.init()` method. It will let the Agent App know when to hide the spinning loader.

> Import the SDK and fire `LiveChat.init()` method

```js
import LiveChat from '@livechat/agent-app-widget-sdk';
// ...
LiveChat.init();
```

## Interacting with Agent App

After a successful initialization, the Agent App should remove the spinner and display the content of your extension. You should now be able to receive events from the Agent App. Check out the [JavaScript API events](#events).

## Accessing LiveChat data

You can leverage OAuth2.0 authorization flow to access data from the [REST API](/beta-docs/rest-api). Head to [Sign in with LiveChat](/beta-docs/sign-in-with-livechat) docs for more information.

## Layout and Styling

To get more information on LiveChat components check [LiveChat Design System] (https://livechat.github.io/design-system/#!/Introduction)

```

## Hosting the widget

You can host your widget locally or on a dedicated server. The hosted content has to be served over **HTTPS Protocol**. 

While development, you can use a self-signed certificate for `localhost` or upload your widget to an SSL-enabled host. You can also leverage bundlers like [Webpack](https://webpack.js.org/configuration/dev-server/) to use https-enabled development server.