# Introduction

## User flow

"Sign in with LiveChat" flow is the easiest way to get access to basic information about LiveChat users. It allows you to quickly build an app that can access different parts of LiveChat account.

User starts the flow by clicking the following button:

<img src="../__images/sign-in-with-livechat/flow-1.png" width="400" style="margin-top: 20px; border: 1px solid #ddd;"/>

If user is not signed in to LiveChat, he is asked to sign in:

<img src="../__images/sign-in-with-livechat/flow-2.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Then, user must allow the app to access some parts of his account:

<img src="../__images/sign-in-with-livechat/flow-3.png" width="690" style="margin-top: 20px; border: 1px solid #ddd;"/>

Finally, the app receives `access_token` that lets it perform REST API calls, limited to what the user agreed on. For example, you can display LiveChat tracking code which already includes user's account number:

<img src="../__images/sign-in-with-livechat/flow-4.png" width="490" style="margin-top: 20px; border: 1px solid #ddd;"/>

## Use cases

With "Sign in with LiveChat" flow, you can easily build an app which:

* has access to LiveChat user's email or license number,
* will receive `access_token` that can be used to make different <a href="/rest-api">REST API</a> calls.

## Setup

### Create new app
Create new "Sign in with LiveChat" app in <a href="https://developers.livechatinc.com/console/">Developers Console</a>. You will receive a new `client_id` that we will use in the next steps.

### Include SDK library
```html
<script src="//cdn.livechatinc.com/accounts/accounts-sdk.min.js"></script>
```
Create a simple HTML page and include the following library.

### Prepare button container

> Native "Sign in with LiveChat" button

```html
<div class="livechat-login-button"></div>
```

> Custom "Sign in with LiveChat" button

```html
<a href="" onclick="AccountsSDK.openPopup()">Sign in with LiveChat</a>
```

Insert HTML code to prepare the container for "Sign in with LiveChat" button. Its `class` attribute must have value of `livechat-login-button`. The button will be automatically inserted into the container.

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
