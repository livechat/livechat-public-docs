---
weight : 20
---

# Bot Agents

Bot Agents enables writing integrations using the **Agent Chat API** - both [RTM](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api/) and [Web](https://developers.livechatinc.com/beta-docs/agent-chat-web-api/) - to communicate in chats as regular Agents.
A Bot Agent shares the SSO access token with the Agent who created the Bot. Each Bot Agent is a resource owned by an application in Developers Platform, identified by its own `client_id`. 

Unlike Agents, Bot Agents don't have passwords or emails - you cannot log in as a Bot. 


## Methods

### `create_bot_agent`


> **`create_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/create_bot_agent \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats",
        "max_chats_count": 6,
        "groups": [{
        "id": 0,
        "priority": "normal"
    }, {
        "id": 1,
        "priority": "normal"
    }, {
        "id": 2,
        "priority": "first"
    }],
    "webhooks": {
      "url": "http://myservice.com/webhooks",
      "secret_key": "JSauw0Aks8l-asAa",
      "actions": [{
        "name": "incoming_chat_thread"
      },{
        "name": "incoming_event",
        "additional_data": ["chat_properties"]
      }]
    }
    }
		}'
```

> **`create_bot_agent`** sample response payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/create_bot_agent`  |
| __Required scopes *__| `agents-bot--my:rw`  |


| Request object                       | Type       | Required | Notes                                                                |
| ------------------------------------ | ---------- | -------- | -------------------------------------------------------------------- |
| `name`                               | `string`   | Yes      | display name                                                         |
| `avatar`                             | `string`   | No       | avatar URL                                                           |
| `status`                             | `string`   | Yes      | agent status                                                         |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent, by default 6 |
| `groups`                             | `object[]` | No       | groups the agent belongs to                                          |
| `groups[].id`                        | `uint`     | Yes      | group ID                                                             |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                              |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                                           |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                                         |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source                     |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                                   |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                               |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered                      |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook                        |


- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.



### `remove_bot_agent`

> **`remove_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/remove_bot_agent \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
             }
	    }'
```


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/remove_bot_agent`  |
| __Required scopes *__| `agents-bot--my:rw` `agents-bot--all:rw`  |


| Parameter          | Required | Type     | Notes        |
| ------------------ | -------- | -------- | ------------ |
| `bot_agent_id`     |  Yes     | `string` | Bot Agent ID |


#### Response

No response payload.



### `update_bot_agent`

> **`update_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/update_bot_agent \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
         "id": "5c9871d5372c824cbf22d860a707a578",
         "status": "accepting chats",
         "max_chats_count": 6,
         "webhooks": {
         "url": "http://myservice.com/webhooks",
         "secret_key": "JSauw0Aks8l-asAa",
         "actions": [{
           "name": "incoming_chat_thread",
           "filters": {
               "chat_properties": {
                   "source": {
                       "type": {
                            "values": ["facebook", "twitter"]
                        }
                   }
               }
           }
         },{
           "name": "incoming_event"
                }]
            }
        }
	}'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/update_bot_agent`  |
| __Required scopes *__| `agents-bot--my:rw`  |



| Request object                       | Type       | Required | Notes                                                  |
| ------------------------------------ | ---------- | -------- | ------------------------------------------------------ |
| `id`                                 | `string`   | Yes      | bot agent ID                                           |
| `name`                               | `string`   | No       | display name                                           |
| `avatar`                             | `string`   | No       | avatar URL                                             |
| `status`                             | `string`   | No       | agent status                                           |
| `max_chats_count`                    | `int`      | No       | maximum incoming chats that can be routed to the agent |
| `default_group_priority`             | `string`   | No       | Default routing priority for group without defined one |
| `groups`                             | `object[]` | No       | groups the agent belongs to                            |
| `groups[].id`                        | `uint`     | Yes      | group ID                                               |
| `groups[].priority`                  | `string`   | Yes      | agent priority in group                                |
| `webhooks`                           | `object`   | No       | webhooks sent to the agent                             |
| `webhooks.url`                       | `string`   | Yes      | destination URL for webhooks                           |
| `webhooks.secret_key`                | `string`   | Yes      | secret sent in webhooks to verify webhook source       |
| `webhooks.actions`                   | `object[]` | Yes      | triggering actions                                     |
| `webhooks.actions[].name`            | `string`   | Yes      | triggering action name                                 |
| `webhooks.actions[].filters`         | `object`   | No       | filters to check if webhook should be triggered        |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhook          |


- `status` possible values:
  - `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  - `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  - `offline` - agent is not logged in
- `groups[].priority` possible values:
  - `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg Bots can get chats before
    normal agents.
  - `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  - `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
- `default_group_priority` possible values:
  - `first` - Chats are assigned to bot before normal agents
  - `normal` - Chats are assigned with the same priority as it would for normal agents
  - `last` - If there is no agent available then, chat will be assigned to bot
  - `supervisor` - Bot works as `supervisor` so he/she will not be assigned to any chats
- `webhooks` - go [here](#webhooks) for possible actions values and payloads.


#### Response

No response payload




### Get Bot Agents

### `get_bot_agents`


> **``** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/get_bot_agents \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "all": false
        }
	}'
```

> **`get_bot_agents`** sample response payload

```js
{
    "bot_agents": [{
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats"
    }]
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/get_bot_agents`  |
| __Required scopes *__| `agents-bot--my:ro` `agents-bot--all:ro`  |


| Parameter          | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `all`                |  No      | `bool` |  Get all Bot Agents, if `false` returns only caller's Bot Agents, default value is `false`|



### `get_bot_agent_details`


> **`get_bot_agent_details`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/get_bot_agent_details \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_access_token>' \
  -d '{
    "payload": {
        "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
        }
	}'
```

> **`get_bot_agent_details`** sample response payload

```js
{
    "bot_agent": {
        "id": "5c9871d5372c824cbf22d860a707a578",
        "name": "John Doe",
        "avatar": "livechat.s3.amazonaws.com/1011121/all/avatars/bdd8924fcbcdbddbeaf60c19b238b0b0.jpg",
        "status": "accepting chats",
        "application": {
            "client_id": "asXdesldiAJSq9padj"
        },
        "max_chats_count": 6,
        "groups": [{
            "id": 0,
            "priority": "normal"
        }, {
            "id": 1,
            "priority": "normal"
        }, {
            "id": 2,
            "priority": "first"
        }],
        "webhooks": {
            "url": "http://myservice.com/webhooks",
            "secret_key": "JSauw0Aks8l-asAa",
            "actions": [{
                "name": "incoming_chat_thread",
                "filters": {
                  "chat_properties": {
                     "source": {
                        "type": {
                           "values": ["facebook", "twitter"]
                        }
                      }
                  }
                }
            },{
                "name": "incoming_event",
                "additional_data": ["chat_properties"]
            }]
        }
    }
}
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/get_bot_agent_details`  |
| __Required scopes *__| `agents-bot--my:ro` `agents-bot--all:ro`  |


| Parameter          | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `bot_agent_id`                |  Yes      | `string` | Bot Agent ID |



