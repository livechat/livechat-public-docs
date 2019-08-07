---
weight: 30
---

# Getters

You can use the getters to fetch the data from Chat Widget.

Available getters:

- [Get state](#get-state)
- [Get customer data](#get-customer-data)

## Get state

Returns the Chat Widget State.
This includes widget visibility and license availability.

#### Example

`LiveChatWidget.get('state')`

#### Response

| param        | type                                         | description              |
| ------------ | -------------------------------------------- | ------------------------ |
| availability | `'online'` \| `'offline'`                    | Group's availability     |
| visibility   | `'maximized'` \| `'minimized'` \| `'hidden'` | Chat widget's visibility |

## Get customer data

Returns a filtered list of Customer data.

#### Example

`LiveChatWidget.get('customer_data')`

#### Response

| param            | type                                                      | description                                |
| ---------------- | --------------------------------------------------------- | ------------------------------------------ |
| id               | `string`                                                  | unique customer id                         |
| name             | `string`                                                  | customer name, as provided                 |
| email            | `string`                                                  | customer e-mail address, as provided       |
| isReturning      | `boolean`                                                 | has this customer visited you before       |
| status           | `'queued'` \| `'chatting'` \| `'browsing'` \| `'invited'` | Customer's status                          |
| sessionVariables | `Record<string, string>`                                  | additional free-form session's information |
