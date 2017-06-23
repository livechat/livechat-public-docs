# Methods

### init
```js
import { init } from "@livechat/livechat-visitor-api";

const visitorApi = init({
    license: 123,
    group: 0,
})
```

params:

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

params:

| param    | type   | description          |
| -------- | ------ | -------------------- |
| text     | string | Visitor message text |
| customId | string | Message custom Id    |

errors:

| type       | reason               |
| ---------- | -------------------- |
| connection | "Connection timeout" |

### sendFile
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

params:

| param      | type   | description    |
| ---------- | ------ | -------------- |
| file       | file   | File to upload |
| customId   | string | custom file id |

Feature description: https://www.livechatinc.com/features/chat-tools/#File-sharing

### rateChat
```js
visitorApi.rateChat({
    rate: "good",
    comment: "Agent helped me a lot!"
})
```

params:

| param   | type                      | description                  |
| ------- | ------------------------- | ---------------------------- |
| rate    | "good" \| "bad" \| "none" | Rate type                    |
| comment | string                    | Rate comment text (optional) |

Feature description: https://www.livechatinc.com/features/getting-feedback/#Chat-ratings

### markMessageAsSeen
```js
visitorApi.markMessageAsSeen({
    messageId: "123123123",
})
```

params:

| param     | type   | description                        |
| --------- | ------ | ---------------------------------- |
| messageId | string | Id of message to be marked as seen |

Feature description: https://www.livechatinc.com/features/chat-tools/#Delivery-status

### setSneakPeek
```js
visitorApi.setSneakPeek({
    message: "Hello, I woul",
})
```

params:

| param   | type   | description                |
| ------- | ------ | -------------------------- |
| message | string | Current message input text |

Note: Sneak peek won't be sent every time you call a function. It will be throttled (sent not earlier than 300ms after the last sneak peek request).

Feature description: https://www.livechatinc.com/features/chat-tools/#Message-sneak-peak

### forwardChatTranscript
```js
visitorApi.forwardChatTranscript({
    email: "test@livechatinc.com",
})
```

params:

| param | type   | description                                                                |
| ----- | ------ | -------------------------------------------------------------------------- |
| email | string | Email that will automatically receive a transcript when a chat is finished |

Feature description: https://www.livechatinc.com/features/chat-tools/#Chat-tools-other-features

### sendTicketForm
```js
visitorApi.sendTicketForm(form)
```

Feature description: https://www.livechatinc.com/features/engaging-customers/#Ticket-form

### sendPrechatForm
```js
visitorApi.sendPrechatForm(form)
```

### sendPostchatForm
```js
visitorApi.sendPostchatForm(form)
```

Feature description: https://www.livechatinc.com/features/getting-feedback/#Post-chat-surveys

### setVisitorData
```js
visitorApi.setVisitorData({
    name: "Wynton Marsalis",
    email: "test@livechatinc.com",
    customProperties: [
        "Account Id": "AB2341CWD",
        "Login": "w_marsalis",
    ]
})
```


params:

| param            | type   | description                                                 |
| ---------------- | ------ | ----------------------------------------------------------- |
| name             | string | Visitor's name                                              |
| email            | string | Visitor's email address                                     |
| customProperties | object | Visitor's additional data object (custom properties)        |

Feature description: https://www.livechatinc.com/features/chat-tools/#Visitor-information