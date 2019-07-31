---
weight: 30
---

# Getters

## get state

Returns the Chat Widget State.
This includes widget visibility and license availability.

Example:

```js
LiveChatWidget.get('state')
```

Returns:

```ts
{
    availability: 'online' | 'offline',
    visibility: 'maximized' | 'minimized' | 'hidden',
}
```

## get customer data

Returns a filtered list of Customer data.

```js
LiveChatWidget.get('customer_data')
```

Returns:

```ts
{
    id: string,		// unique customer id
    name?: string,	// customer name, as provided
    email?: string,	// customer e-mail address, as provided
    isReturning: boolean,	// has this customer visited you before
    status: 'queued' | 'chatting' | 'browsing' | 'invited',
    fields: Record<string, string>, // additional free-form information
}
```
