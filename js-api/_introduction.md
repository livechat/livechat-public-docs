# Introduction

The chat window API allows you to manipulate the chat widget displayed on your website. Some common use–cases are:

* maximizing the chat window after a given time,
* hiding the window during the weekends.

You can also get some basic visitor’s statistics. For instance, the chat window API will tell you how many chats the visitor had in the past.

## Support for the JavaScript API in chat window installed in native mobile apps

When you install the chat window in a [native mobile app](https://docs.livechatinc.com/#mobile-widgets), you can still interact with the JavaScript API using the `LC_API` object.

## Support for React-based single-page apps

LiveChat has a dedicated module to integrate with React-based single-page apps.
There is special component that makes the integration very easy.
All you have to do is to import the LiveChat component and put it in your render method:

```javascript
import LiveChat from 'react-livechat'
...

<LiveChat license={your_license_id} />
```

You can find full description [here](https://github.com/livechat/react-livechat).

## Using chat window API

```js
var LC_API = LC_API || {};
LC_API.on_after_load = function() {
  // your code here
};
```

Use the `LC_API` global variable to execute any API method. Use the `on_after_load` callback to make sure `LC_API` is already loaded.

## Support for AJAX–based and Flash-based websites

LiveChat has a built–in support for AJAX-based and Flash-based websites that do not physically refresh the browser. Just make sure that the address bar in the browser changes (using the anchor element in the URL: `#somepage` – you can use the [swfaddress](http://www.asual.com/swfaddress/) library to do so). LiveChat will display it just as a normal page refresh.
