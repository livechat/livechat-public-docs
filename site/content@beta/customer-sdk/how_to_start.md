---
title: 'How to start'
weight: 20
---

# How to start

This tutorial will help you get started with using LiveChat Customer JS SDK.

## Create an application

First, you need to create an application in the
[Developers Console](https://developers.livechatinc.com/console) (select the _Web app (frontend,
eg. JavaScript)_ type).

## Install Customer JS SDK

You can use LiveChat Customer JS SDK in two different ways:

### Using npm

`npm install --save @livechat/customer-sdk`

Now, you can import SDK in your code:

`import * as CustomerSDK from '@livechat/customer-sdk'`

or with a node-style `require` call:

`const CustomerSDK = require('@livechat/customer-sdk')`

### Using script tag - UMD module hosted on unpkg's CDN

`<script src="https://unpkg.com/@livechat/customer-sdk"></script>`

If you just want to look around and play with the SDK, check out our
[sample chat widget implementation](https://codesandbox.io/s/rm3prxw88n).

<div class="callout type-warning">For the time being you need to register your application in the <a href="https://developers.livechatinc.com/console" target="_blank">Developers Console</a>
as a "Web app (frontend, eg. JavaScript)" type. Then, you have to pass the configured <code>redirectUri</code> to the <code>init</code>, along with the regular required properties (<code>license</code> and <code>clientId</code>).</div>

## Use the API

Now run the `init` function with the configuration, replacing `LICENSE_NUMBER`
with your LiveChat license number. The function will return the customerSDK
instance:

```js
const customerSDK = CustomerSDK.init({
  license: LICENSE_NUMBER,
  clientId: CLIENT_ID,
})
```

With `customerSDK`, you can attach [events](#events):

```js
customerSDK.on('new_event', newEvent => {
  console.log(newEvent)
})
```

or execute [methods](#methods):

```js
const chatId = 'OU0V0P0OWT'
customerSDK
  .sendEvent(chatId, {
    type: 'message',
    text: 'Hi!',
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

### Using the API in React Native

If you want to use LiveChat Customer SDK in React Native, keep in mind that we
use cookies to authenticate your sessions, so we need some sort of browser
environment for that. We've prepared a special wrapper for you to use in React
Native, which opens a WebView component to get an authentication token. All you
have to do is to import it from our authentication package (no need to install
it - the SDK depends on it, so you have it already) and mount it in your React
Native application:

```js
import { AuthWebView } from '@livechat/customer-auth'
import { init } from '@livechat/customer-sdk'

export default class App extends React.Component {
  componentDidMount() {
    const customerSDK = init({
      license: LICENSE_NUMBER,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
    })
    // you can start using customerSDK from now
  }

  render() {
    return (
      <View>
        <AuthWebView />
      </View>
    )
  }
}
```
