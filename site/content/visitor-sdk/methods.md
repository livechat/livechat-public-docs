---
weight: 30
---

# Methods

## init

Initializes the chat window.

```js
import LivechatVisitorSDK from '@livechat/livechat-visitor-sdk'

const visitorSDK = LivechatVisitorSDK.init({
  license: 123,
  group: 0,
})
```

#### Parameters:

| param   | type   | description               |
| ------- | ------ | ------------------------- |
| license | number | LiveChat license number   |
| group   | number | Group number (default: 0) |

## sendMessage

Sends a message.

```js
visitorSDK
  .sendMessage({
    text: 'Hello',
    customId: '123423215',
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
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
| state            | "Chat is offline"                    |

## closeChat

Closes the chat.

```js
visitorSDK
  .closeChat()
  .then(() => {
    console.log('Chat is closed')
  })
  .catch(error => {
    console.log(error)
  })
```

This method has no parameters.

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors:

| type         | reason                    |
| ------------ | ------------------------- |
| "state"      | There is no chat to close |
| "connection" | Request failed            |

## sendFile

Enables [file sharing](https://www.livechatinc.com/features/chat-tools/#File-sharing) through the chat window.

```js
visitorSDK
  .sendFile({
    file: FileObject,
    customId: '123423215',
  })
  .then(response => {
    console.log(response.status)
  })
  .catch(error => {
    console.log(error)
  })
