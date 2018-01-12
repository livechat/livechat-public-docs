---
weight: 10
---

# Introduction

Welcome to the LiveChat API documentation!

Our API provides a set of flexible tools which you can use to create new outstanding projects. We smile a bit more each time we see skilled developers unleash their creativity!

Please note that this documentation refers to the **latest API version: 2.0**. If you are looking for the previous version, check out the deprecated [API 1.0 documentation](https://www.livechatinc.com/api/v1/).

## Basic API usage

>Sample method call

```shell
curl -u LOGIN:API_KEY -H X-API-Version:VERSION URL
```

All LiveChat API requests start with `https://api.livechatinc.com/`.

<aside class="notice">Please note that all LiveChat API requests must use `HTTPS` protocol.</aside>

The next segment of the URL path depends on the type of your request. For example, use: `https://api.livechatinc.com/agents` to get or modify the agents data.

<aside class="notice">All requests must have `X-API-VERSION` header set to the number of the version that you'd like to use. The most recent version is 2.</aside>


## Authentication

Two common authentication methods are supported: **OAuth 2.0** and **API key**.

### OAuth 2.0

> Example REST API call using OAuth 2.0 `access_token`:

```shell
  curl "https://api.livechatinc.com/agents" \
  -H "Authorization: Bearer <your_access_token>" \
  -H "X-API-Version: 2"
```

OAuth 2.0 authentication is the recommended way of authenticating to LiveChat API.

It is the most secure way of making API calls. With this flow, you will get access only to some parts of LiveChat account, such as reading agents list. This is more secure than [API key flow](#api-key) which has always access to all LiveChat account data.

To start using OAuth 2.0, please read a dedicated [Authorization](/authorization) guide.

### API key

> If your login is **john.doe@mycompany.com**, your API key is **c14b85863755158d7aa5cc4ba17f61cb** and you want to invoke the **agents** API method, your request will look like this:

```shell
  curl "https://api.livechatinc.com/agents" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H "X-API-Version: 2"
```

If you want to build a private app that will run on your own server, you can skip the OAuth 2.0 flow and use the API key. Please note this flow of making API calls is less secure because the API key gives access to all LiveChat account data.

With this authorization method, you will need to include your LiveChat login and `API_KEY` for each method call. You'll find the API key in [your LiveChat profile](https://my.livechatinc.com/agents/api-key).

Authentication to the API occurs via [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Provide your `login` as the basic auth username and the `API_KEY` as the password. You must authenticate for all requests.

All API requests must be made over HTTPS.

## Data format

>Sample agents list returned in the **JSON format**

```json
[
  {
    "name": "John Doe",
    "permission": "owner",
    "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
    "login": "john.doe@mycompany.com",
    "status": "accepting chats"
  },
  ...
]
```

The LiveChat API returns the data in the [JSON](http://en.wikipedia.org/wiki/JSON) format. Check out the following example.

## JSONP

>Sample **JSONP request**

```shell
curl -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb "https://api.livechatinc.com/agents?callback=example"
```

All requests made with HTTP GET are [JSONP](http://en.wikipedia.org/wiki/JSONP)-enabled. To use JSONP, append `callback=` and the name of your callback function to the request.

>Sample **JSONP response**

```json
[
  {
    "name": "John Doe",
    "permission": "owner",
    "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
    "login": "john.doe@mycompany.com",
    "status": "accepting chats"
  },
  ...
]
```


## Error handling

The errors are returned using the standard HTTP error code syntax. In general, the codes in the 2xx range indicate success, the codes in the 4xx range indicate an error (incorrect or missing parameters, not authenticated etc.), and the codes in the 5xx range indicate an error with the LiveChat servers. Any additional info is included in the body of the return call, JSON-formatted.

### HTTP status codes summary

*   `400` – The request is incorrect, please make sure that the passed arguments are matching the format in the method's documentation.
*   `401` – Unauthorized. You attempt to authenticate with an invalid username or API key.
*   `404` – Not Found. You attempt to request a resource which doesn't exist.
*   `500` – Internal Server Error. Something unexpected happened on our end. Please try again or contact our support.

## Cross-domain

All cross-domain API requests made by a web browser are denied for security reasons. It means that the browser-based requests are not allowed from 3rd party domains (including `localhost`).

## LiveChat API libraries

All API calls include an API key that can be easily stolen when making a request using a web browser. It means you should use backend languages for API requests. Here is a list of the ready-to-use libraries:

*   [PHP library for LiveChat API](https://github.com/livechat/api-client-php), hosted on Github.
*   [node.js library for LiveChat API](https://github.com/livechat/api-client-nodejs), hosted on Github.
*   [Ruby library for LiveChat API](https://github.com/cxz/livechat_client), hosted on Github.
*   [C# library for LiveChat API](https://github.com/livechat/api-client-csharp), hosted on Github.

### External LiveChat API libraries

*   [R library for LiveChat API](https://github.com/lawwu/livechatR), hosted on Github.

<aside class="notice">Did you write your own library and want it listed here? Let us know!</aside>