---
weight: 30
---

# Getters

You can use getters to fetch the data from the Chat Widget.

Available getters:

- [Get state](#get-state)
- [Get customer data](#get-customer-data)
- [Get chat data](#get-chat-data)

## Get state

Returns the Chat Widget state.
This includes Widget visibility and license availability.

#### Example

`LiveChatWidget.get('state')`

#### Response

| param        | type                                         | description                |
| ------------ | -------------------------------------------- | -------------------------- |
| availability | `'online'` \| `'offline'`                    | Group's availability       |
| visibility   | `'maximized'` \| `'minimized'` \| `'hidden'` | the Chat Widget visibility |

## Get customer data

Returns a filtered list of customer data.

#### Example

`LiveChatWidget.get('customer_data')`

#### Response

| param            | type                                                      | description                              |
| ---------------- | --------------------------------------------------------- | ---------------------------------------- |
| id               | `string`                                                  | unique customer id                       |
| name             | `string`                                                  | customer name, as provided               |
| email            | `string`                                                  | customer e-mail address, as provided     |
| isReturning      | `boolean`                                                 | if this customer visited you before      |
| status           | `'queued'` \| `'chatting'` \| `'browsing'` \| `'invited'` | Customer's status                        |
| sessionVariables | `Record<string, string>`                                  | additional free-form session information |

## Get chat data

Returns chat and thread ids.

#### Example

`LiveChatWidget.get('chat_data')`

#### Response

| param    | type     | description      |
| -------- | -------- | ---------------- |
| chatId   | `string` | unique chat id   |
| threadId | `string` | unique thread id |
