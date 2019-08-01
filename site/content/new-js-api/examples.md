---
weight: 70
---

## Examples

#### Show chat widget after 30 seconds and keep it open after reload

```js
var isVisible = Cookies.get('livechat_chat_visible')
if (!isVisible) {
  LiveChatWidget.call('hide')
  setTimeout(() => {
    Cookies.set('livechat_chat_visible', 'true')
    LiveChatWidget.call('show')
  }, 30000)
}
```
