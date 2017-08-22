# How to start

## Install Visitor JS API

You can use LiveChat Visitor JS API in two different ways:

1. Using npm

`npm install @livechat/livechat-visitor-api`

Now, you can import API in your code:

```js
import Livechat2VisitorApi from "@livechat/livechat-visitor-api";
```

2. Using `<script>` tag UMD module hosted on unpkg's CDN

`<script src="https://unpkg.com/@livechat/livechat-visitor-api@0.0.13/dist/livechat-visitor-api.min.js"></script>`

If you just want to look around and play with the API, check out our [sample chat widget implementation](https://glitch.com/#!/project/livechat-sample-chat-widget)

## Use API

Now run the init function with configuration, replacing `LICENSE_NUMBER` with your LiveChat license number. The function will return the visitorApi interface:

```js
const visitorApi = init({
    license: LICENSE_NUMBER,
})
```

With `visitorApi`, you can attach [callbacks](#callbacks):

```js
visitorApi.on('new_message', (newMessage) => {
    console.log(newMessage)
})
```

or execute [methods](#methods):

```js
visitorApi.sendMessage({
    text: "Hello",
    customId: 123423215
})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
```