```

#### Parameters:

| param      | type     | description                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------ |
| file       | blob     | File to upload                                                                 |
| onProgress | function | Callback function. It will receive a progress value (a number between 0 and 1) |

#### Errors:

| type             | reason                           |
| ---------------- | -------------------------------- |
| connection       | "Request failed"                 |
| missing argument | "Missing file"                   |
| wrong argument   | "Cannot upload a file over 10MB" |

#### Response:

| param       | type   | description                                       |
| ----------- | ------ | ------------------------------------------------- |
| id          | string | File id                                           |
| timestamp   | string | File timestamp                                    |
| url         | string | File URL address                                  |
| contentType | string | File content type                                 |
| size        | number | File size in bytes                                |
| width       | number | Image width (for image content types) - optional  |
| height      | number | Image height (for image content types) - optional |

## rateChat

Enables [chat ratings](https://www.livechatinc.com/features/getting-feedback/#Chat-ratings).

```js
visitorSDK
  .rateChat({
    rate: 'good',
    comment: 'Agent helped me a lot!',
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

#### Parameters:

| param   | type                    | description                  |
| ------- | ----------------------- | ---------------------------- |
| rate    | "good" \ "bad" \ "none" | Rate type                    |
| comment | string                  | Rate comment text (optional) |

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
  messageId: '123123123',
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
  text: 'Hello, I woul',
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
visitorSDK
  .forwardChatTranscript({
    email: 'test@livechatinc.com',
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
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

## getPrechatForm

Get pre-chat survey form fields configured in [chat window settings section](https://my.livechatinc.com/settings/pre-chat-survey) in agent app.

```js
visitorSDK
  .getPrechatForm()
  .then(data => {
    console.log('Pre-Chat form data', data)
  })
  .catch(error => {
    console.log('error')
  })
```

This method has no parameters.

#### Response:

| param  | type        | description                                                    |
| ------ | ----------- | -------------------------------------------------------------- |
| fields | formField[] | Array with form fields details - see field's description below |

#### formField object description

| param    | type                                                                                         | description                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| type     | "name" / "text" / "email" / "select" / "checkbox" / "radio" / "group_select" / "information" | Type of the field                                                                                                          |
| required | boolean                                                                                      | Is field required?                                                                                                         |
| name     | string                                                                                       | field's name                                                                                                               |
| label    | string                                                                                       | Field's label                                                                                                              |
| value    | string                                                                                       | Optional - field's value                                                                                                   |
| options  | fieldOption[]                                                                                | Array with fields options - only for fields of type: radio, checkbox, select, group_select. see option's description below |

#### fieldOption object description

| param   | type    | description          |
| ------- | ------- | -------------------- |
| label   | string  | input's label        |
| checked | boolean | input's checked flag |
| value   | string  | input's value        |

#### Errors:

| type         | reason                        |
| ------------ | ----------------------------- |
| "connection" | Request failed                |
| "state"      | Pre-chat survey is turned off |

## sendPrechatForm

Collects the pre-chat survey form information (it will be visible during the chat and in the archives). Pre-chat form form should be rendered using fields fetched by getPrechatForm method.

```js
const formAnswers = {
  '151913066848701614': 'Sidney Bechet', // "151913066848701614" is field's name, and "Sidney Bechet" is value provided by the visitor
  '151913066848701615': 's.brechet@example.org',
  '15191306684870388': ['1', '2'], // Fieds with "checkbox" type have multiple values.
}

visitorSDK
  .sendPrechatForm(formAnswers)
  .then(() => {
    console.log('Pre-chat sent')
  })
  .catch(error => {
    console.log('error')
  })
```

#### Parameters:

| param       | type   | description                                             |
| ----------- | ------ | ------------------------------------------------------- |
| formAnswers | object | Pre-chat forms answers object - field.name: field.value |

#### Response:

| param   | type    | description               |
| ------- | ------- | ------------------------- |
| success | boolean | Request's response status |

#### Errors:

| type            | reason                                        | fields       |
| --------------- | --------------------------------------------- | ------------ |
| connection      | "Request failed"                              |              |
| state           | "You can't send prechat when chat is running" |              |
| wrong arguments |                                               | fieldError[] |

`wrong arguments` error object contains additional array "fields" with detailed validations errors.

#### fieldError object description

| param       | type    | description                                                               |
| ----------- | ------- | ------------------------------------------------------------------------- |
| reason      | string  | Error reason, e.g. "Required field", "Wrong type"                         |
| description | boolean | Optional. Detailed error description, e.g. "Pease fill in required field" |
| field       | string  | Field's name                                                              |

## sendPostchatForm - not implemented yet

Collects the [post-chat form](https://www.livechatinc.com/features/getting-feedback/#Post-chat-surveys) information (it will be visible in the archives).

```js
visitorSDK.sendPostchatForm(form)
```

## getVisitorData

Collects the [visitor information](https://www.livechatinc.com/features/chat-tools/#Visitor-information).

```js
const visitorData = visitorSDK.getVisitorData().then(visitorData => {
  console.log(visitorData)
})
```

#### Returned value:

| param            | type   | description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| name             | string | Visitor's name                                       |
| email            | string | Visitor's email address                              |
| pageUrl          | string | Visitor's currently visiting website URL             |
| pageTitle        | string | Visitor's currently visiting website title           |
| customProperties | object | Visitor's additional data object (custom properties) |

## setVisitorData

Set the [visitor information](https://www.livechatinc.com/features/chat-tools/#Visitor-information).

```js
visitorSDK.setVisitorData({
  name: 'Wynton Marsalis',
  email: 'test@livechatinc.com',
  pageUrl: 'http://example.org/pricing',
  pageTitle: 'Pricing',
  customProperties: {
    login: 'wyntonmarsalis',
    customerId: '18260556127834',
  },
})
```

#### Parameters:

| param            | type   | description                                          |
| ---------------- | ------ | ---------------------------------------------------- |
| name             | string | Visitor's name                                       |
| email            | string | Visitor's email address                              |
| pageUrl          | string | Visitor's currently visiting website URL             |
| pageTitle        | string | Visitor's currently visiting website title           |
| customProperties | object | Visitor's additional data object (custom properties) |

#### Errors:

| type             | reason                                         |
| ---------------- | ---------------------------------------------- |
| missing argument | "Missing name, email, url or customProperties" |
| connection       | "Request failed"                               |

## getTicketForm

Get [ticket form](https://www.livechatinc.com/features/engaging-customers/#Ticket-form) fields configured in [chat window settings section](https://my.livechatinc.com/settings/ticket-form) in agent app.

```js
visitorSDK
  .getTicketForm()
  .then(data => {
    console.log('Ticket form data', data)
  })
  .catch(error => {
    console.log('error')
  })
```

This method has no parameters.

#### Response:

| param  | type        | description                                                    |
| ------ | ----------- | -------------------------------------------------------------- |
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
visitorSDK
  .sendTicketForm({
    name: 'John',
    email: 'john@example.org',
    subject: 'App support',
    message: 'I have a problem with your app',
  })
  .then(() => {
    console.log('Ticket sent')
  })
  .catch(error => {
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

Disconnect Visitor SDK. A visitor won't be tracked, and you won't be notified about agent's availability status. You will be automatically connected again after using sendMessage or setVisitorData methods.

```js
visitorSDK.disconnect()
```

#### Errors:

| type  | reason                                 |
| ----- | -------------------------------------- |
| state | "You can't disconnect during the chat" |

## destroy

Disconnect Visitor SDK and unsubscribe from all callbacks.

```js
visitorSDK.destroy()
```

## getTranslations

Get translations for current group.

```js
visitorSDK.getTranslations().then(translations => {
  console.log('Translations', translations)
})
```

#### Errors:

| type       | reason           |
| ---------- | ---------------- |
| connection | "Request failed" |

## getPredictedAgent

Get agent details without starting a chat

#### Response:

| param     | type   | description                                     |
| --------- | ------ | ----------------------------------------------- |
| name      | string | Agent's name                                    |
| id        | string | Agent's ID                                      |
| avatarUrl | string | Agent's avatar - path to the image on Amazon s3 |
| jobTitle  | string | Agent's job title                               |

#### Errors:

| type       | reason           |
| ---------- | ---------------- |
| connection | "Request failed" |
