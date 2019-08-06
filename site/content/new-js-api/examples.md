---
weight: 70
---

## Examples

### Show chat widget after 30 seconds and keep it open after reload

```js
var isVisible = localStorage.getItem('livechat_chat_visible')

if (!isVisible) {
  LiveChatWidget.call('hide')
  setTimeout(function() {
    localStorage.setItem('livechat_chat_visible', true)
    LiveChatWidget.call('show')
  }, 30000)
}
```

### Hide chat window and open it with a button

You should start by chaging your LiveChat Widget visibility [as described in our Help Center](https://www.livechatinc.com/help/chat-widget-visibility/)

```js
// this assumes you have a clickable element on your site with the correct id
var liveChatButton = document.getElementById('livechat_button')

liveChatButton.addEventListener('click', function(event) {
  event.preventDefault()
  LiveChatWidget.call('show')
})
```
