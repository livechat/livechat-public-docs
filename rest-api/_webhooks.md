# Webhooks

This method will help you build your own LiveChat integrations by **creating** and **managing webhooks**. 

Check out our [webhooks tutorial](https://docs.livechatinc.com/build-integration/#!webhooks) for more information, use cases and to learn how to get started.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/webhooks` |
| `POST` | `/webhooks` |
| `DELETE` | `/webhooks/<WEBHOOK_ID>` |

## Display configured webhooks

> Path

```
GET https://api.livechatinc.com/webhooks
```

> Sample request

```shell
curl "https://api.livechatinc.com/webhooks" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Sample response

```json-doc
{
    "events": [{
        "licence": 12345,
        "event_type": "chat_started",
        "data_types": ["chat", "visitor"],
        "url": "https://my-company.com/parse_webhook.php",
        "verified": true,
        "token": "0adec158e423091d5a36c9fce95775db",
        "id": "39612eee5f1b431217aafb9de19c1e32"
    }]
}
```

Returns a list of webhooks that have been created in a LiveChat account.

## Create a new webhook

> Path

```
POST https://api.livechatinc.com/webhooks
```

> Sample request

```shell
curl "https://api.livechatinc.com/webhooks" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
  -d "event_type=chat_started&\
data_types[]=chat&\
data_types[]=visitor&\
url=http://my-company.com/parse_webhook.php
```

> Sample response

```json-doc
{
    "events": [{
        "licence": 12345,
        "event_type": "chat_started",
        "data_types": ["chat", "visitor"],
        "url": "https://my-company.com/parse_webhook.php",
        "verified": true,
        "token": "0adec158e423091d5a36c9fce95775db",
        "id": "39612eee5f1b431217aafb9de19c1e32"
    }]
}
```

Creates a new webhook.

#### Required properties

| Property | Description |
|---------|--------------------|
| `event_type` | must be one of `chat_started`, `chat_ended`, `chat_changed`, `visitor_queued`, `ticket_created` or `canned_response_changed` |
| `data_types` | determines what information the webhook will contain |
| `url` | the URL address the webhook will be sent to |

#### Additional info:

`event_type` determines when the webhook will be sent to your script:

| Property | Description |
|---------|--------------------|
| `chat_started` | when the chat is started |
| `chat_ended` | when the chat is ended |
| `chat_changed` | when the chat is tagged |
| `visior_queued` | when the visitor enters the queue before a chat |
| `ticket_created` | when a new ticket is created |
| `canned_response_changed` | when a canned response is created, modified or deleted |

`data_type` is an array that includes one or more of the following values):

| Property | Description |
|---------|--------------------|
| `chat` | only supported in `chat_started`, `chat_changed` and `chat_ended` event types |
| `visitor` | only supported in `chat_started`, `chat_ended`, `chat_changed` and `visitor_queued` event types | 
| `pre_chat_survey` | only supported in `chat_started` and `chat_ended` event types |
| `ticket` | only supported in `ticket_created` event type |
| `canned_response` | only supported in `canned_response_changed` event type |

## Delete a webhook

> Path

```
DELETE https://api.livechatinc.com/webhooks/<ID>
```

> Sample request

```shell
curl "https://api.livechatinc.com/webhooks/39612eee5(...)" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Sample response

```json-doc
{
    "result":"Push notification removed successfully"
}
```

Deletes a webhook with the given `ID`.
