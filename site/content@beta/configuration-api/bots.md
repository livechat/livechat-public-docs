---
weight : 20
---

# Bot Agents

Bot Agents enables writing integrations using the **Agent Chat API** - both [RTM](https://developers.livechatinc.com/beta-docs/agent-chat-rtm-api-v3.1/) and [Web](https://developers.livechatinc.com/beta-docs/agent-chat-web-api-v3.1/) - to communicate in chats as regular Agents.
A Bot Agent shares the SSO access token with the Agent who created the Bot. Each Bot Agent is a resource owned by an application in Developers Platform, identified by its own `client_id`. 

Unlike Agents, Bot Agents don't have passwords or emails - you cannot log in as a Bot. 


## Methods

#### The Bot Agents API endpoint

| HTTP method  | Base URL |
|-------|--------|
| `POST`|`https://api.livechatinc.com/v3.0/configuration/action/<action>`   |

#### Required headers

| Header   |      Value      |   |
|----------|:-------------:|------:|
| `Content-Type`	 |  `application/json`  |  |

<a href="https://www.getpostman.com/collections/b4e87c243f23fa1f4240" target="_blank"><img src="https://run.pstmn.io/button.svg"></a>

------------------------------------------------------------------------------------------------------------------------------------------------------------


### `create_bot_agent`

> **`create_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/agents/create_bot_agent \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    payload {
      "name": "Bot Name",
      "status": "accepting chats"
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

#### Request

| Request object                       | Type       | Required | Notes                                                                |
| ------------------------------------ | ---------- | -------- | -------------------------------------------------------------------- |
| `name`                               | `string`   | Yes      | Display name                                                         |
| `status` __*__                       | `string`   | Yes      | Agent status                                                         |
| `avatar`                             | `string`   | No       | Avatar URL                                                           |
| `max_chats_count`                    | `int`      | No       | Max. number of incoming chats that can be routed to an Agent, default: 6 |
| `groups`                             | `object[]` | No       | Groups an Agent belongs to                                          |
| `groups[].id`                        | `uint`     | Yes      | Group ID; required only when `group`'s included.                     |
| `groups[].priority` __**__           | `string`   | Yes      | Agent's priority in a group; required only when `group`'s included.    |
| `webhooks`                           | `object`   | No       | Webhooks sent to the Agent; for more info on possible values and payload, see [Webhooks](#webhooks).     |
| `webhooks.url`                       | `string`   | Yes      | Destination URL for webhooks; required only when `webhooks`'s included.       |
| `webhooks.secret_key`                | `string`   | Yes      | Secret sent in webhooks to verify webhook's source; required only when `webhooks`'s included.  |
| `webhooks.actions`                   | `object[]` | Yes      | Triggering actions; required only when `webhooks`'s included.  |
| `webhooks.actions[].name`            | `string`   | Yes      | The name of the triggering action; required only when `webhooks`'s included. |
| `webhooks.actions[].filters`         | `object`   | No       | Filters to check if a webhook should be triggered                      |
| `webhooks.actions[].additional_data` | `string[]` | No       | Additional data that will arrive with webhooks                        |

#### __*)__ `status`

| Possible value | Notes           |
| ------------- |:-------------:|
| `accepting chats`  | Agent is logged in. The chat router routes incoming chats to the Agent.     |
| `not accepting chats` | Agent is logged in, but the chat router doesn't route incoming chats to the Agent. |
| `offline` | Agent isn't logged in.    |


#### __**)__ `groups[].priority`

| Possible value | Notes           |
| ------------- |:-------------:|
| `first`  | The highest chat routing priority. Agents with the `first` priority get chats before others from the same group, e.g. Bots can get chats before regular Agents.  |
| `normal` | The medium chat routing priority. Agents with the `normal` priority get chats before those with the `last` priority, when there are no Agents with the `first` priority available with free slots in the group. |
| `last` | The lowest chat routing priority. Agents with the `last` priority get chats when there are no Agents with the `first` or `normal` priority available with free slots in the group.   |



### `remove_bot_agent`

> **`remove_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/remove_bot_agent \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    payload {
      "bot_agent_id": "505591fc9fc2d6e92798bed7d9d8f079"
          }
      }'
```


#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/remove_bot_agent`  |
| __Required scopes *__| `agents-bot--my:rw` `agents-bot--all:rw`  |

#### Request

