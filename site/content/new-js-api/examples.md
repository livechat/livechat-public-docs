---
weight: 50
---

## Examples

Payload:

```ts
{
    timestamp: number,
    type: 'message' | 'rich_message' | 'file',
    author: {
        id: string,
        type: 'customer' | 'agent',
    },
}
```

### form submitted

```js
const callback = data => {}

LiveChatWidget.on('form_submitted', callback)
LiveChatWidget.off('form_submitted', callback)
```

Payload:

```ts
{
    type: 'prechat' | 'postchat' | 'ticket',
}
```

### rating submitted

```js
const callback = data => {}

LiveChatWidget.on('rating_submitted', callback)
LiveChatWidget.off('rating_submitted', callback)
```

Payload:

```ts
{
  value: 'good' | 'bad' | 'none'
}
```
