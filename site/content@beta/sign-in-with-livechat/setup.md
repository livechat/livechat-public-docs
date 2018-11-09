---
weight: 20
---

# Setup

## 1. Create new app
Create a new "LiveChat OAuth 2.0 Client" app in <a href="https://developers.livechatinc.com/console/">Developers Console</a>. You will receive a new `client_id` that can be used in the next steps.

Please note that **Redirect URI** field must match the URL of the website that has the "Sign in with LiveChat" button installed. The button will not work with any other URL addresses.


## 2. Include SDK library
SDK is available in two formats: an NPM module and a CDN-hosted library.

### NPM module
```bash
npm install --save @livechat/accounts-sdk
```

```js
import { accountsSdk } from '@livechat/accounts-sdk';
```
If you build an app using Webpack, you can just import the `accountsSdk` module from the NPM.

### CDN-hosted library
```html
<script src="//cdn.livechatinc.com/accounts/accounts-sdk.min.js"></script>
```
If you do not use Webpack, you can still include the library using a `<script>` tag in your HTML. This will create an `AccountsSDK` global object.

---

**Note:** SDK objects from NPM and CDN-hosted libraries have different names:

* NPM module: `accountsSdk`
* CDN-hosted library: `AccountsSDK`

If you use the CDN-hosted version of this SDK, change `accountsSdk` that you see in all examples in this documentation to `AccountsSDK`.

## 3. Prepare button container

> Native "Sign in with LiveChat" button

```html
<div class="livechat-login-button"></div>
```

> Custom "Sign in with LiveChat" button

```js
// javascript
const instance = accountsSdk.init({ ... });
```
```html
<!-- html -->
<a href="" onclick="instance.openPopup()">Sign in with LiveChat</a>
```

Insert HTML code to prepare the container for the "Sign in with LiveChat" button. Its `class` attribute must have value of `livechat-login-button`. The button will be automatically inserted into the container.

If you prefer to design your own button, you can do that, too. Just bind the [`openPopup()`](#instance-openpopup) method of `AccountsSDK` instance to the `onclick` attribute of your link or button.


## 4. Initialize the SDK

```html
<script>
const instance = accountsSdk.init({
  client_id: '<your_client_id>',
  onIdentityFetched: (error, data) => {
    if (data) {
      console.log('User authorized!');
      console.log('License number: ' + data.license);
    }
  }
});
</script>
```

Insert the JavaScript code you can see above **before the closing `</body>` tag**.

That's it!

Your users will see the "Sign in with LiveChat" button if they are not yet logged in or they didn't grant access for your app.

If they are already logged in, you will immediately receive valuable information about your user, such as their `access_token` or `license` number.
