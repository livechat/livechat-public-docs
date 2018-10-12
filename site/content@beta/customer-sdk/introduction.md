---
weight: 10
---

# Introduction

LiveChat Customer JS SDK is a set of tools to build a custom chat widget. It allows you to manage multiple chats via LiveChat as a
customer using JavaScript.

## Is it for me?

If you need to customize the LiveChat widget, using LiveChat Customer JS SDK is
one of the options to do this. If you need a fully custom solution and you feel
brave, dive into LiveChat Customer JS SDK: we provide [methods](#methods) and
[events](#events) for deep integration with the LiveChat environment.

Keep in mind, however, that interacting with this API requires **some
development skills**.

## About LiveChat Customer JS SDK

We provide an asynchronous API, where most methods interacting with a server
return **promises**. To get the promise's fulfillment result, subscribe your handler to
the promise's
[`then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
method. You can also subscribe to the emitted events with `on` and `off` methods.

<div class="callout type-info">Not familiar with promises? Read <a href="https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise">this article</a> to learn more.</div>

We authenticate your sessions by using
[customer-auth package](https://www.npmjs.com/package/@livechat/customer-auth)
and expose the created `auth` object on the returned SDK's instance. In general,
you don't have to worry about it nor use the exposed object, but if you need to
get the authentication token you can get it through the SDK like this:

```js
customerSDK.auth.getToken().then(token => console.log(token))
```

## Examples

We have prepared a sample chat widget implementation to present the features of LiveChat Customer JS SDK:

- [Sample widget at CodeSandbox](https://codesandbox.io/s/rm3prxw88n)
