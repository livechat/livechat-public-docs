<div class="callout type-warning">
This version is no longer supported since January 11, 2018.
</div>

## Introduction

Configuration API is a service for storing configuration of license. You can set
up here different types of features such as properties or webhooks.

### URL

Configuration API is available under following URL
`api.chat.io/configuration/<version>/{endpoint}`.

### Versioning

There are several API versions available, for example: `v0.3` or `v0.4`. If you want to use the latest version,
you should use `api.chat.io/configuration/{endpoint}` URL, but it is not
recommended.

### Authentication

Authentication is done via `Authorization` header. In each request you should
add `Authorization` header with Bearer token.

```
curl -v api.chat.io/configuration/v0.2/agents/get_bot_agent_details -H "Authorization: Bearer fra-7XNqYbjTS4ux1uSdp1ig8w" -X POST -d '{"bot_agent_id":"9a1829e224aea210da3a3f46a7074e28"}'
```

### Propagation delay

All configurations set by this API will have action in system after max 2
minutes. This delay will be removed in future.

## BOT Agent

* BOT Agent enables writing integrations using agent-api to communicate in chats
  as a regular Agent.

* Logged in BOT Agent is connected to agent SSO access token that
  creates/updates the BOT and is being logged out when the access token is
  revoked.

* Each BOT Agent is a resource owned by an application in developers platform
  identified by `client_id`. By "My BOT Agents" the BOTs owned by application
  with given `client_id` is meant.

### Differences from regular Agent

* you can not log in using BOT Agent account
* you can not set password for BOT Agent account
* BOT Agent does not have an email - agent_id is a random hash

### Methods

#### Create BOT Agent

**Endpoint**: `/agents/create_bot_agent`

**Permissions**:
* `agents-bot--my:write` - to create my bot agents

| Request object               | Type       | Required | Notes                                                                |
| ---------------------------- | ---------- | -------- | -------------------------------------------------------------------- |
| `name`                       | `string`   | Yes      | display name                                                         |
| `avatar`                     | `string`   | No       | avatar URL                                                           |
| `status`                     | `string`   | Yes      | agent status                                                         |
| `max_chats_count`            | `int`      | No       | maximum incoming chats that can be routed to the agent, by default 6 |
| `groups`                     | `object[]` | No       | groups the agent belongs to                                          |
| `groups[].id`                | `uint`     | Yes      | group ID                                                             |
| `groups[].priority`          | `string`   | Yes      | agent priority in group                                              |
| `webhooks`                   | `object`   | No      | webhooks sent to the agent                                           |
| `webhooks.url`               | `string`   | Yes      | destination URL for webhooks                                         |
| `webhooks.secret_key`        | `string`   | Yes      | secret sent in webhooks to verify webhook source                     |
| `webhooks.actions`           | `object[]` | Yes      | triggering actions                                                   |
| `webhooks.actions[].name`    | `string`   | Yes      | triggering action name                                               |
| `webhooks.actions[].filters` | `object`   | No       | filters to check if webhook should be triggered                      |

##### Note about groups

We currently don't support chat.io group management. All agents belong to group
0 by default and this is the only one group.

##### Example request payload

```js
{
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
        "name": "incoming_event"
      }]
    }
}
```

* `status` possible values:
  * `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  * `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  * `offline` - agent is not logged in
