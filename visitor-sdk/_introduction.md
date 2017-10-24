# Introduction - test change again and again4

LiveChat Visitor JS SDK allows you to perform a chat via LiveChat as a visitor using JavaScript. 

You can use this to create your own chat widget.

## Is it for me?

If you need to customize the LiveChat widget, using LiveChat Visitor JS SDK is one of the options to do this.

Keep in mind, however, that interacting with this API requires **significant development skills**. 

* If you only want to modify the look and feel of the chat window, check if you can do this with [custom CSS](https://www.livechatinc.com/kb/customize-your-chat-window-with-css/).

* If you want to integrate the chat widget with your application, you can use the the existing [JS API](https://docs.livechatinc.com/js-api/).

However, if you  need a fully custom solution and you feel brave, dive into LiveChat Visitor JS SDK: we provide [methods](#methods) and [callbacks](#callbacks) for deep integration with the LiveChat environment.

## About LiveChat Visitor JS SDK

LiveChat Visitor JS SDK is promise-based; all asynchronous methods return a promise. To get a promise fulfillment result, subscribe your handler to the promise's `then` method. Check out [this article](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise) to learn more about promises.

**Important!** Some methods and callbacks are not implemented yet. 

## Examples

- [A sample chat widget implementation](https://glitch.com/#!/project/livechat-sample-chat-widget)
- [A sample iOS React Native implementation](https://github.com/livechat/chat-window-react-native-example)