| Parameter          | Required | Type     | Notes        |
| ------------------ | -------- | -------- | ------------ |
| `bot_agent_id`     |  Yes     | `string` | Bot Agent ID |


#### Response

No response payload (`200 OK`).



### `update_bot_agent`

> **`update_bot_agent`** sample request

```shell
curl -X POST \
  https://api.livechatinc.com/v3.0/configuration/action/update_bot_agent \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    payload {
      "id": "ce54714e3d2b53adbfff09dbdbdd56e9",
      "name": "New Bot Name"
          }
      }'
```

#### Specifics

|  |  |
|-------|--------|
| **Method URL**   | `https://api.livechatinc.com/v3.0/configuration/action/update_bot_agent`  |
| __Required scopes *__| `agents-bot--my:rw`  |

#### Request

| Parameter                       | Required       | Data type | Notes                                                  |
| ------------------------------------ | ---------- | -------- | ------------------------------------------------------ |
| `id`                                 | Yes   | `string`      | Bot agent ID                                           |
| `name`                               | No   | `string`       | Display name                                           |
| `avatar`                             | No   | `string`       | Avatar URL                                             |
| `status` __*__                       | No   | `string`       | Agent status                                           |
| `max_chats_count`                    | No      | `int`       | Maximum incoming chats that can be routed to the Agent |
| `groups`                             | No | `object[]`       | Groups the agent belongs to                            |
| `groups[].id`                        |  Yes    | `uint`      | Group ID, required only when `groups`'s present.       |
| `groups[].priority` __**__           | Yes   |  `string`     | Agent's priority in the group; required only when `groups`'s included.    |
| `default_group_priority` __***__    |   No | `string`        | The default routing priority for a group without defined priority. |
| `webhooks`                           | No   | `object`       | Webhooks sent to the Agent                             |
| `webhooks.url`                       | Yes   | `string`      | Destination URL for webhooks; required only when `webhooks`'s present.|
| `webhooks.secret_key`                | Yes   | `string`      | Secret sent in webhooks to verify webhook source; required when `webhooks`'s included. 
| `webhooks.actions`                   | Yes | `object[]`      | Triggering actions; required only when `webhooks`'s included.|
| `webhooks.actions[].name`            | Yes   | `string`      | The name of the triggering action; required only when `webhooks`'s included.|
| `webhooks.actions[].filters`         | No   | `object`       | Filters to check if a webhook should be triggered.        |
| `webhooks.actions[].additional_data` | No | `string[]`       | Additional data arriving with the webhook.          |

#### __*)__ `status`

| Possible value | Notes           |
| ------------- |:-------------:|
| `accepting chats`  | Agent is logged in. The chat router routes incoming chats to the Agent.     |
| `not accepting chats` | Agent is logged in, but the chat router doesn't route incoming chats to the Agent. |
| `offline` | Agent isn't logged in.    |

#### __**)__ `groups[].priority`

| Possible value | Notes           |
| ------------- |:-------------:|
| `first`  | The highest chat routing priority. Agents with the `first` priority get chats before others from the same group, e.g. Bots can get chats before regular Agents.  |
| `normal` | The medium chat routing priority. Agents with the `normal` priority get chats before those with the `last` priority, when there are no Agents with the `first` priority available with free slots in the group. |
| `last` | The lowest chat routing priority. Agents with the `last` priority get chats when there are no Agents with the `first` or `normal` priority available with free slots in the group.   |

#### __***)__ `default_group_priority`

| Possible value | Notes           |
| ------------- |:-------------:|
| `first`  | The highest chat routing priority. Agents with the `first` priority get chats before others from the same group, e.g. Bots can get chats before regular Agents.  |
| `normal` | The medium chat routing priority. Agents with the `normal` priority get chats before those with the `last` priority, when there are no Agents with the `first` priority available with free slots in the group. |
| `last` | The lowest chat routing priority. Agents with the `last` priority get chats when there are no Agents with the `first` or `normal` priority available with free slots in the group.   |
| `supervisor` | Bot works as `supervisor` so it will not be assigned to any chats.   |


#### Response

No response payload (`200 OK`).


### `get_bot_agents`


> **`get_bot_agents`** sample request

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


#### Request

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

#### Request

| Parameter          | Required | Type     | Notes                                                            |
| ------------------------ | -------- | -------- | ---------------------------------------------------------------- |
| `bot_agent_id`                |  Yes      | `string` | Bot Agent ID |



