---
weight: 30
---

# Notes

## Limitations

There is currently a limit of 25 refresh tokens per client per user. When limit is reached, the oldest token is automaticaly revoked. 

Another limitation is 3 redirects in 30 seconds to Livechat OAuth 2.0 server per client per user. When limit is reached, server redirects to error page with `too_many_redirects` error detail.

## Redirect URI considerations

Client configuration allows adding many redirect URIs. The redirect URIs are separated by comma. Authorization request redirect URI is valid when matches one of the client's configuration URIs.

URI is composed of several parts:

* scheme (`http://`, `https://`) - is required and must match exactly,
* host (`google.pl`, `localhost:3000`, ...) - hostname or ip and optional port, is required and must match exactly,
* path (`/info`, `/test`, ...) - is optional, client redirect URI path must be a substring of authorization request redirect path, path traversals are forbidden,
* query (`?size=20`, ...) - is forbidden,
* fragment (`#paragraph`) - is forbidden.

**Examples:**

| client redirect configuration      | authorization redirect URI            | is valid|
| ---------------------------------- |:--------------------------------------| --------|
| http://livechatinc.com             | http://livechatinc.com                | yes     |
| http://livechatinc.com             | http://livechatinc.com/archives       | yes     |
| http://livechatinc.com             | http://livechatinc.com/archives/../   | no      |
| http://livechatinc.com/archives    | http://livechatinc.com                | no      |
| http://livechatinc.com/archives    | http://livechatinc.com/archives       | yes     |
| http://livechatinc.com/archives    | http://livechatinc.com/archives/chats | yes     |
| http://localhost:3000              | http://localhost:3000                 | yes     |
| http://127.0.0.1:3000              | http://127.0.0.1:3000                 | yes     |
| http://localhost:3000              | http://localhost:4000                 | no      |
| https://livechatinc.com            | http://livechatinc.com                | no      |
| http://livechatinc.com             | https://livechatinc.com               | no      |


## Common questions

### What is app at LiveChat?

_– From business perspective_

The primary goal of an app is to abstract certain functionality in an installable package, which can be published and distributed at the [Apps Marketplace](https://my.livechatinc.com/settings/apps/). App can also remain private and available only for the license it was created on.

An app is anything that LiveChat is able to interpret. It could be an integration with a 3rd party service, a custom plugin to display additional visitor details or a chat widget theme. We constantly work to introduce new types of apps and ways of integrating with LiveChat.

<br>
_– From developers perspective_

Technically speaking, every app is an OAuth2.0 Client and a set of additional attributes (you can think of it as a JSON file). These attributes define the type and meta details of the app. Every app instance (installation) is associated with dedicated authorization entities.

### Who can create and manage apps?

Currently, only **owner** and **administrators** can create and manage apps. If you have an agent account willing to create and manage apps, please contact your license administrator or owner.