## Methods

### init
```js
import { init } from "@livechat/livechat-visitor-api";

const visitorApi = init({
    license: 123,
    group: 0,
})
```

Parameters:

| param   | type   | description              |
| ------- | ------ | ------------------------ |
| license | number | LiveChat license number  |
| group   | number | Group number (default 0) |

### sendMessage
```js
visitorApi.sendMessage({
    text: "Hello",
    customId: 123423215
})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
```

Parameters:

| param    | type   | description          |
| -------- | ------ | -------------------- |
| text     | string | Visitor message text |
| customId | string | Message custom Id    |

Errors:

| type             | reason                               |
| ---------------- | ------------------------------------ |
| connection       | "Request failed"                     |
| missing argument | "Missing text or customId parameter" |

### sendFile - not implemented yet
```js
visitorApi.sendFile({
    file: FileObject,
    customId: 123423215
})
    .then((response) => {
        console.log(response.status)
    })
    .catch((error) => {
        console.log(error)
    })
```

Parameters:

| param      | type   | description    |
| ---------- | ------ | -------------- |
| file       | file   | File to upload |
| customId   | string | custom file id |

Feature description: https://www.livechatinc.com/features/chat-tools/#File-sharing

### rateChat - not implemented yet
```js
visitorApi.rateChat({
    rate: "good",
    comment: "Agent helped me a lot!"
})
```

Parameters:

| param   | type                      | description                  |
| ------- | ------------------------- | ---------------------------- |
| rate    | "good" \| "bad" \| "none" | Rate type                    |
| comment | string                    | Rate comment text (optional) |

Feature description: https://www.livechatinc.com/features/getting-feedback/#Chat-ratings

### markMessageAsSeen - not implemented yet
```js
visitorApi.markMessageAsSeen({
    messageId: "123123123",
})
```

Parameters:

| param     | type   | description                        |
| --------- | ------ | ---------------------------------- |
| messageId | string | Id of message to be marked as seen |

Feature description: https://www.livechatinc.com/features/chat-tools/#Delivery-status

### setSneakPeek - not implemented yet
```js
visitorApi.setSneakPeek({
    message: "Hello, I woul",
})
```

Parameters:

| param   | type   | description                |
| ------- | ------ | -------------------------- |
| message | string | Current message input text |

Note: Sneak peek won't be sent every time you call a function. It will be throttled (sent not earlier than 300ms after the last sneak peek request).

Feature description: https://www.livechatinc.com/features/chat-tools/#Message-sneak-peak

### forwardChatTranscript - not implemented yet
```js
visitorApi.forwardChatTranscript({
    email: "test@livechatinc.com",
})
```

Parameters:

| param | type   | description                                                                |
| ----- | ------ | -------------------------------------------------------------------------- |
| email | string | Email that will automatically receive a transcript when a chat is finished |

Feature description: https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features

### sendTicketForm - not implemented yet
```js
visitorApi.sendTicketForm(form)
```

Feature description: https://www.livechatinc.com/features/engaging-customers/#Ticket-form

### sendPrechatForm - not implemented yet
```js
visitorApi.sendPrechatForm(form)
```

### sendPostchatForm - not implemented yet
```js
visitorApi.sendPostchatForm(form)
```

Feature description: https://www.livechatinc.com/features/getting-feedback/#Post-chat-surveys

### getVisitorData - not implemented yet

```js

const visitorData = visitorApi.getVisitorData()
```

returned value: 

| param            | type   | description                                                 |
| ---------------- | ------ | ----------------------------------------------------------- |
| name             | string | Visitor's name                                              |
| email            | string | Visitor's email address                                     |
| url              | string | Visitor's currently visiting website URL                    |
| customProperties | object | Visitor's additional data object (custom properties)        |

### setVisitorData - not implemented yet
```js
visitorApi.setVisitorData({
    name: "Wynton Marsalis",
    email: "test@livechatinc.com",
    url: 'http://example.org/pricing'
    customProperties: [
        "Account Id": "AB2341CWD",
        "Login": "w_marsalis",
    ]
})
```

Parameters:

| param            | type   | description                                                 |
| ---------------- | ------ | ----------------------------------------------------------- |
| name             | string | Visitor's name                                              |
| email            | string | Visitor's email address                                     |
| url              | string | Visitor's currently visiting website URL                    |
| customProperties | object | Visitor's additional data object (custom properties)        |

errors:

| type             | reason                                         |
| ---------------- | ---------------------------------------------- |
| missing argument | "Missing name, email, url or customProperties" |

Feature description: https://www.livechatinc.com/features/chat-tools/#Visitor-information
