---
weight: 50
---

# Troubleshooting

## There are errors in the console

Check out your browser's console to see if there are any of the errors listed below.

| Error | Explanation |
| ---- | ---- |
| `Mixed Content: The page at 'https://my.livechatinc.com/' was loaded over HTTPS, but requested an insecure resource '...'. This request has been blocked; the content must be served over HTTPS.` | For security reasons the Agent App is served over HTTPS and so must be the extension. Learn more on why we need SSL-enabled address in MDN article about [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). |
|`Refused to display '...' in a frame because an ancestor violates the following Content Security Policy directive: "...".` | The host that serves the plugin has specific [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) set up. |
|`Refused to display '...' in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'.` | The host serving the content of the plugin has specific [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) header set up. |

## The loader never stops spinning

Make sure you followed the initiallization flow mentioned in [Developing your own extension](#developing-your-own-extension). If the `LiveChat.init()` method is fired correctly, the spinner disappears and the extension becomes visible.