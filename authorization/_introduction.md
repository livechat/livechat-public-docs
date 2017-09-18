# Introduction

LiveChat requires all developers building on top of our platform to use [OAuth 2.0](https://oauth.net/2/) protocol for authentication and authorization.

However, there is no one-and-only way of building an app. LiveChat platform supports different authorization flows for different ways of building apps.

> `Authorization` header example in LiveChat REST API call:

```shell
curl "https://api.livechatinc.com/agents" \
  -H "Authorization: Bearer <access_token>" \
  -H "X-API-Version: 2"
```

<br>
The most popular tool used by developers is [REST API](/rest-api). Calling API methods on behalf of LiveChat user is as simple as including `Authorization: Bearer <access_token>` HTTP header in each call.

You will learn how to acquire the `access_token` in the sections below.
