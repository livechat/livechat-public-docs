---
weight: 50
---

# Moments SDK

Moments SDK is the library to integrate web application used as Moments with Chat Widget. It's not necessary to use Moments SDK inside Moments web applications, but it provides more chat widget integration options - it allows you to send messages as a visitor, set visitor attributes or close Moment.

## Methods

### createMomentsSDK

Default method exported by the library. It's initializing connection with chat widget. You can pass additional properties:

| param | type   | description                                                  |
| ----- | ------ | ------------------------------------------------------------ |
| title | string | Application title, will be placed on Moment's titlebar       |
| icon  | string | URL to Application icon, will be placed on Moments title bar |

### Using npm

To simply get started with creating your Moments App add `@livechat/moments-sdk` as dependency to your project:

```
npm install @livechat/moments-sdk
```

and then import `createMomentsSDK` function which is exported as default from package.

```js
import createMomentsSDK from "@livechat/moments-sdk";
createMomentsSDK({ title: "My App" }).then(momentsSDK => {
  // your code
});
```

### Using script tag

To simply get started with creating your Moments App add to your page, at the bottom of `body` section, `script` tag with `src` atribute set to our moments-sdk.

```html
<script src="https://cdn.livechat-static.com/moments-sdk/moments-sdk-1.0.1.umd.min.js"></script>
```

In your code before `moments-sdk` is loaded assign to window function called `onMomentAsyncInit`. It is used as a hook to let you know when sdk is loaded. You will get `createMomentsSDK` function as an argument of that call. Using UMD build you should reference to `window.MomentsSDK` instead of `momentsSDK` to access methods.

```js
window.onMomentAsyncInit = function(createMomentsSDK) {
  createMomentsSDK({ title: "My App" }).then(() => {
    // your code
  });
};
```

### sendMessage

Sends a message as a visitor in currently active chat.
Parameters:

- text - Message text

```js
momentsSDK.sendMessage({ text: "Chosen date: 19.12.2009" });
```

### setAttributes

Set customer's properties.
Parameters:

- customProperties - customer's additional data object

```js
momentsSDK.setAttributes({ clientId: "SJ3CJ6JVNMK42A", source: "Organic" });
```

### close

Close Moment app.

This method has no parameters.

```js
momentsSDK.close();
```

## How to start

You should start by preparing your first Moment app. You can use one of our examples or use our bootstrap project build on Glitch platform - it’s ready to publish, integrated with Moments SDK and easy to fork and adjust to own needs.

If you want to use simple static page in moment instead of web app you can use `moments-title` parameter in URL to specify the title that should be displayed for your Moment.

#### Example:

`https://example.com?moments-title=MyApp`

To try Moments out, head to the [ChatBot website](https://chatbot.com) to sign up for a 14-day free trial. If you already have an account go to our article on how to integrate ChatBot with Livechat.
Configure story, add bot response “Card”, add the button with “webview” widget and fill in your application URL. Test your story in LiveChat chat widget.

Alternatively you can setup [MessageBox](https://developers.livechatinc.com/docs/agent-app-widgets/#messagebox) integration in Agent App and use your Moment app there.
