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

#### Response

| param        | type                                   | description              |
| ------------ | -------------------------------------- | ------------------------ |
| availability | 'online' \| 'offline'                  | Group's availability     |
| visibility   | 'maximized' \| 'minimized' \| 'hidden' | Chat widget's visibility |

## get customer data

Returns a filtered list of Customer data.

```js
LiveChatWidget.get('customer_data')
```

#### Response

| param            | type                                              | description                                |
| ---------------- | ------------------------------------------------- | ------------------------------------------ |
| id               | string                                            | unique customer id                         |
| name             | string                                            | customer name, as provided                 |
| email            | string                                            | customer e-mail address, as provided       |
| isReturning      | boolean                                           | has this customer visited you before       |
| status           | 'queued' \| 'chatting' \| 'browsing' \| 'invited' | Customer's status                          |
| sessionVariables | Record<string, string>                            | additional free-form session's information |
