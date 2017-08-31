# Introduction

LiveChat requires all developers building on top of our platform to use [OAuth 2.0](https://oauth.net/2/) protocol for authentication and authorization.

However, there is no one-and-only way of building an app. LiveChat platform supports different authorization flows for different ways of building apps.

> `Authorization` header example in LiveChat REST API call:

```shell
curl "https://api.livechatinc.com/agents" \
  -H "X-API-Version: 2" \
  -H "Authorization: Bearer <access_token>"
```

<br>
The most popular tool used by developers is [REST API](/rest-api). Calling API methods on behalf of LiveChat user is as simple as including `Authorization: Bearer <access_token>` HTTP header in each call.

You will learn how to acquire the `access_token` in the sections below.

# Authorization flows
All apps integrated with LiveChat must be first created in [LiveChat Developers Console](https://developers.livechatinc.com/console). When a user starts using your app, they will see what parts of his account your app will have access to:

<img src="../__images/authorization/grant-access.png" style="border: 1px solid #ddd" />

When a user allows the access, your app will receive an `access_token` that will let you access their account.

There are a few scenarios in which you can acquire an `access_token`:

* [Sign in with LiveChat](#sign-in-with-livechat) – the easiest way to get access to any LiveChat account.
* [Public web apps](#public-web-apps) – JavaScript apps available to all LiveChat customers.
* [Private web apps](#private-web-apps) – JavaScript apps available to agents from single LiveChat account.
* [Public server-side apps (coming soon)](#public-server-side-apps) – backend apps available to all LiveChat customers.
* [Private server-side apps (coming soon)](#private-server-side-apps) – backend apps installed on a single LiveChat account.

## Sign in with LiveChat
"Sign in with LiveChat" button is the easiest way to collect `access_token` from a LiveChat user.

<img src="../__images/authorization/sign-in-with-livechat.png" style="border: 1px solid #ddd" />

In this scenario, LiveChat user enters your website with a "Sign in with LiveChat" button installed. After clicking the button, they enter LiveChat login and password in a pop-up window and grant access to some parts of their account.

In return, you acquire an `access_token` which can be used to call [REST API](/rest-api) methods.

Read more how to implement this flow in a dedicated ["Sign in with LiveChat"](/sign-in-with-livechat) article.

## Public web apps

Public web apps are JavaScript applications that can access any LiveChat customer account. Examples of public web apps are [LiveChat's Agent App](https://my.livechatinc.com/) and [Developers Console](https://developers.livechatinc.com/console).

To set up your own public app, you must define the URL of the app and the list of scopes – parts of LiveChat account your app will have access to. LiveChat customer who enters your app URL is be asked to enter their login and password and grant access for your app.

Then, the user is redirected to your app with `access_token` included in the URL.

<img src="../__images/authorization/public-web-app.png" style="border: 1px solid #ddd" />

### 1. Create the app
Go to [Developers Console](https://developers.livechatinc.com/console) to create a new public web app. **Redirect URI** is the address of your app that will receive `access_token` in a URL. **Scopes** is a list of permissions your app will get.

### 2. Redirect to LiveChat OAuth Server

> Example redirection to LiveChat OAuth Server:

```
https://accounts.livechatinc.com/
  ?response_type=token
  &client_id=2261a58dfe1420acc0dc1bd77158f7ac
  &redirect_uri=https%3A%2F%2Fmy-application.com
  &state=i8XNjC4b8KVok4uw5RftR38Wgp2BFwql
```

When a user runs your app, you should redirect their browser to the following URL:

`https://accounts.livechatinc.com/`

with the following URL params:

* **response_type=token**
* **client_id** – you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **redirect_uri** – URL of your web application that LiveChat OAuth Server will redirect the user back after successful authorization. It must be one of the URLs that you entered when creating the app in the previous step.
* **state** – you can provide here any value that might be useful to your application. It is strongly recommended to include an anti-forgery token here mitigate the [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

### 3. Acquire the access token

> Example redirection back to your app:

```
https://my-application.com/
  #access_token=1/fFBGRNJru1FQd44AzqT3Zg
  &token_type=Bearer
  &expires_in=1209600
  &state=i8XNjC4b8KVok4uw5RftR38Wgp2BFwql
```

After successful authorization, the user is redirected back to your app. The URL will include a number of params in the hash section of the URL:

* **access_token** – token you can use to call [REST API](/rest-api) methods on behalf of the user.
* **expires_in** – number of seconds the `access_token` will be valid. When it expires, you will need to repeat the authorization process to get the new `access_token`.
* **state** – value of the `state` param that you passed in redirection to LiveChat OAuth Server.
* **token_type=Bearer**

Your application should remember `access_token` in localStorage or a cookie until it expires. Caching the token prevents you from redirecting the user to LiveChat OAuth Server every time he visits your app.

## Private web apps

Private web apps are JavaScript applications that are available only to agents from a single LiveChat account. If you want to build an internal app for your chat agents only, this is a good way to go.

Private web apps work the very same way like [public web apps](#public-web-apps). Please refer to that documentation to understand how it works.

To start building a private web app, set it up [LiveChat Developers Console](https://developers.livechatinc.com/console).

## Public server-side apps (coming soon)
Public server-side apps are applications that have access to user's data for unlimited time.

When your application wants to acquire the `access_token`, you must redirect the user to LiveChat OAuth Server only once. After successful authorization, the user is redirected back to your app along with a single-use authorization code.

Your application exchanges the authorization code for an `access_token` and `refresh_token`. From now now, you can generate new `access_tokens` indefinitely without any action required from the user.

<img src="../__images/authorization/public-backend-app.png" style="border: 1px solid #ddd" />

### 1. Create the app
Go to [Developers Console](https://developers.livechatinc.com/console) to create a new public server-side app. **Redirect URI** is the address of your app that will receive authorization `code` in a URL. **Scopes** is a list of permissions your app will get.

### 2. Redirect o LiveChat OAuth Server

> Example redirection to LiveChat OAuth Server:

```
https://accounts.livechatinc.com/
  ?response_type=code
  &client_id=86pp8cqeg2ac5fimbs8gibluu16ugyvs
  &redirect_uri=https%3A%2F%2Fmy-application.com
  &state=f3NtEuZ5AuxsmnVAzcyLGm17aAaltJTv
```

Start with redirecting your user to the following address: `https://accounts.livechatinc.com/`

Required URL parameters:

* **response_type=code**
* **client_id** – you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **redirect_uri** – URL of your web application that LiveChat OAuth Server will redirect the user back after successful authorization. It must be one of the URLs that you entered when creating the app in the previous step.

Optional URL parameters:

* **state** – provide any state that might be useful to your application. It will be included in the redirection to `redirect_uri` endpoint.<br>It is strongly recommended to include an anti-forgery token in the state to mitigate the [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

### 3. Acquire the code

> Example redirection back to your app:

```
https://my-application.com/
  ?code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7
  &state=f3NtEuZ5AuxsmnVAzcyLGm17aAaltJTv
```

When the user approves the access request, they are redirected back to your app. The URL will include `code` param which should be used to acquire `access_token` and `refresh_token`.

If the user does not approve the request, LiveChat OAuth Server will not redirect user to your application.

### 4. Exchange code for access token and refresh token

> Example request:

```shell
curl "https://accounts.livechatinc.com/token" \
  -X POST \
  -d "grant_type=authorization_code&\
  code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&\
  client_id=86pp8cqeg2ac5fimbs8gibluu16ugyvs&\
  client_secret=nBdMN8d7MEp1YYo3&\
  redirect_uri=https://my-application.com"
```

To exchange the `code` for an `access_token` and `refresh_token`, you should perform an HTTP POST request to the following URL:

`https://accounts.livechatinc.com/token`

Required parameters:

* **grant_type=authorization_code**
* **code** – the authorization code returned from the initial request.
* **client_id** – you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **client_secret** - you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **redirect_uri** – URL of your web application that LiveChat OAuth Server will redirect the user back after successful authorization. It must be one of the URLs that you entered when creating the app in the previous step.

> Example response:

```json
{
  "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
  "refresh_token": "-/khgiugfalskdbcakg2347o8326",
  "expires_in": 3920,
  "token_type": "Bearer"
}
```

<br>
The response will include the following params in JSON format:

* **access_token** – token you can use to call [REST API](/rest-api) methods on behalf of the user.
* **expires_in** – number of seconds the `access_token` will be valid. When it expires, you will need to generate new `access_token` using `refresh_token` (read [Using the refresh token](#using-the-refresh-token) for more details).
* **refresh_token** – token that can be used to generate new access tokens.
* **token_type=Bearer**

### Using the refresh token

> Example request:

```shell
curl "https://accounts.livechatinc.com/token" \
  -X POST \
  -d "grant_type=refresh_token&\
  refresh_token=-/khgiugfalskdbcakg2347o8326&\
  client_id=86pp8cqeg2ac5fimbs8gibluu16ugyvs&\
  client_secret=nBdMN8d7MEp1YYo3"
```

To obtain a new `access_token`, your application must send an HTTP POST request to the following endpoint:

`https://accounts.livechatinc.com/token`

Required parameters:

* **grant_type=refresh_token**
* **refresh_token** – value of refresh token you received in the previous step.
* **client_id** – you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **client_secret** - you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).

> Example response:

```json
{
  "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
  "refresh_token": "-/khgiugfalskdbcakg2347o8326",
  "expires_in": 3920,
  "token_type": "Bearer"
}
```

<br>
The response will include the following params in JSON format:

* **access_token** – token you can use to call [REST API](/rest-api) methods on behalf of the user.
* **expires_in** – number of seconds the `access_token` will be valid. When it expires, you will need to generate new `access_token` using `refresh_token` (read [Using the refresh token](#using-the-refresh-token) for more details).
* **refresh_token** – token that can be used to generate new access tokens.
* **token_type=Bearer**

### Revoking tokens

> Revoking a token:

```shell
curl "https://accounts.livechatinc.com/token\
  ?token=<access_token|refresh_token>"
  -X DELETE
```

In some cases a user may wish to revoke access given to an application. The token can be an access token or a refresh token. If the token is an access token and it has a corresponding refresh token, the refresh token will also be revoked.

### Validating the access token

> Validating the `access_token`:

```shell
curl "https://accounts.livechatinc.com/info"
  -H "Authorization: Bearer <access_token>"
```

You can validate an `access_token` by making an HTTP request to the following endpoint:

`https://accounts.livechatinc.com/info`

Please note that refresh tokens are not supported for direct validation. If `access_token` was obtained with with the use of a `refresh_token`, response will return both tokens.

> Example response:

```json
{
  "access_token": "hgDBq88bSw-UHBXnm1Q_Bw",
  "expires_in": 3564,
  "refresh_token": "wB_Q1mnXBHU-wSb88qBDgh", // optional
  "client_id": "14c26ac43f2123dcf8a76ff58b319930",
  "scope": "email,manage_accounts",
  "token_type": "Bearer",
  "entity_id": "name@domain.com",
  "license_id": 1520
}
```

<br>
The response will include the following params in JSON format:

* **access_token** – token you can use to call [REST API](/rest-api) methods on behalf of the user.
* **expires_in** – number of seconds the `access_token` will be valid. When it expires, you will need to generate new `access_token` using `refresh_token` (read [Using the refresh token](#using-the-refresh-token) for more details).
* **refresh_token** – token that can be used to generate new access tokens.
* **client_id** – you received it when you created the app in [Developers Console](https://developers.livechatinc.com/console).
* **scope** – comma-separated list of permissions that `access_token` has access to.
* **token_type=Bearer**
* **entity_id** – LiveChat's user login.
* **license_id** – LiveChat's user account number.

## Private server-side apps (coming soon)
Private apps can be used only on accounts chosen by the developer.

<img src="../__images/authorization/private-backend-app.png" style="border: 1px solid #ddd" />

This authorization flow is not yet available.
