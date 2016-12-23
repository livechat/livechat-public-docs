# Introduction

Use the chat window API to manipulate the chat widget displayed on your website. Some popular use–cases are:

*   maximizing the chat window after a given time,
*   hiding the window during the weekends.

You can also get some basic visitor’s statistics. For instance, chat window API will tell you how many chats the visitor had in the past.

## Support for AJAX–based and Flash-based websites

LiveChat has a built–in support for AJAX-based and Flash-based websites that do not physically refresh the browser. Just make sure that the address bar in the browser changes (using the anchor element in the URL: `#somepage` – you can use the [swfaddress](http://www.asual.com/swfaddress/) library to do so). LiveChat will display it just as a normal page refresh.

## Support for the JavaScript API in chat window installed in native mobile apps

When you install the chat window in a [native mobile app](https://developers.livechatinc.com/mobile/), you can still interact with the JavaScript API using `LC_API` object.

## Using chat window API

```js
var LC_API = LC_API || {};
LC_API.on_after_load = function() {
  // your code here
};
```

Use the `LC_API` global variable to invoke any API method. Use the `on_after_load` callback to make sure `LC_API` is already loaded.