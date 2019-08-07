---
weight: 70
---

# Examples

Here you can find some example usage of Chat Widget JavaScript API. They all require widget to be installed on the page and `window.LiveChatWidget` to be defined.

## Show widget after time

Show chat widget after 30 seconds and keep it open after reload.

```js
LiveChatWidget.on('visibility_changed', function(data) {
  if (data.visibility === 'maximized') {
    localStorage.setItem('livechat_chat_visible', true)
  }
})

var isWidgetVisible = Boolean(localStorage.getItem('livechat_chat_visible'))

if (!isWidgetVisible) {
  setTimeout(function() {
    LiveChatWidget.call('maximize')
  }, 30000)
}
```

## Open widget using button

Show hidden or minimized widget after button has been clicked.
You can change widget visibility as described in our [Help Center](https://www.livechatinc.com/help/chat-widget-visibility/)

```html
<html>
  <body>
    <button id="chat-btn">Chat with us!</button>
    <script>
      var chatButton = document.getElementById('chat-btn')
      chatButton.addEventListener('click', function() {
        LiveChatWidget.call('maximize')
      })
    </script>
  </body>
</html>
```

## Prefill username and email

Set customer name and email using users login and email.

```js
var user = JSON.parse(localStorage.getItem('user'))

LiveChatWidget.call('set_visitor_name', user.login)
LiveChatWidget.call('set_visitor_email', user.email)
```
