# Methods - test

## init

Initializes the chat window.

```js
import LivechatVisitorSDK from "@livechat/livechat-visitor-sdk";

const visitorSDK = LivechatVisitorSDK.init({
    license: 123,
    group: 0,
})
```

#### Parameters:

| param   | type   | description              |
| ------- | ------ | ------------------------ |
| license | number | LiveChat license number  |
| group   | number | Group number (default: 0) |

## sendMessage

Sends a message.

```js
visitorSDK.sendMessage({
    text: "Hello",
    customId: "123423215"
})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
```

#### Parameters:

| param    | type   | description          |
| -------- | ------ | -------------------- |
| text     | string | Visitor message text |
| customId | string | Message custom id    |

#### Errors:

| type             | reason                               |
| ---------------- | ------------------------------------ |
| connection       | "Request failed"                     |
| missing argument | "Missing text or customId parameter" |

## closeChat

Closes the chat.

```js
visitorSDK.closeChat()
    .then(() => {
        console.log("Chat is closed")
    })
    .catch((error) => {
        console.log(error)
    })
```

This method has no parameters.

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors: 

| type               | reason                    |
| ------------------ | ------------------------- |
| "state"            | There is no chat to close |
| "connection"       | Request failed            |


## sendFile - not implemented yet

Enables [file sharing](https://www.livechatinc.com/features/chat-tools/#File-sharing) through the chat window.

```js
visitorSDK.sendFile({
    file: FileObject,
    customId: "123423215"
})
    .then((response) => {
        console.log(response.status)
    })
    .catch((error) => {
        console.log(error)
    })
```

#### Parameters:

| param      | type   | description    |
| ---------- | ------ | -------------- |
| file       | file   | File to upload |
| customId   | string | custom file id |


## rateChat

Enables [chat ratings](https://www.livechatinc.com/features/getting-feedback/#Chat-ratings).

```js
visitorSDK.rateChat({
    rate: "good",
    comment: "Agent helped me a lot!"
})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
```

#### Parameters:

| param   | type                      | description                  |
| ------- | ------------------------- | ---------------------------- |
| rate    | "good" \| "bad" \| "none" | Rate type                    |
| comment | string                    | Rate comment text (optional) |

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors: 

| type               | reason                                                |
| ------------------ | ----------------------------------------------------- |
| "missing argument" | Missing rate parameter                                |
| "wrong argument"   | Rate argument should be equal "good", "bad" or "none" |
| "connection"       | Request failed                                        |
| "connection"       | Rate Comment request failed                           |

## markMessageAsSeen - not implemented yet

Marks a message as Seen.

Learn more about LiveChat delivery statuses [here](https://www.livechatinc.com/features/chat-tools/#Delivery-status).

```js
visitorSDK.markMessageAsSeen({
    messageId: "123123123",
})
```

#### Parameters:

| param     | type   | description                        |
| --------- | ------ | ---------------------------------- |
| messageId | string | Id of message to be marked as seen |



## setSneakPeek

Enables [sneak peeks](https://www.livechatinc.com/features/chat-tools/#Message-sneak-peak) to see what the visitor is typing in before they actually send the message.

```js
visitorSDK.setSneakPeek({
    text: "Hello, I woul",
})
```

#### Parameters:

| param   | type   | description                |
| ------- | ------ | -------------------------- |
| message | string | Current message input text |

**Note:** Sneak peek won't be sent every time you call a function. It will be throttled (i.e. sent not earlier than 300ms after the last sneak peek request).


## forwardChatTranscript

Sends [chat transcripts](https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features) to the specified email address when the chat is ended.

```js
visitorSDK.forwardChatTranscript({
    email: "test@livechatinc.com",
})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
```

#### Parameters:

| param | type   | description                                                                |
| ----- | ------ | -------------------------------------------------------------------------- |
| email | string | Email that will automatically receive a transcript when a chat is finished |

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors: 

| type               | reason                                 |
| ------------------ | -------------------------------------- |
| "state"            | There is no chat to forward transcript |
| "missing argument" | Missing email parameter                |
| "connection"       | Request failed                         |

## sendPrechatForm - not implemented yet

Collects the pre-chat form information (it will be visible during the chat and in the archives).

```js
visitorSDK.sendPrechatForm(form)
```

## sendPostchatForm - not implemented yet

Collects the [post-chat form](https://www.livechatinc.com/features/getting-feedback/#Post-chat-surveys) information (it will be visible in the archives).

```js
visitorSDK.sendPostchatForm(form)
```


## getVisitorData

Collects the [visitor information](https://www.livechatinc.com/features/chat-tools/#Visitor-information).

```js

const visitorData = visitorSDK.getVisitorData()
    .then((visitorData) => {
        console.log(visitorData)
    })
```

#### Returned value: 

| param            | type   | description                                                               |
| ---------------- | ------ | ------------------------------------------------------------------------- |
| name             | string | Visitor's name                                                            |
| email            | string | Visitor's email address                                                   |
| pageUrl          | string | Visitor's currently visiting website URL                                  |
| pageTitle        | string | Visitor's currently visiting website title                                |
| customProperties | object | Visitor's additional data object (custom properties) |

## setVisitorData

Set the [visitor information](https://www.livechatinc.com/features/chat-tools/#Visitor-information).

```js
visitorSDK.setVisitorData({
    name: "Wynton Marsalis",
    email: "test@livechatinc.com",
    pageUrl: 'http://example.org/pricing',
    pageTitle: 'Pricing',
    customProperties: {
        login: 'wyntonmarsalis',
        customerId: '18260556127834'
    }
})
```

#### Parameters:

| param            | type   | description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| name             | string | Visitor's name                                       |
| email            | string | Visitor's email address                              |
| url              | string | Visitor's currently visiting website URL             |
| customProperties | object | Visitor's additional data object (custom properties) |

#### Errors:

| type             | reason                                         |
| ---------------- | ---------------------------------------------- |
| missing argument | "Missing name, email, url or customProperties" |

## getTicketForm

Get [ticket form](https://www.livechatinc.com/features/engaging-customers/#Ticket-form) fields configured in chat window settings section in agent app.

```js
visitorSDK.getTicketForm()
    .then((data) => {
        console.log('Ticket form data', data)
    })
    .catch((error) => {
        console.log('error')
    })

```

This method has no parameters.

#### Response:

| param  | type    | description                                                        |
| ------ | ------- | ------------------------------------------------------------------ |
| fields | formField[] | Array with form fields details - see field's description below |

#### formField object description

| param    | type                                    | description              |
| -------- | --------------------------------------- | ------------------------ |
| type     | "name" / "subject" / "email" / "header" | Type of the field        |
| required | boolean                                 | Is field required?       |
| label    | string                                  | Field's label            |
| value    | string                                  | Optional - field's value |

## sendTicketForm

Send [ticket form](https://www.livechatinc.com/features/engaging-customers/#Ticket-form) filled in by visitor. Ticket form should be rendered using fields fetched by getTicketForm method. 

```js
visitorSDK.sendTicketForm({
    name: 'John',
    email: 'john@example.org',
    subject: 'App support',
    message: 'I have a problem with your app'
})
    .then(() => {
        console.log('Ticket sent')
    })
    .catch((error) => {
        console.log('error')
    })

```

#### Parameters

| param   | type   | description             |
| ------- | ------ | ----------------------- |
| name    | string | Vistior's name          |
| email   | string | Visitor's email address |
| subject | string | Ticket subject          |
| message | string | Visitor's message       |

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors:

| type             | reason            |
| ---------------- | ----------------- |
| connection       | "Request failed"  |
| missing argument | "Missing email"   |
| missing argument | "Missing message" |

## disconnect

Disconnect Vistior SDK. Visitor won't be tracked, you won't be notified about agent's availability status change. You will be automatically connected again after using sendMessage or setVisitorData methods. 

```js
visitorSDK.disconnect()
```

#### Errors:

| type    | reason                                        |
| ------- | --------------------------------------------- |
| state   | "You can't disconnect during the chat"        |
