# Introduction

Welcome to the LiveChat API documentation! Our API provides flexible tools you can use to create new, outstanding projects. We smile a bit more each time we see creative development by skilled engineers!

Please note that this documentation refers to the **latest API version: 2.0**. If you are looking for the previous version, you might want to check the deprecated [API 1.0 documentation](https://www.livechatinc.com/api/v1/).

## Basic API usage

>Example method call

```shell
curl -u LOGIN:API_KEY -H X-API-Version:VERSION URL
```

All LiveChat API requests start with `https://api.livechatinc.com/`.

{{{ui-copy-input}{Connection endpoint}{https://api.livechatinc.com/}{Copy URL}}}

The next segment of the URI path depends on the type of request. For example: `https://api.livechatinc.com/agents` to get or modify agents data.

<aside class="notice">All requests must have `X-API-VERSION` header set to number of the version that you'd like to use. The most recent version is 2.</aside>


## Authentication

>For example, if your login is **john.doe@mycompany.com**, your API key is **c14b85863755158d7aa5cc4ba17f61cb** and you want to invoke the **agents** API method, your request will look like:

```shell
  curl "https://api.livechatinc.com/agents" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

You must use your login and `API_KEY` for each method call. You'll find it in [your LiveChat profile](https://my.livechatinc.com/agents/api-key).

Authentication to the API occurs via [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Provide your `login` as the basic auth username and the `API_KEY` as the password. You must authenticate for all requests.

All API requests must be made over HTTPS.

## Data format

>Example agents list returned in **JSON format**

```json-doc
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

LiveChat API returns data in [JSON](http://en.wikipedia.org/wiki/JSON) format. See the following example.

## JSONP

>Example **JSONP request**

```shell
curl -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb "https://api.livechatinc.com/agents?callback=example"
```

All requests made with HTTP GET are [JSONP](http://en.wikipedia.org/wiki/JSONP)-enabled. To use JSONP, append `callback=` and the name of your callback function to the request.

>Example **JSONP response**

```json-doc
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

Errors are returned using standard HTTP error code syntax. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error (bad or missing parameters, not authenticated etc.), and codes in the 5xx range indicate an error with LiveChat's servers. Any additional info is included in the body of the return call, JSON-formatted.

### HTTP status codes summary

*   `400` – The request was incorrect, please make sure that passed arguments are matching format in method's documentation.
*   `401` – Unauthorized. You attempt to authenticate with an invalid username or API key.
*   `404` – Not Found. You attempt to request a resource which doesn't exist.
*   `500` – Internal Server Error. Something unexpected happened on our end. Please try again or contact support.

## Cross-domain

All cross-domain API requests made by a web browser are denied for security reasons. It means that browser-based requests are not allowed from 3rd party domains (including `localhost`).

## LiveChat API libraries

All API calls include an API key that could be easily stolen when making a request using a web browser. It means you should use backend languages for API requests. See the list of ready-to-use libraries:

*   [PHP library for LiveChat API](https://github.com/livechat/api-client-php), hosted on Github.
*   [node.js library for LiveChat API](https://github.com/livechat/api-client-nodejs), hosted on Github.
*   [Ruby library for LiveChat API](https://github.com/cxz/livechat_client), hosted on Github.
*   [C# library for LiveChat API](https://github.com/livechat/api-client-csharp), hosted on Github.

### External LiveChat API libraries

*   [R library for LiveChat API](https://github.com/lawwu/livechatR), hosted on Github.

<aside class="notice">Did you write your own library and want it listed here? Let us know!</aside>
