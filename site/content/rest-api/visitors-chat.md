# Visitor’s chat

This method allows you to **perform a chat** via your LiveChat as a visitor.

You can use this to **create your own chat widget** and, for example, place it within your mobile application.

When it comes to mobile widgets, you can use the **ready-made** ones for [iOS](https://docs.livechatinc.com/ios-widget/) and [Android](https://docs.livechatinc.com/android-widget/).

## Available paths

| Methods       | Path      |
|--------------|-----------|
| `POST` | `/visitors/<VISITOR_ID>/chat/start` |
| `GET` | `/visitors/<VISITOR_ID>/chat/get_pending_messages` |
| `POST` | `/visitors/<VISITOR_ID>/chat/send_message` |
| `POST` | `/visitors/<VISITOR_ID>/chat/close` |


## Start chat

> Path

```
POST /visitors/<VISITOR_ID>/chat/start
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors/5863759023/chat/start" \
-H X-API-Version:2 \
-d "licence_id=123&\
welcome_message=Hi"
```

> Sample response

```json-doc
{
  "secured_session_id":"CS1432649054.444adb0d90",
  "banned":false
}
```

This function creates new chat for a visitor and returns a unique session ID, which is required to send, receive or close a given chat.

#### Required properties

| Property | Description |
|---------|--------------------|
| `visitor_id` | unique id of the visitor. It should be generated randomly on your side. If you already have an ID of your user in your database, it can be used as the `visitor_id`. Its maximum length is 1024 characters |
| `licence_id` | your LiveChat account number. You can obtain it from your [LiveChat's installation code](https://my.livechatinc.com/settings/code) (the `__lc.license` param value) |
| `welcome_message` | short welcome message displayed at the beginning of the chat. Its maximum length is 1024 characters |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `name` | visitor's name (defaults to "Client") |
| `email` | visitor's email address |
| `group` | group number ([read more...](http://www.livechatinc.com/kb/dividing-live-chat-by-group/)) |

## Get pending messages

> Path

```
GET https://api.livechatinc.com/visitors/<VISITOR_ID>/chat/get_pending_messages
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors/5863759023/chat/get_pending_messages?\
licence_id=123&\
secured_session_id=26132406c42c96ba61ed42689b70f719" \
-H X-API-Version:2
```

> Sample response

```json-doc
{
  "events":[
    {
      "agent":{
        "avatar":"livechat.s3.amazonaws.com/default/avatars/female_6.jpg",
        "job_title":"Support Agent",
        "name":"agent4"
      },
      "message_id":1,
      "timestamp":1432902625,
      "type":"agent_details",
      "user_type":"agent"
    },
    {
      "message_id":3,
      "text":"Hi, I need some help with entering my discount code.",
      "timestamp":1432902626,
      "type":"message",
      "user_type":"visitor"
    },
    { 
      "..." : "..."
    }
  ]
}
```

Returns messages and events in a pending chat.

<aside class="notice">In order to keep the chat session, you must send that request every couple of seconds. Otherwise, the chat will be closed after ~30 seconds.</aside>

#### Required properties

| Property | Description |
|---------|--------------------|
| `licence_id` | your LiveChat account number. You can obtain it from your [LiveChat's installation code](https://my.livechatinc.com/settings/code) (the `__lc.license` param value) |
| `secured_session_id` | secret session id received from the `start` method |

#### Optional properties

| Property | Description |
|---------|--------------------|
| `last_message_id` | the id of the last received message. You don't have to request the entire chat every time. You can simply start from a particular message ID | 

## Send message

> Path

```
POST https://api.livechatinc.com/visitors/<VISITOR_ID>/chat/send_message
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors/5863759023/chat/send_message" \
-H X-API-Version:2 \
-d "licence_id=123&\
secured_session_id=26132406c42c96ba61ed42689b70f719&\
message=Hello!"
```

> Sample response

```json-doc
{
  "success": true
} 
```

Sends a new message as the visitor.

#### Required properties

| Property | Description |
|---------|--------------------|
| `licence_id` | your LiveChat account number. You can obtain it from your [LiveChat's installation code](https://my.livechatinc.com/settings/code) (the `__lc.license` param value) |
| `secured_session_id` | secret session ID received from the `start` method |
| `message` | the contents of the message|


## Close chat

> Path

```
POST https://api.livechatinc.com/visitors/<VISITOR_ID>/chat/close
```

> Sample request

```shell
curl "https://api.livechatinc.com/visitors/5863759023/chat/close" \
-H X-API-Version:2 \
-d "licence_id=123&\
secured_session_id=26132406c42c96ba61ed42689b70f719&"
```

> Sample response

```json-doc
{
  "success": true
}
```

Ends the chat as a visitor.

#### Required properties

| Property | Description |
|---------|--------------------|
| `licence_id` | your LiveChat account number. You can obtain it from your [LiveChat's installation code](https://my.livechatinc.com/settings/code) (the `__lc.license` param value) |
| `secured_session_id` – secret session ID received from the `start` method |
