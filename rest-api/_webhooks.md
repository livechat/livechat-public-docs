# Webhooks

Webhooks give a variety of ways to integrate LiveChat with external services.

Visit our thorough tutorial on how to [start using webhooks](//developers.livechatinc.com/build-an-integration/#!webhooks). It includes a number of use-cases that webhooks can be used in.

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

> Example request

```shell
curl "https://api.livechatinc.com/webhooks" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

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

Returns list of webhooks that have been created in LiveChat account.

## Create a new webhook

> Path

```
POST https://api.livechatinc.com/webhooks
```

> Example request

```shell
curl "https://api.livechatinc.com/webhooks" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
  -d "event_type=chat_started&\
data_types[]=chat&\
data_types[]=visitor&\
url=http://my-company.com/parse_webhook.php
```

> Example response

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
| `event_type` | must be one of `chat_started`, `chat_ended`, `visitor_queued` or `ticket_created` |
| `data_types` | determines what information the webhook will contain |
| `url` | the URL address the webhook will be sent to |

#### Additional info:

`event_type` determines when the webhook will be sent to your script:

| Property | Description |
|---------|--------------------|
| `chat_started` | when the chat is started |
| `chat_ended` | when the chat is ended |
| `visior_queued` | when the visitor enters the queue before a chat |
| `ticket_created` | when a new ticket is created |

`data_type` is an array that includes one or more of the following values):

| Property | Description |
|---------|--------------------|
| `chat` | only supported in `chat_started` and `chat_ended` event types |
| `visitor` | only supported in `chat_started`, `chat_ended` and `visitor_queued` event types | 
| `pre_chat_survey` | only supported in `chat_started` and `chat_ended` event types |
| `ticket` | only supported in `ticket_created` event type |

## Delete a webhook

> Path

```
DELETE https://api.livechatinc.com/webhooks/<ID>
```

> Example request

```shell
curl "https://api.livechatinc.com/webhooks/39612eee5(...)" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2 \
  -X DELETE
```

> Example response

```json-doc
{
    "result":"Push notification removed successfully"
}
```

Deletes webhook with given `ID`.