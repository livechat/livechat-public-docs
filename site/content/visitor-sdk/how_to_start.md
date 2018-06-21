---
weight: 20
---

# How to start

## Install Visitor SDK

You can use Chat Widget Visitor SDK in two different ways:

#### Using npm

`npm install --save @livechat/livechat-visitor-sdk`

Now, you can import SDK in your code:

`import * as LivechatVisitorSDK from "@livechat/livechat-visitor-sdk";`

#### Using script tag - UMD module hosted on unpkg's CDN

`<script src="https://unpkg.com/@livechat/livechat-visitor-sdk@0.35.2/dist/livechat-visitor-sdk.min.js"></script>`

If you just want to look around and play with the SDK, check out our
[sample chat widget implementation](https://glitch.com/#!/project/livechat-sample-chat-widget)

## Use SDK

Now run the init function with configuration, replacing `LICENSE_NUMBER` with
your LiveChat license number. The function will return the visitorSDK interface:

```js
const visitorSDK = LivechatVisitorSDK.init({
  license: LICENSE_NUMBER,
})
```

With `visitorSDK`, you can attach [callbacks](#callbacks) or execute
[methods](#methods).

```js
visitorSDK.on('new_message', newMessage => {
  console.log(newMessage)
})

visitorSDK
  .sendMessage({
    text: 'Hello',
    customId: 123423215,
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```
