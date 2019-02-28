---
weight: 50
---

# Moments SDK

Moments SDK is the library to integrate web application used as Moments with Chat Widget. It's not necessary to use Moments SDK inside Moments web applications, but it provides more chat widget integration options - it allows you to send messages as a visitor, set visitor attributes or close Moment.

## Methods

### Getting Started

To simply get started with creating your moments app add `@livechat/moments-sdk` as dependency to your project:

```
npm install @livechat/moments-sdk
```

and then import `createMomentsSDK` function which is exported as default from package.

```js
import createMomentsSDK from "@livechat/moments-sdk";
```

### createMomentsSDK

Default method exported by the library. It's initializing connection with chat widget. You can pass additional properties:

- title: Application title, will be placed on Moment's titlebar
- icon: URL to Application icon, will be placed on Moments title bar

```js
import createMomentsSDK from "@livechat/moments-sdk";
createMomentsSDK({ title: "My App" }).then(momentsSDK => {
  // your code
});
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
To try Moments out, head to the [ChatBot website](https://chatbot.com) to sign up for a 14-day free trial. If you already have an account go to our article on how to integrate ChatBot with Livechat.
Configure story, add bot response “Card”, add the button with “webview” widget and fill in your application URL. Test your story in LiveChat chat widget.
