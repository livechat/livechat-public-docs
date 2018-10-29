---
weight: 10
---

# Key Concepts

## Chats and threads

A **chat** is a single chat conversation. Each chat is divided into **threads**. Every thread may contain **events**. You can find more about the events in the [Events](#events) section.

Multiple users can participate in a single chat. Every user can have multiple chats at the same time.

New threads within a single chat are created on the server side. To learn more about the creation algorithm, see [Rules and conditions](#rules-and-conditions).

![Chats and Threads](./images/chats.png "chats and threads")

### Rules and conditions

 1. Only one of the threads within a chat may be the **active thread**. When you send events to a chat, they will be added to the **active thread**. Only the **last thread** can be the active one.
 
 2. Chats are **not continuous**, which means that there can be time gaps between the threads.
 
 3. When there is no active thread in the chat, sending an event to that chat will start **a new thread**. For instance, when the last active thread has been closed, sending an event to the same chat will open up a new thread. The [annotation event](#annotation) is an exception here: it will be added at the end of the last thread.

 4. When a new chat is started, **a new thread** is created within this chat.
 
 5. The algorithm which decides how the chats are distributed between the agents is called **routing**. It's documented in the [Routing](#routing) section.

## Events

Events are portions of data which can be sent to a chat (via [send_event](../agent-chat-api/#send-event)). There are the following event types:

 - [message](#message)
 - [annotation](#annotation)
 - [filled form](#filled-form)
 - [system message](#system-message)
 - [file](#file)
 - [custom event](#custom-event)

[Incoming event](../agent-chat-api/#incoming-event) push will inform you about events sent to a chat (on both agent and customer side).

### Pushes

The events coming **from the server to the client** are called **pushes**. They are used to keep the application state up-to-date. Pushes are available only in the websocket transport.

If a chat or a thread is created or closed when you're logged in, server push messages will be sent (in both Customer and Agent APIs).

### Common event fields

Here are the fields shared by all events:

| name        | puprose                                        | filled by | type   |
|-------------|------------------------------------------------|-----------|--------|
| `id`        | the ID of the event                            | server    | string |
| `custom_id` | the ID that you can set for your own purposes  | client    | string |
| `order`     | events with a lower `order` will appear first  | server    | int    |
| `author_id` | the ID of the sender of an event       		   | server    | string |
| `text`      | the payload that you can send whithin an event (for example message content) | client | string |
| `recipients` | the posibble values are `"all"`(default) and `"agents"` | client | string |
| `properties` | event [properties](#properties) | client | properties object |


### Event types

#### Message

 A message is the most common event type. It allows you to send textual content to other chat users. Its data format looks like this:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12345-bhdsa",
  "order": 1,
  "type": "message",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "hello there",
  "recipients": "all",
  "properties": {
    // "Properties" object
  }
}
```


#### Annotation

This event adds an annotation to the last thread. Keep in mind that sending an annotation cannot start a new thread (even if there is no active thread in a chat). It always goes to the latest thread that already exists.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "annotation",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "text": "Sample annotation",
  "annotation_type": "rating",
  "properties": {
    // "Properties" object
  }
}
```

`annotation_type` - type of the annotation. This field cannot be empty and is customizable, you can have your own annotation types (in the example above we used "rating" type)


#### Filled form

A filled form is an event containing data from a form. Let's take a look at a practical example:

![Filled Form](images/filled_form.png "filled form example")

To send the data from this form, you can use the filled form event. In this example we introduce all currently available field types:

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 4,
  "type": "filled_form",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "properties": {
    // "Properties" object
  }
  "fields": [{
      "type": "text",
      "name": "name",
      "label": "Your name:",
      "required": true,
      "value": "John Doe"
    },
    {
      "type": "email",
      "name": "email",
      "label": "E-mail:",
      "required": true,
      "value": "john.doe@gmail.com"
    },
    {
      "name": "Chat window title",
      "type": "title",
      "label": "Let's talk!",
    },
    {
      "name": "Chat window form info",
      "type": "information",
      "label": "Before we start, we'd like to know a few details about you.",
    }]
}
```


#### System message

A system message is an event generated by the server. It does not have "author_id", "custom_id" and "properties" fields.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "order": 1,
  "type": "system_message",
  "timestamp": 1473433500,
  "text": "Mike joined the chat",
  "system_message_type": "agent_joined"
}
```

 System messages can be triggered by a user action within a chat or by a router (router messages are covered in the [Routing](#routing) section). Each action triggers a system message with a different `system_message_type` and a different `text` message:

| system_message_type | text                             |
|---------------------|----------------------------------|
| `agent_joined`      | `<agent_name> joined the chat`   |
| `agent_left`        | `<agent_name> left the chat`     |
| `manual_archived`   | `<agent_name> archived the chat` |


#### File

File event indicates that a file has been uploaded. It can be only generated by the server when the [send file](../customer-chat-api/#send-file) Customer API method is called.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "file",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "properties": {
    // "Properties" object
  }
  "name": "image25.png",
  "url": "https://domain.com/asdsfdsf.png",
  "content_type": "image/png",
  "size": 123444,
  "width": 640,
  "height": 480
}
```

The `size` field indicates the file size in bytes. It is limited to 10 MB. <br>
The `content-type` field can contain any [MIME media type](https://en.wikipedia.org/wiki/Media_type). <br>
`Width` and `height` fields are present only for `"image/png"`, `"image/gif"` and `"image/jpg"` content-types. There is no limitations for width and height.


#### Custom event

A custom event is an event with a 100% custom payload. It can be used to send any JSON.

```js
{
  "id": "0affb00a-82d6-4e07-ae61-56ba5c36f743",
  "custom_id": "12312.301231238591134",
  "order": 1,
  "type": "custom",
  "author_id": "b7eff798-f8df-4364-8059-649c35c9ed0c",
  "timestamp": 1473433500,
  "content": {
    //any json object
  },
  "properties": {
    // "Properties" object
  }
}
```
