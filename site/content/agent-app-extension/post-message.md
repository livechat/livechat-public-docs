---
weight: 30
---

# Pairing the extension with Agent App

Let's say you want to create an extension which shows additonal customer details. You need to know which chat is currently displayed within the Agent App.

We send a [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) event every time a chat with a visitor is displayed. You can use this information to provide additonal details on certain customer.

## Example script

```js
window.addEventListener('message', function (event) {
    if (event.data.event_name === 'customer_profile') {
        console.log(event.data);
    }
}, false);
```

## Example data payload

```json
{
    "event_name": "customer_profile",
    "event_data": {
        "id": "",
        "name": "Coleslaw Chat",
        "email": "coleslaw@chat.livechatinc.com",
        "chat": {
            "id": "IL0V3B00ZE"
        },
        "source": "chats"
    }
}
```