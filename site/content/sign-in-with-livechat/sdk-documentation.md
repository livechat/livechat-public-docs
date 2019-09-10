---
weight: 30
---

# SDK documentation

## Methods

### **accountsSdk.init({ ... })**

> Example `init()` method usage

```js
const instance = accountsSdk.init({
  client_id: "<your_client_id>",
  onIdentityFetched: (error, data) => {
    // ...
  }
});
```

This method initiates the SDK and returns the `accountsSdk` object instance. It accepts an object with the following properties:

* **client_id** – obtained from the [Developers Console](https://developers.livechatinc.com/console/) when you create your app.

* **response_type** – (optional, defaults to `token`) Defines the type of the response that you will receive in `onIdentityFetched` callback. Two options are supported:<br><br>**token** (default) – the response will include `access_token` that can be immediately used for calling REST API methods. Best suitable for client-side apps.<br><br>**code** – the response will include `code` that can be exchanged for `access_token` and `refresh_token`. Best suitable for backend apps that authorize a user only once and refresh the `access_token` themselves from that moment.<br><br>Read more about client-side and backend apps in <a href="https://developers.google.com/identity/protocols/OAuth2#webserver">Google OAuth tutorial</a>.

* **onIdentityFetched(error, data)** – the callback executed when user's identity is fetched. The callback will include either `error` or `data` object depending on the current user authorization status.<br>You will find the detailed documentation in <a href="#response-format">Response format</a> section.

* **linkLabel** – (optional, defaults to empty string) allows to change default _Sign in with LiveChat_ label with custom text.

* **popupRoute** – (optional, defaults to empty string) it lets you change the default popup endpoint. Possible values are:<br><br> • `''` (default) – an empty string, which will show the sign-in view.<br><br> • `'signup'` – it will point a user directly to the first step of the signup.

<aside class="notice"><code>accountsSdk</code> object exposes only one method: <code>init()</code>. All other methods must be called by the object instance returned by the <code>init()</code> method.</aside>

### **instance.updateOptions()**

> Example `updateOptions()` method usage:

```js
// javascript
const instance = accountsSdk.init({ ... });
 
 document.getElementById('signup-button').onclick = function() {
   instance.updateOptions({
     popupRoute: 'signup'
   });
   instance.openPopup();
 };
 
 document.getElementById('signin-button').onclick = function() {
   instance.updateOptions({
     popupRoute: ''
   });
   instance.openPopup();
 };
```

```html
<button id="signup-button">Sign up with LiveChat!</button>
<button id="signin-button">Already have an account? Sign in!</button>
```

Allows to update SDK options after calling `init()` method. It accepts an object with same schema as `init()` method.

### **instance.openPopup()**

> Example `openPopup()` method usage:

```js
// javascript
const instance = accountsSdk.init({ ... });
```

```html
<!-- html -->
<a href="" onclick="instance.openPopup()">Sign in with LiveChat</a>
```

Binds `onclick` param for custom HTML `<a>` element that replaces the "Sign in with LiveChat" button. See the example of custom button in <a href="#prepare-button-container">Prepare button container</a> section.

### **instance.signOut(callback)**

> Sample `signOut()` method usage:

```js
// javascript
const instance = accountsSdk.init({ ... });

function signMeOut(e) {
  e.preventDefault();

  instance.signOut(function() {
    console.log('User signed out');
  });
}
```

```html
<a href="" onclick="signMeOut(event)">Sign out</a>
```

It signs the user out and executes the `callback` function (with no arguments) when it's done.

### **instance.displayButtons()**

> Sample `displayButtons()` method usage:

```js
const instance = accountsSdk.init({ ... });

// some DOM changes which cause buttons to disappear from DOM
// (...)

// inject buttons once again
instance.displayButtons();
```

It re-renders the "Sign in with LiveChat" buttons in the DOM. It's helpful when you reload the app's state and the DOM is cleared. This method is automatically executed by the `init` method.

## Response format

`onIdentityFetched` callback is the heart of this SDK. It will be fired when user's authorization status is fetched. This is where you pass authorization `access_token` to your app to build what you need.

### Success

If the user passes through "Sign in with LiveChat" flow, `error` param will be null and `data` param will include authorization data, depending on `response_code` param value.

If `response_code` was set to **access_token**:

* **access_token** – used for authorization in [REST API](/docs/rest-api) calls,
* **scopes** – array of scopes that `access_token` has access to,
* **expires_in** – number of seconds from now that `access_token` will be valid,
* **entity_id** – LiveChat user email,
* **license** – LiveChat license number,
* **client_id** – `client_id` that you passed in the `init` method.

<br>
If `response_code` was set to **code**:

* **code** – must be exchanged to `access_token` and `refresh_token`,
* **scopes** – array of scopes that `access_token` generated by this code will have access to,
* **expires_in** – number of seconds from now that `code` will be valid,
* **entity_id** – LiveChat user email,
* **license** – LiveChat license number,
* **client_id** – `client_id` that you passed in the `init` method.

### Error

If the user is not logged in to LiveChat, `data` param will be `null` and `error` param will include the following properties:

#### Authentication errors

* **identity_exception** – error type. Possible values:<br><br>
  * `invalid_request` – request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once or is otherwise malformed.<br><br>
  * `unauthorized` – request is valid, but identity data is wrong or identity does not exists. If identity id is known, it's added to querystring as `entity_id`.<br><br>
  * `server_error` – server encountered an unexpected condition that prevented it from determining identity.<br><br>
  * `access_denied` – identity is known, but access is denied because of business reasons. For example identity can be banned or has wrong unsupported account version.<br><br>

#### Authorization errors

* **oauth_exception** – error type. Possible values:<br><br>

  * `invalid_request` – request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once or is otherwise malformed. Examples: wrong HTTP method, invalid HTTP body encoding.<br><br>
  * `unauthorized_client` – client is not authorized to request a token using this method. Examples: missing `client_id` param, incorrect `client_id` value, `refresh_token` not found, invalid `client_secret`, invalid `redirect_uri`.<br><br>
  * `access_denied` – resource owner or authorization server denied the request. For example, requested scope includes a scope not originally granted by the resource owner.<br><br>
  * `unsupported_response_type` – authorization server does not support obtaining a token using this method. For example, `response_type` is not `token` or `code`.<br><br>
  * `invalid_scope` – requested scope is invalid, insufficient, unknown or malformed. Examples: scope not found, scope name not found.<br><br>
  * `server_error` – authorization server encountered an unexpected condition that prevented it from fulfilling the request. For example, server is not responding.<br><br>
  * `temporarily_unavailable` – authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.<br><br>
  * `unsupported_grant_type` – authorization grant type is not supported by the authorization server. For example, user is using disabled authorization grant type, such as <a href="https://tools.ietf.org/html/rfc6749#section-4.4">client credentials grant</a>.<br><br>
  * `invalid_grant` – provided authorization grant (authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request or was issued to another client. Examples: refresh token expired, access token expires.<br><br>
  * `invalid_client` client authentication failed (unknown client, no client authentication included, unsupported authentication method). For example, user is using refresh token with wrong `client_id`.<br><br>
  * `missing_grant` – client is missing granted rights. Examples: grants were rejected, grants were never given, client changed required grants.<br><br>

* **exception_details** – error description. It is returned only in some cases. Possible values:<br><br>
  * `client_id_not_found` – wrong `client_id`, `client_id` does not exist.<br><br>
  * `redirect_uri_not_set` – client misconfiguration, client has not set redirect uri.<br><br>
  * `invalid_redirect_uri` – redirect uri is not one of client's allowed redirects.<br><br>
  * `too_many_redirects` – server has detected redirect loop, client should not redirect too many times.
