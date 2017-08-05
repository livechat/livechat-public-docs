# Introduction

## "Login with LiveChat" flow

"Login with LiveChat" flow is the easiest way to get access to basic information about LiveChat users. It allows you to quickly build an app that manages different parts of LiveChat account.

<img src="../__images/login-with-livechat-demo.gif" width="600" style="margin-top: 20px; border: 1px solid #ddd;"/>

## Use cases

With "Login with LiveChat" flow, you can easily build an app which:

* has access to LiveChat user's email or license number,
* will receive `access_token` that can be used to make different <a href="/rest-api">REST API</a> calls.

## Setup

### Create new app
Create new "Login with LiveChat" app in <a href="https://developers.livechatinc.com/console/">Developers Console</a>. You will receive a new `client_id` that we will use in the next steps.

### Include SDK library
```html
<script src="//cdn.livechatinc.com/accounts/accounts-sdk.min.js"></script>
```
Create a simple HTML page and include the following library.

### Prepare button container

> Native "Login with LiveChat" button

```html
<div class="livechat-login-button"></div>
```

> Custom "Login with LiveChat" button

```html
<a href="" onclick="AccountsSDK.openPopup()">Sign in with LiveChat</a>
```

Insert HTML code to prepare the container for "Login with LiveChat" button. Its `class` attribute must have value of `livechat-login-button`.

"Login with LiveChat" button will be automatically inserted into the container.

If you prefer to design your own button, you can do that, too. Just bind the `AccountsSDK.openPopup()` method to the `onclick` attribute for your link or button.


### Initialize the SDK

```js
<script>
AccountsSDK.init({
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

Insert the following JavaScript code before the closing `</body>` tag.

That's it!

Your users will see "Sign in with LiveChat" button if they are not yet logged in or they didn't grant access for your app.

If they are already logged in, you will immediately receive valuable information about your user, such as their `access_token` or `license` number.