* `groups[].priority` possible values:
  * `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg BOTs can get chats before
    normal agents.
  * `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  * `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
* `webhooks` - go [here](#webhooks) for possible actions values and payloads.

##### Example response payloads

###### Success

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

#### Remove BOT Agent

**Endpoint**: `agents/remove_bot_agent`

**Permissions**:
* `agents-bot--my:write` - to remove my bot agent
* `agents-bot--all:write` - to remove any bot agent

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | BOT agent ID |

##### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

##### Example response payloads

###### Success

```js
{
}
```

#### Update BOT Agent

**Endpoint**: `agents/update_bot_agent`

**Permissions**:
* `agents-bot--my:write` - to update my bot agent

| Request object               | Type       | Required | Notes                                                  |
| ---------------------------- | ---------- | -------- | ------------------------------------------------------ |
| `id`                         | `string`   | Yes      | bot agent ID                                           |
| `name`                       | `string`   | No       | display name                                           |
| `avatar`                     | `string`   | No       | avatar URL                                             |
| `status`                     | `string`   | No       | agent status                                           |
| `max_chats_count`            | `int`      | No       | maximum incoming chats that can be routed to the agent |
| `groups`                     | `object[]` | No       | groups the agent belongs to                            |
| `groups[].id`                | `uint`     | Yes      | group ID                                               |
| `groups[].priority`          | `string`   | Yes      | agent priority in group                                |
| `webhooks`                   | `object`   | No       | webhooks sent to the agent                             |
| `webhooks.url`               | `string`   | Yes      | destination URL for webhooks                           |
| `webhooks.secret_key`        | `string`   | Yes      | secret sent in webhooks to verify webhook source       |
| `webhooks.actions`           | `object[]` | Yes      | triggering actions                                     |
| `webhooks.actions[].name`    | `string`   | Yes      | triggering action name                                 |
| `webhooks.actions[].filters` | `object`   | No       | filters to check if webhook should be triggered        |

##### Example request payload

```js
{
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
```

* `status` possible values:
  * `accepting chats` - agent is logged in and chat router routes incoming chats
    to them
  * `not accepting chats` - agent is logged in but chat router does not route
    incoming chats to them
  * `offline` - agent is not logged in
* `groups[].priority` possible values:
  * `first` - the highest chat routing priority - agents with `first` priority
    get chats before the others from that group, eg BOTs can get chats before
    normal agents.
  * `normal` - the middle chat routing priority - agents with `normal` priority
    get chats before the others with `last` priority when there are no agents
    with `first` priority available with free slots in that group
  * `last` - the lowest chat routing priority - agents with `last` priority get
    chats when there are no agents with `first` or `normal` priority available
    with free slots in that group
* `webhooks` - go [here](#webhooks) for possible actions values and payloads.

##### Example response payloads

###### Success

```js
{
}
```

#### Get BOT Agents

**Endpoint**: `agents/get_bot_agents`

**Permissions**:
* `agents-bot--my:read` - to get my bot agent
* `agents-bot--all:read` - to get all bot agents

| Request object | Type   | Required | Notes                                                                                     |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| `all`          | `bool` | No       | Get all BOT Agents, if `false` returns only caller's BOT Agents, default value is `false` |

##### Example request payload

```js
{
    "all": false
}
```

##### Example response payloads

###### Success

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

#### Get BOT Agent details

**Endpoint**: `agents/get_bot_agent_details`

**Permissions**:
* `agents-bot--my:read` - to get my bot agent details
* `agents-bot--all:read` - to get any bot agent details

| Request object | Type     | Required | Notes        |
| -------------- | -------- | -------- | ------------ |
| `bot_agent_id` | `string` | Yes      | BOT Agent ID |

##### Example request payload

```js
{
    "bot_agent_id": "5c9871d5372c824cbf22d860a707a578"
}
```

##### Example response payloads

###### Success

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
                "name": "incoming_event"
            }]
        }
    }
}
```

## Webhooks

#### Register webhook

**Endpoint**: `webhooks/register_webhook`

**Permissions**:
* `webhooks--my:write` - to register my webhook

| Request object | Type     | Required | Notes                                            |
| -------------- | -------- | -------- | ------------------------------------------------ |
| `url`          | `string` | Yes      | Destination URL for webhook                      |
| `description`  | `string` | No       | Webhook description                              |
| `action`       | `string` | Yes      | Triggerring action                               |
| `secret_key`   | `string` | Yes      | Secret sent in webhooks to verify webhook source |
| `filters`      | `object` | No       | Filters to check if webhook should be triggered  |

* `action` possible values:
  * `incoming_chat_thread` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#incoming-chat-thread)
    * available filters for the action:
      * `chat_properties`
      * `thread_properties`
  * `chat_users_updated` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-users-updated)
    * available filters for the action:
      * `chat_properties`
  * `incoming_event` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#incoming-event)
    * available filters for the action:
      * `chat_properties`
      * `event_properties`
  * `last_seen_timestamp_updated` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#last-seen-timestamp-updated)
    * available filters for the action:
      * `chat_properties`
  * `thread_closed` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#thread-closed)
    * available filters for the action:
      * `chat_properties`
      * `thread_properties`
  * `chat_scopes_updated` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-scopes-updated)
    * available filters for the action:
      * `chat_properties`
  * `chat_properties_updated` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-properties-updated)
    * available filters for the action:
      * `chat_properties`
  * `chat_thread_properties_updated` - triggers on action
    [agent-api push](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-thread-properties-updated)
    * available filters for the action:
      * `chat_properties`
