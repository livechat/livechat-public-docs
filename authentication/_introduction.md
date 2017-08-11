# Introduction

Livechat uses [OAuth 2.0](https://oauth.net/2/) protocol for authentication and authorization. LiveChat supports common OAuth 2.0 scenarios such as those for web server and client-side applications.

This guide helps all developers who want to build on top of LiveChat platform understand how to authorize their apps.

## Usage scenarios

### REST API calls

> Example usage of `Authorization` header with OAuth `access_token`:

```
curl https://api.livechatinc.com/v2/agents
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

[LiveChat REST API](/rest-api) uses OAuth 2.0 for user authorization. This means you should always include the `Authorization` HTTP header when using LiveChat REST API calls.

### Sign in with LiveChat

[Sign in with LiveChat](/sign-in-with-livechat) is the easiest way to collect `access_token` from LiveChat user.

## Authorization flow

### Public web apps
Public web apps can be installed by all LiveChat customers.

<img src="../__images/authentication/public-web-app.png" style="border: 1px solid #ddd" />

### Server side apps
When your application needs to access user's data, redirect the user to LiveChat OAuth 2.0 server. This server authenticates and obtains consent for your application to access user's data.

Next, OAuth 2.0 server redirects the user back to your application along with a single-use authorization code. Your application exchanges this authorization code for an `access_token` and `refresh_token`.

<br>
**1. Redirection**

Start with redirecting your user to the following address: `https://accounts.livechatinc.com/`

Required URL parameters:

  * **response_type=code**
  * **client_id** - obtained when creating the app in [Developers Console](/console)
  * **redirect_uri** - the value of this parameter must exactly match one of the values listed in application `redirect_uri` list

Optional URL parameters:

  * **state** - provide any state that might be useful to your application. It is strongly recommended to include an anti-forgery token in the state to mitigate against cross-site request forgery.

If the user approves the access request, then the response contains an authorization code. If the user does not approve the request, OAuth 2.0 server will not redirect user to your application.

<br>
**2. Code response**

`<REDIRECT_URI>?code=<CODE>`

(to be continued...)

<img src="../__images/authentication/public-backend-app.png" style="border: 1px solid #ddd" />

### Private backend apps
Private apps can be used only on accounts chosen by developer.

<img src="../__images/authentication/private-backend-app.png" style="border: 1px solid #ddd" />
