---
weight: 70
---

# Examples

Here you can find some example usage of the Chat Widget JavaScript API. They all require the Widget to be installed on the page and `window.LiveChatWidget` to be defined.

## Show the Widget after time

Show the Chat Widget after 30 seconds and keep it open after reloading.

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

## Open the Widget using button

Show the hidden or minimized Widget after a button has been clicked.
You can change the Widget visibility as described in our [Help Center](https://www.livechatinc.com/help/chat-widget-visibility/)

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

Set the Customers name and email using their login and email.

```js
var user = JSON.parse(localStorage.getItem('user'))

LiveChatWidget.call('set_visitor_name', user.login)
LiveChatWidget.call('set_visitor_email', user.email)
```
