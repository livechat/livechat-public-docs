# Notes

## Limitations

There is currently a limit of 25 refresh tokens per client per user. When limit is reached, the oldest token is automaticaly revoked (with rabbitmq publishing). 

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