* `filters` possible filters:
  * `chat_properties.<namespace>.<name>.<filter_type>`
    * `<filter_type>` possible values (only one is allowed for single property):
      * `exists` (`bool`)
      * `values` (`type[]` - array with specific type for property: `string`,
        `int` or `bool`)
      * `exclude_values` (`type[]` - array with specific type for property:
        `string`, `int` or `bool`)
  * `thread_properties.<namespace>.<name>.<filter_type>`
    * `<filter_type>` as above
  * `event_properties.<namespace>.<name>.<filter_type>`
    * `<filter_type>` as above

##### Example request payload

```js
{
  "url": "http://myservice.com/webhooks",
  "description": "Test webhook",
  "action": "thread_closed",
  "secret_key": "laudla991lamda0pnoaa0",
  "filters": {
    "chat_properties": {
      "source": {
        "type": {
          "values": ["facebook", "twitter"]
        }
      },
      "rating": {
        "comment": {
          "exists": true
        }
      }
    }
  }
}
```

##### Example response payloads

###### Success

```js
{
  "webhook_id": "pqi8oasdjahuakndw9nsad9na"
}
```

#### Get webhooks config

**Endpoint**: `webhooks/get_webhooks_config`

**Permissions**:
* `webhooks--my:read` - to get my webhooks config
* `webhooks--all:read` - to get all webhooks config

##### Example request payload

```js
{
}
```

##### Example response payloads

###### Success

```js
{
  "webhooks_config":[
    {
      "webhook_id": "pqi8oasdjahuakndw9nsad9na",
      "url": "http://myservice.com/webhooks",
      "description": "Test webhook",
      "action": "thread_closed",
      "secret_key": "laudla991lamda0pnoaa0",
      "filters": {
        "chat_properties": {
          "source": {
            "type": {
              "values": ["facebook", "twitter"]
            }
          },
          "rating": {
            "comment": {
              "exists": true
            }
          }
        }
      }
    }
  ]
}
```

#### Unregister webhook

**Endpoint**: `webhooks/unregister_webhook` 

**Permissions**:
* `webhooks--my:write` - to unregister my webhook
* `webhooks--all:write` - to unregister any webhook

| Request object | Type | Required | Notes | 
|----------------|------|----------|-------| 
| `webhook_id` | `string` | Yes | Webhook ID |

##### Example request payload

```js
{
  "webhook_id": "pqi8oasdjahuakndw9nsad9na"
}
```

##### Example response payloads

###### Success

```js
{
}
```

## Webhooks data structure

### Webhook format

```js
{
  "webhook_id": "<webhook_id>",
  "secret_key": "<sekret_key>",
  "action": "<action>",
  "data": {
    // payload from push action
  }
}
```

### Payload for actions

* [`incoming_chat_thread`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#incoming-chat-thread)
* [`chat_users_updated`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-users-updated)
* [`incoming_event`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#incoming-event)
* [`last_seen_timestamp_updated`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#last-seen-timestamp-updated)
* [`thread_closed`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#thread-closed)
* [`chat_scopes_updated`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-scopes-updated)
* [`chat_properties_updated`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-properties-updated)
* [`chat_thread_properties_updated`](https://www.chat.io/docs/agent-api/api-reference/v0.2/#chat-thread-properties-updated)
